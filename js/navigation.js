let bars = document.querySelector(".barsicon")
let closeicon = document.querySelector(".closeicon")
let navigation = document.querySelector(".navigation")
let createAccount = document.querySelector(".create-account")

bars.addEventListener("click", e => {
    navigation.style.top = "10px";
    closeicon.classList.add("show")
    bars.classList.add("d-none")
})
closeicon.addEventListener("click", e => {
    navigation.style.top = "-500px";
    closeicon.classList.remove("show")
    bars.classList.remove("d-none")
})

let chaticon = document.querySelector(".chaticon")
let chatdialog = document.querySelector(".chatdialog")
let chatBtn = document.querySelector(".chatBtn")
chaticon.addEventListener("click", e => {
    chatdialog.classList.toggle("show");
})

if (window.location.pathname == '/contact.html') {
    chatBtn.addEventListener("click", e => {
        chatdialog.classList.toggle("show");
    })



}



let submit = document.querySelector("#submit");
let userResponse = document.querySelector(".user-response");
let chatResponse = document.querySelector(".chat-response");
let userinput = ''
submit.addEventListener('click', e => {
    userinput.value = ''
    e.preventDefault()
    userinput = document.querySelector(".userinput").value;
    if (userinput == 0) {
        alert("Input some message")
    }
    else {
        userResponse.innerHTML = userinput
        userResponse.classList.remove("d-none")
        setTimeout(() => {
            chatResponse.innerHTML = "Thank you for your text someone will respond briefly. They are currently working with other clients at this time."
            chatResponse.classList.remove("d-none")
        }, 500);
    }
})

function sendMail() {
    let submitEmail = document.querySelector(".submitEmail");
    // e.preventDefault()
    let businessname = document.getElementById("businessname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let projectdetails = document.getElementById("projectdetails").value;
    let startdate = document.getElementById("startdate").value;
    let completion = document.getElementById("completion").value;
    let type = document.querySelector('input[name="address-type"]:checked').value;

    if (businessname.trim() == '' || phone.trim() == '' || email.trim() == '' || projectdetails.trim() == '' || startdate.trim() == ''
        || completion.trim() == '' || type == '') {
        showCustomDialog('Empty Fields Detected, Please fill all information.');
        return;
    }
    else {
        let emailbody = `Business Name: ${businessname}. Phone: ${phone}. Email Address: ${email}. Industry Type: ${type}. Expected Start Date: ${startdate}. Anticipated Completion: ${completion}. Project Details: ${projectdetails}`
        submitEmail.setAttribute("href", `mailto:Support@globalconstructionanddemolition.com?subject=Quote Message By the client with the business name: ${businessname}&body=${emailbody}`);
        showCustomDialog('Thank you for your quote, someone will get back to you within 24-48 hours')
        // console.log(emailbody)
        // console.log(type,phone,email,projectdetails,startdate,completion)

        const docId = db.collection("frontendQuotes").doc().id;
        db.collection("frontendQuotes").doc(docId).set({
            businessname: businessname,
            phone: phone,
            email: email,
            projectdetails: projectdetails,
            startdate: startdate,
            completion: completion,
            type: type,
            sendAt: formatDate(Date.now())
        })
            .then(() => {
                console.log('Form Submitted successfully')
                businessname.value = '';
                phone.value = '';
            })
            .catch((error) => {
                console.log("Error: ", error);
            });

    }
}

// if (sessionStorage.getItem('userid')) {
//     let userid = sessionStorage.getItem('userid')
//     const userDocRef = db.collection("users").doc(userid);

//     userDocRef.get().then((doc) => {
//         if (doc.exists) {
//             const userData = doc.data();
//             // Access the values from the userData object
//             let username = userData.username;
//             createAccount.innerHTML = `
//                     <li class="link">
//                         <a href="profile.html" class="link-a-tag">${username}</a>
//                     </li>
//                     `
//         } else {
//             console.log("Document does not exist!");
//         }
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });
// }
// else {
//     createAccount.innerHTML = `
//             <li class="signin">
//                 <a href="login.html">Sign In</a>
//               </li>
//               <li class="signin">
//                 <a href="register.html">Create Account</a>
//               </li>
//             `
// }


function showCustomDialog(msg) {
    let customdialog = document.querySelector(".custom-dialog")
    customdialog.classList.add('show')
    customdialog.querySelector("p").innerText = msg;
    setTimeout(() => {
        customdialog.classList.remove("show")
    }, 8000);
}
function hideCustomDialog() {
    let customdialog = document.querySelector(".custom-dialog")
    customdialog.classList.remove("show")
}
let customdialogbtn = document.querySelector(".custom-dialog-btn")
customdialogbtn.addEventListener('click', (e) => {
    hideCustomDialog()
})

getWebsiteSettings()
function getWebsiteSettings() {
    showLoader()
    let collectionRef = db.collection("website");
    collectionRef.get()
        .then((querySnapshot) => {
            var documents = [];

            // Iterate over the documents
            querySnapshot.forEach(function (doc) {
                var documentData = doc.data();
                documents.push(documentData);
            });

            websiteSettings(documents[0])
            hideLoader()
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });
}


function websiteSettings(data) {
    console.log(data)
    let companyLogo = document.querySelector(".companyLogo");
    let phoneNumber = document.querySelector(".phoneNumber");
    let title = document.querySelector("#main_title");
    let slogan = document.querySelector(".slogan");
    let companyPhone = document.querySelector(".companyPhone");
    let companyEmail = document.querySelector(".companyEmail");
    let companyFacebook = document.querySelector(".companyFacebook");
    let campanyNameFooter = document.querySelector(".campanyNameFooter");

    let facebookLink = document.querySelector(".facebookLink");
    let twitterLink = document.querySelector(".twitterLink");
    let linkedinLink = document.querySelector(".linkedinLink");

    let favicon = document.querySelector(".favicon");


    favicon.href = data.logo;
    companyLogo.src = data.logo;
    phoneNumber.innerHTML = data.phone;

    title ? title.innerHTML = data.websiteName : '';
    slogan ? slogan.innerHTML = data.slogan : '';

    companyPhone ? companyPhone.innerHTML = data.phone : '';
    companyEmail ? companyEmail.innerHTML = data.email : '';
    companyFacebook ? companyFacebook.setAttribute("href",data.facebook)  : '';
    campanyNameFooter ? campanyNameFooter.innerHTML = data.websiteName : '';

    facebookLink.href = data.facebook;
    twitterLink.href = data.twitter;
    linkedinLink.href = data.linkedin;


    let primaryColor = data.primaryColor;
    let secondaryColor = data.secondaryColor;

    // Changing website colors 

    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);

}

function submitForm() {
    alert("SUBMIT")
    let businessname = document.querySelector("#businessname");
    let phone = document.querySelector("#phone");
    let email = document.querySelector("#email");
    let projectdetails = document.querySelector("#projectdetails");
    let startdate = document.querySelector("#startdate");
    let completion = document.querySelector("#completion");
    let industry_type = document.querySelector('input[name="address-type"]:checked').value;

    console.log(businessname.value)
    console.log(phone.value)
    console.log(email.value)
    console.log(projectdetails.value)
    console.log(startdate.value)
    console.log(completion.value)
    console.log(industry_type)
}

function showLoader() {
    document.querySelector(".loader").classList.remove('d-none');
}
function hideLoader() {
    document.querySelector(".loader").classList.add('d-none');
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