import { showAlert } from "./utils.js";
import { hideLoader } from "./utils.js";
import { showLoader } from "./utils.js";

function getUsers() {
    showLoader();
    let collectionRef = db.collection("clients");
    collectionRef.get()
        .then((querySnapshot) => {
            var documents = [];

            // Iterate over the documents
            querySnapshot.forEach(function (doc) {
                var documentData = doc.data();
                documents.push(documentData);
            });

            populateUsers(documents)
            $("#userstable").DataTable();
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });

}
getUsers()


function populateUsers(data) {
    console.log('called populate')
    console.log(data)
    hideLoader()
    data.forEach(user => {
        const table = new DataTable('#userstable');
        table.row
            .add([
                user.username,
                user.email,
                user.businessName,
                formatDate(user.createdAt),
                // user.role,
                `${!user.status ? '<i class="fa fa-check text-success fs-5"></i>' : '<i class="fa fa-xmark text-danger fs-5"></i>'}`,
                `<button class="btn btn-sm btn-primary my-1 unblock ${user.status ? 'disable-a-tag' : ''}" name="unblock" data-id="${user.userid}" ${user.status ? 'disabled' : ''} >Unblock</button>
                 <button class="btn btn-sm btn-danger my-1 block" name="block" data-id="${user.userid}" ${user.status ? '' : 'disabled'}>Block</button>`
            ])
            .draw(false);
    })

    // <a href="viewuser.html?id=${user.userid}&block=true" class="btn btn-sm btn-primary unblock ${user.status ? 'disable-a-tag' : ''}" name="unblock" data-id="${user.userid}" onclick="unblockUser(${user.userid})" >Unblock</a>
    //<a href="viewuser.html?id=${user.userid}&block=false" class="btn btn-sm btn-danger block ${user.status ? '' : 'disable-a-tag'}" name="block" data-id="${user.userid}" onclick="blockUser(${user.userid})">Block</a>
    let unblockBtn = document.querySelectorAll(".unblock");
    unblockBtn.forEach(element => {
        element.addEventListener("click", () => {
            let userid = element.getAttribute('data-id');
            unblockUser(userid)
        })
    })
    let blockBtn = document.querySelectorAll(".block");
    blockBtn.forEach(element => {
        element.addEventListener("click", () => {
            let userid = element.getAttribute('data-id');
            blockUser(userid)
        })
    })

}

function unblockUser(id) {
    showLoader();
    let collectionRef = db.collection("clients");
    let documentRef = collectionRef.doc(id);
    
    documentRef.update({
        status: true
    }).then(() => {
        hideLoader();
        showAlert('Client unblocked successfully')
        documentRef.get().then(doc => {
            let data = doc.data();
            let userEmail = data.email;
            sendMail('SiteAdmin@globalconstructionanddemolition.com',userEmail,'Your GCD account has been approved.', 'Your GCD account has been approved.')
        })
        updateTable();

    })
        .catch((error) => {
            hideLoader();
            showAlert("Error: ", error);
        });
}
function blockUser(id) {
    showLoader();
    let collectionRef = db.collection("clients");
    let documentRef = collectionRef.doc(id);

    documentRef.update({
        status: false
    })
        .then(() => {
            hideLoader();
            showAlert('Client Blocked successfully');
            
            updateTable();


        })
        .catch((error) => {
            hideLoader();
            showAlert("Error: ", error);
        });
}


function updateTable() {
    const table = new DataTable('#userstable');
    table
        .clear()
        .draw();
    getUsers();
}

let addNewUser = document.querySelector("#addNewUser");
addNewUser.addEventListener("click", registerNewUser);

function registerNewUser() {
    // e.preventDefault();
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    // let role = document.querySelector("#role").value;
    let businessName = document.querySelector("#businessName").value;
    let businessEmail = document.querySelector("#businessEmail").value;
    let businessPhone = document.querySelector("#businessPhone").value;
    let businessWebsite = document.querySelector("#businessWebsite").value;
    let businessAddress = document.querySelector("#businessAddress").value;

    if (username == '' || email == '' || password == '' || businessName == "" || businessEmail == "" || businessPhone == "") {
        showAlert("Empty Fields Detected");
    }
    else if (password.length < 6) {
        showAlert("Password length should be 6 character minimum")
    }
    else {
        authenticateUser(username, email, password, businessName, businessEmail, businessPhone, businessWebsite, businessAddress);
    }
}

function authenticateUser(user_username, user_email, pass, busName, busEmail, busPhone, busWebsite, busAddress) {
    showLoader();

    auth.createUserWithEmailAndPassword(user_email, pass)
        .then(userCredential => {
            const user = userCredential.user;
            const uid = user.uid;
            // console.log(user);
            db.collection("clients").doc(uid).set({
                userid: uid,
                username: user_username,
                email: user_email,
                businessName: busName,
                businessEmail: busEmail,
                businessPhone: busPhone,
                businessWebsite: busWebsite,
                businessAddress: busAddress,
                // role: r,
                status: false,
                createdAt: Date.now()
            })
                .then(() => {
                    hideLoader();
                    const table = new DataTable('#userstable');
                    table
                        .clear()
                        .draw();
                    getUsers();
                    showAlert('Client registered successfully')
                })
                .catch((error) => {
                    hideLoader();
                    showAlert("Error: ", error);
                });

        })
        .catch(e => {
            hideLoader();
            showAlert(e.message)
        })
}

// I am getting this error: "Uncaught ReferenceError: unblockUser is not defined", I am calling it here 
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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