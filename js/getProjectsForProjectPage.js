
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
    let projectsGrid = document.querySelector(".project-grid")

    let html = '';
    data.forEach(project => {
        let item = `
        <div class="project-card">
          <div class="project-image">
            <img src="${project.imageUrl}" alt="project image" />
          </div>
          <div class="project-description">
            <p class="text-secondary">
              ${project.description}
            </p>
          </div>
        </div>
        `
        html += item;
    })

    hideLoader()
    projectsGrid.innerHTML = html;
}