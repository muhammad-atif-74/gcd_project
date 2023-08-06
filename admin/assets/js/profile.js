import { showAlert } from "./utils.js";
import { hideLoader } from "./utils.js";
import { showLoader } from "./utils.js";
let username = document.querySelector("#profileUsername");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let roleInput = document.querySelector("#role");
let businessName = document.querySelector("#businessName");
let businessEmail = document.querySelector("#businessEmail");
let businessPhone = document.querySelector("#businessPhone");
let businessWebsite = document.querySelector("#businessWebsite");
let businessAddress = document.querySelector("#businessAddress");

let userid = sessionStorage.getItem('userid');
let role = sessionStorage.getItem('role');

getUserProfile();
function getUserProfile() {
    showLoader();
    if (role == 'client') {
        getUserDetails("clients", userid);
    }
    else if (role == 'contractor') {
        getUserDetails("contractors", userid);
    }
    else if (role == 'employee') {
        getUserDetails("employees", userid);
    }
    else {
        console.error("Undefined Role")
    }

}

function getUserDetails(collectionName, userid) {
    let collectionRef = db.collection(collectionName);
    let documentRef = collectionRef.doc(userid);
    documentRef.get().then(function (doc) {
        if (doc.exists) {
            hideLoader();
            var data = doc.data();
            console.log(data)
            username.value = data.username;
            email.value = data.email;
            roleInput.value = data.role;
            businessName.value = data.businessName;
            businessPhone.value = data.businessPhone;
            businessEmail.value = data.businessEmail;
            businessAddress.value = data.businessAddress;
            businessWebsite.value = data.businessWebsite;
        } else {
            hideLoader();
            showAlert("Document does not exist!");
            console.log('error')
        }
    }).catch(function (error) {
        hideLoader();
        showAlert("Error getting data: ", error);
        console.error("Error getting document: ", error);
    });
}

let updateUsernameBtn = document.querySelector(".updateUsername");
if (updateUsernameBtn) {
    let updateUsername = document.querySelector("#profileUsername");
    updateUsernameBtn.addEventListener("click", () => {
        showLoader();
        if (role == 'client') {
            updateUser("clients", userid, updateUsername.value);
        }
        else if (role == 'contractor') {
            updateUser("contractors", userid, updateUsername.value);
        }
        else if (role == 'employee') {
            updateUser("employees", userid, updateUsername.value);
        }
    })
}

function updateUser(collectionName, userid, updateUsername) {
    let collectionRef = db.collection(collectionName);
    let documentRef = collectionRef.doc(userid);

    documentRef.update({
        username: updateUsername
    })
        .then(user => {
            hideLoader();
            showAlert("Username Updated Successfully");
            getUserProfile();
        })
        .catch(e => {
            hideLoader();
            showAlert("Something Went Wrong");
        })
}