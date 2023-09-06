
function getBids() {
    showLoader();
    let collectionRef = db.collection("bids");
    collectionRef.get()
        .then((querySnapshot) => {
            var documents = [];

            // Iterate over the documents
            querySnapshot.forEach(function (doc) {
                var documentData = doc.data();
                documents.push(documentData);
            });

            populateRfpTable(documents)
            $("#rfpTable").DataTable();
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });

}
getBids()


function populateRfpTable(data) {
    hideLoader()
    data.forEach(data => {
        const table = new DataTable('#rfpTable');
        table.row
            .add([
                data.username,
                data.userEmail,
                // data.role,
                data.message,
                // data.status ? 'Approved' : 'Pending',
                data.status,
                `
                    <a href="${data.formUrl}" target ="_blank">View Form</a>
                `,
                formatDate(data.submittedAt),
                // user.role,
                `<button class="btn btn-sm btn-primary my-1 unblock " name="unblock"  onclick="acceptBid('${data.bidId}')">Accept</button>
                <button class="btn btn-sm btn-danger my-1 unblock " name="unblock"  onclick="rejectBid('${data.bidId}')">Reject</button>`
            ])
            .draw(false);
    })

}

function acceptBid(bidId) {
    showLoader();
    let collectionRef = db.collection("bids");
    let documentRef = collectionRef.doc(bidId);
    documentRef.update({
        status: 'Approved'
    }).then(() => {
        hideLoader();
        // console.log('done')
        documentRef.get().then(doc => {
            let data = doc.data();
            let userEmail = data.userEmail;
            showAlert('Bid accepted successfully, Reloading.. to update the record')
            sendMail('SiteAdmin@globalconstructionanddemolition.com', userEmail, 'Your bid has been approved.', 'Your bid has been approved.')
            setTimeout(() => {
                window.location.reload()
            }, 1000);

        })
    })
        .catch((error) => {
            hideLoader();
            showAlert("Error: ", error);
        });
}

function rejectBid(bidId) {
    showLoader();
    let collectionRef = db.collection("bids");
    let documentRef = collectionRef.doc(bidId);
    documentRef.update({
        status: 'Rejected'
    }).then(() => {
        hideLoader();
        // console.log('done')
        documentRef.get().then(doc => {
            let data = doc.data();
            let userEmail = data.userEmail;
            showAlert('Bid rejected successfully, Reloading.. to update the record')
            sendMail('SiteAdmin@globalconstructionanddemolition.com', userEmail, 'Your bid has been rejected.', 'Your bid has been rejected by admin.')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })
    })
        .catch((error) => {
            hideLoader();
            showAlert("Error: ", error);
        });
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


function showAlert(msg) {
    document.querySelector(".customAlert").innerHTML = msg;
    document.querySelector(".customAlert").classList.replace('invisible', 'visible')
    setTimeout(() => {
        document.querySelector(".customAlert").classList.replace('visible', 'invisible')
    }, 10000);
}

function showLoader() {
    document.querySelector(".loader").classList.remove('d-none');
}
function hideLoader() {
    document.querySelector(".loader").classList.add('d-none');
}


function sendMail(email, receiver, subject, body) {
    var fullURL = window.location.href;
    var position = fullURL.indexOf("admin/");
    var baseURL = fullURL.substr(0, position);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "receiver": receiver,
        "subject": subject,
        "body": body
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${baseURL}sendmail.php`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}