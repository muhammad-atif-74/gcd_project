function countEmployees() {
    showLoader()
    let employeesCount = document.querySelector("#employeesCount")
    const collectionName = "employees";
    const collectionRef = db.collection(collectionName);
    collectionRef.get()
        .then((querySnapshot) => {
            hideLoader()
            const numberOfDocuments = querySnapshot.size;
            // console.log("Number of documents in the collection:", numberOfDocuments);
            employeesCount.innerHTML = numberOfDocuments;
        })
        .catch((error) => {
            console.error("Error getting documents:", error);
        });
}
function countContractors() {
    showLoader()
    let contractorsCount = document.querySelector("#contractorsCount")
    const collectionName = "contractors";
    const collectionRef = db.collection(collectionName);
    collectionRef.get()
        .then((querySnapshot) => {
            hideLoader()
            const numberOfDocuments = querySnapshot.size;
            // console.log("Number of documents in the collection:", numberOfDocuments);
            contractorsCount.innerHTML = numberOfDocuments;
        })
        .catch((error) => {
            console.error("Error getting documents:", error);
        });
}
function countClients() {
    showLoader()
    let clientsCount = document.querySelector("#clients")
    const collectionName = "clients";
    const collectionRef = db.collection(collectionName);
    collectionRef.get()
        .then((querySnapshot) => {
            hideLoader()
            const numberOfDocuments = querySnapshot.size;
            // console.log("Number of documents in the collection:", numberOfDocuments);
            clientsCount.innerHTML = numberOfDocuments;
        })
        .catch((error) => {
            console.error("Error getting documents:", error);
        });
}
function countBids() {
    showLoader()
    let bidCount = document.querySelector("#bidCount")
    const collectionName = "bids";
    const collectionRef = db.collection(collectionName);
    collectionRef.get()
        .then((querySnapshot) => {
            hideLoader()
            const numberOfDocuments = querySnapshot.size;
            // console.log("Number of documents in the collection:", numberOfDocuments);
            bidCount.innerHTML = numberOfDocuments;
        })
        .catch((error) => {
            console.error("Error getting documents:", error);
        });
}

countEmployees()
countContractors()
countClients()
countBids()

function showLoader() {
    document.querySelector(".loader").classList.remove('d-none');
}
function hideLoader() {
    document.querySelector(".loader").classList.add('d-none');
}