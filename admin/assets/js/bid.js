function submitBid() {
    let message = document.querySelector(".message")
    let pdfDoc = document.querySelector(".pdfDoc")

    var file = pdfDoc.files[0];

    if (file) {
        showLoader()
        var filename = 'pdf_' + Date.now() + '.pdf';

        // getting User Info 
        let userid = sessionStorage.getItem('userid');
        let role = sessionStorage.getItem('role');
        let collectionName = 'contractors'
        // if(role == 'contractor'){
        //     collectionName = 'Contractor'
        // }

        console.log(userid)

        let collectionRef = db.collection(collectionName);
        let documentRef = collectionRef.doc(userid);
        documentRef
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    var data = doc.data();
                    console.log(data)

                    // uploading pdf 
                    const storageRef = firebase.storage().ref();
                    const fileRef = storageRef.child('docs/' + file.name);
                    const uploadTask = fileRef.put(file);

                    uploadTask.on('state_changed',
                        function (snapshot) {
                            // console.log(snapshot)
                        },
                        function (error) {
                            console.error(error);
                        },
                        function () {
                            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                // console.log('File uploaded successfully. Download URL:', downloadURL);
                                const docId = db.collection("bids").doc().id;
                                db.collection("bids").doc(docId).set({
                                    bidId: docId,
                                    userId: data.userid,
                                    username: data.username,
                                    userEmail: data.email,
                                    role: data.role,
                                    message: message.value,
                                    formUrl: downloadURL,
                                    status: false,
                                    submittedAt: Date.now()
                                })
                                    .then(() => {
                                        hideLoader();
                                        showAlert('Bid successfully Submitted, You will be notified once your bid is approved through email')
                                        message.value = '';
                                    })
                                    .catch((error) => {
                                        hideLoader();
                                        showAlert("Error: ", error);
                                    });
                            });
                        }
                    );
                }
                else {
                    console.log('error')
                }
            }).catch(function (error) {
                console.error("Error getting document: ", error);
            });

    }
    else {
        alert('Upload file first..')
    }
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