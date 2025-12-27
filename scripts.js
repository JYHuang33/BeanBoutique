// Get the modal
const modal = document.getElementById("modal");

// Get the close button
const closeBtn = document.querySelector(".close");

// Show modal on first visit
window.onload = function () {
  if (!localStorage.getItem("visited")) {
    modal.style.display = "block";
    localStorage.setItem("visited", true);
  }
};

// Close modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Simple Image Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow img');

//show each slide function
function showSlide() {
  slides.forEach(slide => slide.classList.remove('active'));//loop through all slides and remove the 'active' class
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}

slides[0].classList.add('active');
setInterval(showSlide, 3000); // Change slide every 3 seconds


// Shopping Cart Functionality
//Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCart);

function filterProducts() {
    const filter = document.getElementById('product-search').value.toLowerCase();
    const cards = document.querySelectorAll('.coffee-list .coffee-item');
    const animationText = document.getElementById('search-animation-text');

    animationText.textContent = filter.length ? `Searching for: "${filter}"` : '';

    cards.forEach(item => {
        const title = item.querySelector('h2');

        if (title) {
            const product = title.textContent.toLowerCase();
            item.style.display = product.includes(filter) ? '' : 'none';
        }
    });
}

//  Add to Cart Success Function
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      image: image
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: `${name} has been added.`,
    showConfirmButton: false,
    timer: 1500
  });
}
