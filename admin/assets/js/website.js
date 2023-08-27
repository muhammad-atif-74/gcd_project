let primaryColorInput = document.querySelector("#primaryColorInput");
let secondaryColorInput = document.querySelector("#secondaryColorInput");
let logo = document.querySelector("#logo");
let websitename = document.querySelector(".websitename");
let slogan = document.querySelector(".slogan");
let email = document.querySelector(".email");
let phone = document.querySelector(".phone");
let facebook = document.querySelector(".facebook");
let twitter = document.querySelector(".twitter");
let linkedin = document.querySelector(".linkedin");
let websiteDocId = '123456';


function updateWebsite(e) {
    e.preventDefault();
    showLoader();
    let collectionRef = db.collection("website");
    let documentRef = collectionRef.doc(websiteDocId);

    documentRef.update({
        primaryColor: primaryColorInput.value,
        secondaryColor: secondaryColorInput.value,
        websiteName: websitename.value,
        slogan: slogan.value,
        email: email.value,
        phone: phone.value,
        facebook: facebook.value,
        twitter: twitter.value,
        linkedin: linkedin.value
    })
        .then(() => {
            hideLoader();
            showAlert('Website Updated successfully')
        })
        .catch((error) => {
            showAlert("Error: ", error);
        });



}
document.querySelector("#logo").onchange = () => {
    let filename = document.querySelector("#logo").files[0].name;
    let storageRef = firebase.storage().ref("images/" + filename);
    let uploadTask = storageRef.put(document.querySelector("#logo").files[0]);

    uploadTask.snapshot.ref.getDownloadURL().then(url => {
        let collectionRef = db.collection("website");
        let documentRef = collectionRef.doc(websiteDocId);

        documentRef.update({
            logo: url
        })
            .then(() => {
                showAlert('Logo Updated successfully')
            })
            .catch((error) => {
                showAlert("Error: ", error);
            });
    })
        .catch(e => {
            console.log(e)
        })
}

populateWebsiteForm();
populateProjects();

function populateWebsiteForm() {
    showLoader();
    let collectionRef = db.collection("website");
    let documentRef = collectionRef.doc("123456");
    documentRef.get().then(function (doc) {
        if (doc.exists) {
            hideLoader();
            var data = doc.data();
            document.querySelector("#primaryColor").value = data.primaryColor;
            document.querySelector("#secondaryColor").value = data.secondaryColor;
            document.querySelector(".showLogo").src = data.logo;
            primaryColorInput.value = data.primaryColor;
            secondaryColorInput.value = data.secondaryColor;
            websitename.value = data.websiteName;
            slogan.value = data.slogan;
            email.value = data.email;
            phone.value = data.phone;
            facebook.value = data.facebook;
            twitter.value = data.twitter;
            linkedin.value = data.linkedin;
        } else {
            hideLoader();
            showAlert("Document does not exist!");
        }
    }).catch(function (error) {
        hideLoader();
        showAlert("Error getting data: ", error);
        console.error("Error getting document: ", error);
    });

}
function populateProjects() {
    showLoader();
    let collectionRef = db.collection("frontendProjects");
    collectionRef.get()
        .then((querySnapshot) => {
            var documents = [];

            // Iterate over the documents
            querySnapshot.forEach(function (doc) {
                var documentData = doc.data();
                documents.push(documentData);
            });

            showProjects(documents)
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });
}
function showProjects(projects) {
    let html = '';
    projects.forEach(project => {
        let item = `
            <div class="row border p-3">
                <div class="col-md-3 col-lg-3 col-12">
                    <img src="${project.imageUrl}" alt="Image" width="200">
                </div>
                <div class="col-md-9 col-lg-9 col-12">
                    <h5>Description</h5>
                    <p class="description">${project.description}</p>
                </div>
                <button class="btn btn-danger delete" data-id="${project.projectId}">Delete</button>
            </div>
        `
        html += item;
    })
    hideLoader();
    document.querySelector(".projects").innerHTML = html;
    let deleteProjectBtn = document.querySelectorAll(".delete");
    deleteProjectBtn.forEach(project => {
        project.addEventListener("click", () => {
            let projectId = project.getAttribute("data-id");
            deleteProject(projectId);
        })
    })
}


let addNewProject = document.querySelector("#addNewProject");
addNewProject.addEventListener("click", e => {
    document.querySelector(".newProject").innerHTML += `
                                <div class="row border p-3 mt-3">
                                    <div class="col-md-3 col-lg-3 col-12">
                                        <h5>Choose Project Image</h5>
                                        <input type="file" id="newProjectImage" class="form-control">
                                    </div>
                                    <div class="col-md-9 col-lg-9 col-12">
                                        <h5>Description</h5>
                                        <textarea name="" class="form-control newProjectDesc" id="newProjectDesc" cols="30" rows="4" style="max-height: 200px;"></textarea>
                                        <button class="btn btn-primary mt-2 addNewProjectBtn" onclick="addNewProjectFunction()">Add</button>
                                    </div>
                                </div>
    `
})




function addNewProjectFunction() {
    let desc = document.querySelector("#newProjectDesc").value;
    let fileinput = document.querySelector("#newProjectImage");
    if (desc.length == '') {
        showAlert("Description cannot be empty!");
    }
    else {
        showLoader();

        const file = fileinput.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child('images/' + file.name);
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
                    const docId = db.collection("frontendProjects").doc().id;
                    db.collection("frontendProjects").doc(docId).set({
                        projectId: docId,
                        imageUrl: downloadURL,
                        description: desc,
                        addedAt: Date.now()
                    })
                        .then(() => {
                            hideLoader();
                            showAlert('Project Added successfully')
                            populateProjects();
                            desc.value = '';
                            fileinput.value = '';
                        })
                        .catch((error) => {
                            hideLoader();
                            showAlert("Error: ", error);
                        });
                });
            }
        );

    }
}

function deleteProject(id) {
    showLoader()
    const docRef = firebase.firestore().collection('frontendProjects').doc(id)
    docRef.delete()
        .then(() => {
            hideLoader()
            // console.log('Document deleted successfully');
            showAlert('Project Deleted Successfully')
            populateProjects()
        })
        .catch((error) => {
            hideLoader()
            // console.error('Error deleting document:', error);
            showAlert('Error deleting Project')
        });
}

// new testimonials 
let addNewTestimonial = document.querySelector("#addNewTestimonial");
addNewTestimonial.addEventListener("click", e => {
    document.querySelector(".newTestimonial").innerHTML += `
                            <div class="row border p-3 mt-3">
                                <div class="col-md-4 col-lg-4 col-12">
                                    <div class="">
                                        <h5>Choose Reviewer Image</h5>
                                        <input type="file" id="newTestimonialImage" class="form-control">
                                    </div>
                                    <div class="">
                                        <label for="">Name</label>
                                        <input type="text" id="name" class="form-control name">
                                    </div>
                                    <div class="">
                                        <label for="">Designation</label>
                                        <input type="text" id="designation" class="form-control designation">
                                    </div>
                                </div>
                                <div class="col-md-8 col-lg-8 col-12">
                                    <h5>Review</h5>
                                    <textarea name="" class="form-control review" id="review" cols="30" rows="6" style="max-height: 200px;"></textarea>
                                    <button class="btn btn-primary mt-2 addNewTestimonialBtn" onclick="addNewTestimonialFunction()">Add</button>
                                </div>
                            </div>
    `
})

function addNewTestimonialFunction() {
    let name = document.querySelector("#name").value;
    let designation = document.querySelector("#designation").value;
    let review = document.querySelector("#review").value;
    let fileinput = document.querySelector("#newTestimonialImage");
    if (review.length == '' || name.length == '' || fileinput.value == '') {
        alert("Fields cannot be empty!");
    }
    else {
        showLoader();

        const file = fileinput.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child('images/' + file.name);
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
                    const docId = db.collection("testimonials").doc().id;
                    db.collection("testimonials").doc(docId).set({
                        testimonialId: docId,
                        imageUrl: downloadURL,
                        name: name,
                        designation: designation,
                        review: review,
                        addedAt: Date.now()
                    })
                        .then(() => {
                            hideLoader();
                            showAlert('Testimonial Added successfully')
                            populateTestimonials();
                            document.querySelector("#name").value = '';
                            document.querySelector("#review").value = '';
                            document.querySelector("#designation").value = '';
                            fileinput.value = '';
                        })
                        .catch((error) => {
                            hideLoader();
                            showAlert("Error: ", error);
                        });
                });
            }
        );

    }
}

populateTestimonials()
function populateTestimonials() {
    showLoader();
    let collectionRef = db.collection("testimonials");
    collectionRef.get()
        .then((querySnapshot) => {
            var documents = [];

            // Iterate over the documents
            querySnapshot.forEach(function (doc) {
                var documentData = doc.data();
                documents.push(documentData);
            });

            showTestimonials(documents)
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });
}
function showTestimonials(reviews) {
    let html = '';
    reviews.forEach(data => {
        let item = `
        <div class="row border p-3 mt-3">
            <div class="col-md-4 col-lg-4 col-12">
                <div class="">
                    <img src="${data.imageUrl}" alt="Image" width="200">
                </div>
                
            </div>
            <div class="col-md-8 col-lg-8 col-12">
                <div class="">
                    <label for="">Name</label>
                    <input type="text" class="form-control name" value="${data.name}" readonly>
                </div>
                <div class="">
                    <label for="">Designation</label>
                    <input type="text" class="form-control designation" value="${data.designation}" readonly>
                </div>
                <div>
                    <h5>Review</h5>
                    <textarea name="" class="form-control added_testimonial_review" id="added_review" cols="30" rows="6" style="max-height: 200px;" readonly>${data.review}</textarea>
                </div>
                    <button class="btn btn-danger deleteTestimonial" data-id="${data.testimonialId}">Delete</button>
            </div>
        </div>
        `
        html += item;
    })
    hideLoader();
    document.querySelector(".testimonials").innerHTML = html;
    let deleteProjectBtn = document.querySelectorAll(".deleteTestimonial");
    deleteProjectBtn.forEach(data => {
        data.addEventListener("click", () => {
            let testimonialId = data.getAttribute("data-id");
            deleteTestimonial(testimonialId);
        })
    })
}


function deleteTestimonial(id) {
    showLoader()
    const docRef = firebase.firestore().collection('testimonials').doc(id)
    docRef.delete()
        .then(() => {
            hideLoader()
            // console.log('Document deleted successfully');
            showAlert('Testimonial Deleted Successfully')
            populateTestimonials()
        })
        .catch((error) => {
            hideLoader()
            // console.error('Error deleting document:', error);
            showAlert('Error deleting Testimonial')
        });
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