
// < div class="grid-item" >
//       <img src="assets/img2.jpeg" alt="Image 2" />
//       <p class="description">This is description of the project</p>
//     </div >

getProjects()
function getProjects() {
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
            showLoader()
            showProjects(documents)
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });
}
function showProjects(data){
    let projectsGrid = document.querySelector(".projectsGrid")

    let html = '';
    data.forEach(project => {
        let item = `
        <div class="grid-item" >
            <img src="${project.imageUrl}" alt="Image 2" />
            <p class="description">${(project.description).substr(0, 20)}</p>
        </div>
        `
        html += item;
    })

    hideLoader()
    projectsGrid.innerHTML = html;
}


function showLoader() {
    document.querySelector(".loader").classList.remove('d-none');
}
function hideLoader() {
    document.querySelector(".loader").classList.add('d-none');
}