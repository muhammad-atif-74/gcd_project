export function showAlert(msg) {
    document.querySelector(".customAlert").innerHTML = msg;
    document.querySelector(".customAlert").classList.replace('invisible', 'visible')
    setTimeout(() => {
        document.querySelector(".customAlert").classList.replace('visible', 'invisible')
    }, 4500);
}

export function showLoader() {
    document.querySelector(".loader").classList.remove('d-none');
}
export function hideLoader() {
    document.querySelector(".loader").classList.add('d-none');
}