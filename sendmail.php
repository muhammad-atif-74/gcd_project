<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $jsonPayload = file_get_contents('php://input');

    $data = json_decode($jsonPayload, true);

    if ($data === null) {
        sendResponse(false, 'Invalid json');
        exit();
    }

    // getting the data from json 
    $email = $data['email'];
    $receiver = $data['receiver'];
    $subject = $data['subject'];
    $body = $data['body'];

    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'muhammadatifkust@gmail.com';                     //SMTP username
    $mail->Password   = 'mwlniwnuawvpxufy';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($email);
    // $mail->addAddress('khalilkhan964@gmail.com');     //Add a recipient
    $mail->addAddress($receiver);     //Add a recipient

    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
    sendResponse(true, "Message has been sent");
} catch (Exception $e) {
    sendResponse(false, "Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
}



function sendResponse($status, $msg)
{
    try {
        $data = array(
            'status' => $status,
            'message' => $msg
        );

        header('Content-Type: application/json');

        $jsonData = json_encode($data);

        echo $jsonData;
    } catch (Exception $e) {
        $data = array(
            'status' => false,
            'message' => 'Error ' . $e
        );

        header('Content-Type: application/json');

        $jsonData = json_encode($data);

        echo $jsonData;
    }
}
