function getProjects() {
    showLoader();

    let userid = sessionStorage.getItem('userid');
    let role = sessionStorage.getItem('role');

    let collectionRef = db.collection("bids");
    collectionRef.get()
        .then((querySnapshot) => {
            var documents = [];

            // Iterate over the documents
            querySnapshot.forEach(function (doc) {
                var documentData = doc.data();
                documents.push(documentData);
            });

            hideLoader()

            let hasProjects = false;
            documents.forEach(bid => {
                if (bid.userId == userid) {
                    populateTable(bid);
                    hasProjects = true;
                }
            })
            if (!hasProjects) {
                showAlert("Projects Not Found")
            }
        })
        .catch((error) => {
            console.error("Error getting collection documents: ", error);
        });

}
getProjects()

function populateTable(bid) {
    console.log(bid)
    $("#projectsTable").DataTable();
    const table = new DataTable('#projectsTable');
    table.row
        .add([
            bid.username,
            bid.message,
            bid.status?'Approved':'Pending',
            formatDate(bid.submittedAt),
            `
                <a href="${bid.formUrl}" target ="_blank">View Form</a>
            `
        ])
        .draw(false);
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