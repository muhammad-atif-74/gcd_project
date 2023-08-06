
// < div class="grid-item" >
//       <img src="assets/img2.jpeg" alt="Image 2" />
//       <p class="description">This is description of the project</p>
//     </div >

getTestimonials()
function getTestimonials() {
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
function showTestimonials(data) {
    let testimonialsContainer = document.querySelector(".testimonialsContainer")

    let html = '';
    data.forEach(rev => {
        let item = `
        <div class="item review-item">
          <div class="profile-image">
            <img src="${rev.imageUrl}" alt="client image" class />
          </div>
          <p class="name custom-text-primary">${rev.name}</p>
          <p class="role">${rev.designation}</p>
          <p class="review">
            "${rev.review}"
          </p>
        </div>
        `
        html += item;
    })

    hideLoader()
    testimonialsContainer.innerHTML = html;

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
}


function showLoader() {
    document.querySelector(".loader").classList.remove('d-none');
}
function hideLoader() {
    document.querySelector(".loader").classList.add('d-none');
}