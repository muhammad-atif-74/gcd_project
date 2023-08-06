let sidebarnav = document.querySelector("#sidebarnav");

let dashboard = document.querySelector("#dashboard")
let website = document.querySelector("#website")
let finance = document.querySelector("#finance")
let rfp = document.querySelector("#rfp")
let projects = document.querySelector("#projects")
let bids = document.querySelector("#bids")
let users = document.querySelector("#users")
let employees = document.querySelector("#employees")
let contractors = document.querySelector("#contractors")

let role = sessionStorage.getItem("role");
let isSuper = sessionStorage.getItem("isSuper");
let isAdmin = sessionStorage.getItem("isAdmin");

if (!sessionStorage.getItem('userid')) {
    window.location.replace('login.html')
}

if (isSuper) {
    dashboard.classList.remove('d-none')
    website.classList.remove('d-none')
    // finance.classList.remove('d-none')
    rfp.classList.remove('d-none')
    users.classList.remove('d-none')
    employees.classList.remove('d-none')
    contractors.classList.remove('d-none')
}
if (isAdmin && role == 'contractor') {
    dashboard.classList.remove('d-none')
    website.classList.remove('d-none')
    rfp.classList.remove('d-none')

    document.querySelector(".userstitle").classList.add('d-none');
    projects.classList.remove('d-none')
    bids.classList.remove('d-none')
}
if (role == 'employee') {
    document.querySelector(".userstitle").classList.add('d-none');
    dashboard.classList.remove('d-none')
    if (!isSuper) {
        projects.classList.remove('d-none')
    }
}
if (role == 'contractor') {
    document.querySelector(".userstitle").classList.add('d-none');
    projects.classList.remove('d-none')
    bids.classList.remove('d-none')
}
if (role == 'client') {
    document.querySelector(".userstitle").classList.add('d-none');
    document.querySelector(".userstitle").classList.add('d-none');
    dashboard.classList.remove('d-none')
    projects.classList.remove('d-none')
}


// if(sessionStorage.getItem('role') == 2){
//     if(window.location.pathname == 'index.html'){
//         window.location.href = 'login.html'
//     }
//     sidebarnav.innerHTML = `
//             <li class="nav-small-cap">
//             <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//             <span class="hide-menu">Home</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="./index.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-layout-dashboard"></i>
//                     </span>
//                     <span class="hide-menu">Dashboard</span>
//                 </a>
//             </li>
//             <li class="nav-small-cap">
//                 <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span class="hide-menu">UI COMPONENTS</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="rfps.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-circle"></i>
//                     </span>
//                     <span class="hide-menu">RFPs</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link active" href="projects.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-article"></i>
//                     </span>
//                     <span class="hide-menu">Projects</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="bidonproject.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-user-plus"></i>
//                     </span>
//                     <span class="hide-menu">Bid On Project</span>
//                 </a>
//             </li>
//     `
// }
// if(role == 1){
//     sidebarnav.innerHTML = `
//             <li class="nav-small-cap">
//             <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//             <span class="hide-menu">Home</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="./index.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-layout-dashboard"></i>
//                     </span>
//                     <span class="hide-menu">Dashboard</span>
//                 </a>
//             </li>
//             <li class="nav-small-cap">
//                 <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span class="hide-menu">UI COMPONENTS</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="website.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-world"></i>
//                     </span>
//                     <span class="hide-menu">Website</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="finance.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-cards"></i>
//                     </span>
//                     <span class="hide-menu">Finance</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="rfps.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-circle"></i>
//                     </span>
//                     <span class="hide-menu">RFPs</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link active" href="projects.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-article"></i>
//                     </span>
//                     <span class="hide-menu">Projects</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="bidonproject.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-user-plus"></i>
//                     </span>
//                     <span class="hide-menu">Bid On Project</span>
//                 </a>
//             </li>
//     `
// }
// if(role == 1){
//     sidebarnav.innerHTML = `
//             <li class="nav-small-cap">
//             <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//             <span class="hide-menu">Home</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="./index.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-layout-dashboard"></i>
//                     </span>
//                     <span class="hide-menu">Dashboard</span>
//                 </a>
//             </li>
//             <li class="nav-small-cap">
//                 <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span class="hide-menu">UI COMPONENTS</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="website.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-world"></i>
//                     </span>
//                     <span class="hide-menu">Website</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="finance.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-cards"></i>
//                     </span>
//                     <span class="hide-menu">Finance</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="rfps.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-circle"></i>
//                     </span>
//                     <span class="hide-menu">RFPs</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link active" href="projects.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-article"></i>
//                     </span>
//                     <span class="hide-menu">Projects</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="bidonproject.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-user-plus"></i>
//                     </span>
//                     <span class="hide-menu">Bid On Project</span>
//                 </a>
//             </li>
//     `
// }
// if(role == 1){
//     sidebarnav.innerHTML = `
//             <li class="nav-small-cap">
//             <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//             <span class="hide-menu">Home</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="./index.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-layout-dashboard"></i>
//                     </span>
//                     <span class="hide-menu">Dashboard</span>
//                 </a>
//             </li>
//             <li class="nav-small-cap">
//                 <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span class="hide-menu">UI COMPONENTS</span>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="website.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-world"></i>
//                     </span>
//                     <span class="hide-menu">Website</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="finance.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-cards"></i>
//                     </span>
//                     <span class="hide-menu">Finance</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="rfps.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-circle"></i>
//                     </span>
//                     <span class="hide-menu">RFPs</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link active" href="projects.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-article"></i>
//                     </span>
//                     <span class="hide-menu">Projects</span>
//                 </a>
//             </li>
//             <li class="sidebar-item">
//                 <a class="sidebar-link" href="bidonproject.html" aria-expanded="false">
//                     <span>
//                         <i class="ti ti-user-plus"></i>
//                     </span>
//                     <span class="hide-menu">Bid On Project</span>
//                 </a>
//             </li>
//     `
// }
