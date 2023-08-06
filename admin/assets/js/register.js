
let mainRegister = document.querySelector(".mainRegister");
let moreInfo = document.querySelector(".moreInfo");
let userModal = {};


function registerUser(e) {
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    if (username == '' || email == '' || password == '') {
        showAlert("Empty Fields Detected");
    }
    else if (password.length < 6) {
        showAlert("Password length should be 6 character minimum")
    }
    else {
        userModal.username = username;
        userModal.email = email;
        userModal.password = password;
        mainRegister.classList.add('d-none');
        moreInfo.classList.remove('d-none');
    }
}

function addMoreInfo(e) {
    e.preventDefault();
    let role = document.querySelector("#role").value;
    let businessName = document.querySelector("#businessName").value;
    let businessEmail = document.querySelector("#businessEmail").value;
    let businessPhone = document.querySelector("#businessPhone").value;
    let businessWebsite = document.querySelector("#businessWebsite").value;
    let businessAddress = document.querySelector("#businessAddress").value;

    if (role == '' || businessName == '' || businessEmail == '' || businessPhone == '') {
        showAlert("Empty Fields Detected");
    }
    else {
        userModal.businessName = businessName;
        userModal.businessEmail = businessEmail;
        userModal.businessPhone = businessPhone;
        userModal.businessWebsite = businessWebsite;
        userModal.businessAddress = businessAddress;
        userModal.role = role;
        authenticateUser();
    }
}

function authenticateUser() {
    document.querySelector(".submitBtn").setAttribute('disabled', '');
    showAlert("Creating Account. Please wait..");

    auth.createUserWithEmailAndPassword(userModal.email, userModal.password)
        .then(userCredential => {
            const user = userCredential.user;
            const uid = user.uid;

            if (userModal.role == 'client') {
                addUserToCollection('clients', uid);
            }
            else if (userModal.role == 'contractor') {
                addUserToCollection('contractors', uid);
            }
            else if (userModal.role == 'employee') {
                addUserToCollection('employees', uid);
            }

        })
        .catch(e => {
            document.querySelector(".submitBtn").removeAttribute("disabled");
            showAlert(e.message)
        })
}


function addUserToCollection(collection, userid) {
    db.collection(collection).doc(userid).set({
        userid: userid,
        username: userModal.username,
        email: userModal.email,
        businessName: userModal.businessName,
        businessEmail: userModal.businessEmail,
        businessPhone: userModal.businessPhone,
        businessWebsite: userModal.businessWebsite,
        businessAddress: userModal.businessAddress,
        role: userModal.role,
        isAdmin: false,
        isSuper: false,
        status: false,
        createdAt: Date.now()
    })
        .then(() => {
            showAlert('Account Created successfully! Your account will be approved by admin within 24-48 hrs and inform you through email. Thanks')
            sendMail(userModal.email, "SiteAdmin@globalconstructionanddemolition.com", "Approve user account", `User with ${userModal.email} has created account on your website, please check out the user and approve/ unblock its status. Thanks`)
            // setTimeout(() => {
            //     window.location.href = 'login.html'
            // }, 700);
        })
        .catch((error) => {
            document.querySelector(".submitBtn").removeAttribute("disabled");
            showAlert("Error: ", error);
        });
}

function loginUser(e) {
    showAlert("Authenticating. Please wait..");
    document.querySelector(".loginBtn").setAttribute("disabled", "");
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let roleInput = document.querySelector("#role").value;
    if (password.length < 6) {
        showAlert('Password should be minimum 6 characters long');
        document.querySelector(".loginBtn").removeAttribute("disabled");
    }
    else {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                let uid = user.uid;
                getUserRole(uid, roleInput);
            })
            .catch((error) => {
                document.querySelector(".loginBtn").removeAttribute("disabled");
                const errorCode = error.code;
                const errormessage = error.message;
                showAlert(errormessage)
            });
    }
}

function getUserRole(userid, role) {
    let collectionRole = '';
    if (role == 'contractor') {
        collectionRole = 'contractors';
    }
    else if (role == 'client') {
        collectionRole = 'clients';
    }
    else if (role == 'employee') {
        collectionRole = 'employees';
    }
    const usersRef = db.collection(collectionRole);
    const query = usersRef.where('role', '==', role);

    query.get().then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            users.push(user);
        });

        let roleMatched = false;
        users.forEach(user => {
            if (user.userid == userid) {
                roleMatched = true;
                if (user.status == true) {
                    if (user.isSuper) {
                        sessionStorage.setItem('userid', userid)
                        sessionStorage.setItem('role', role)
                        sessionStorage.setItem('isSuper', true)
                        window.location.href = 'index.html';
                    }
                    else if (user.isAdmin) {
                        sessionStorage.setItem('userid', userid)
                        sessionStorage.setItem('role', role)
                        sessionStorage.setItem('isAdmin', true)
                        window.location.href = 'index.html';
                    }
                    else {
                        sessionStorage.setItem('userid', userid)
                        sessionStorage.setItem('role', role)
                        window.location.href = 'index.html';
                    }

                }
                else {
                    document.querySelector(".loginBtn").removeAttribute("disabled");
                    showAlert("Sorry! Your account is not approved by admin, please contact Support@globalconstructionanddemolition.com");
                }
            }
            // else {
            //     document.querySelector(".loginBtn").removeAttribute("disabled");
            //     showAlert("Your Account is not registered with " + role + " role");
            // }
        })
        if (!roleMatched) {
            document.querySelector(".loginBtn").removeAttribute("disabled");
            showAlert("Your Account is not registered with " + role + " role");
        }
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });


}

function showAlert(msg) {
    document.querySelector(".customAlert").innerHTML = msg;
    document.querySelector(".customAlert").classList.replace('invisible', 'visible')
    setTimeout(() => {
        document.querySelector(".customAlert").classList.replace('visible', 'invisible')
    }, 5000);
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

    fetch(`${baseURL}/sendmail.php`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}