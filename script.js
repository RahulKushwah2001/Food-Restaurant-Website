let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times'); // Ensure 'menu' is defined
    navbar.classList.remove('active'); // Ensure 'navbar' is defined

    section.forEach(sec => {
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) { // Changed => to >=
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
        }
    });
});


document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    loop:true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
    setInterval(loader, 2000);
}

window.onload = fadeOut;



// Cart data (simple array for now)
// const cartItems = [];

// // Get DOM elements
// const addToCartButtons = document.querySelectorAll('.btn');
// const cartItemsContainer = document.getElementById('cart-items');
// const cartIcon = document.querySelector('.fa-shopping-cart');
// const cartPanel = document.getElementById('cart-panel');

// // Add to cart event
// addToCartButtons.forEach(button => {
//   button.addEventListener('click', function(event) {
//     event.preventDefault();
    
//     const box = this.closest('.box');
//     const title = box.querySelector('h3').innerText;
//     const price = box.querySelector('span').innerText;
//     const imageSrc = box.querySelector('img').src;

//     const item = {
//       title,
//       price,
//       imageSrc
//     };

//     cartItems.push(item);
//     updateCartUI();
//   });
// });

// // Update cart UI
// function updateCartUI() {
//   cartItemsContainer.innerHTML = '';

//   cartItems.forEach(item => {
//     const div = document.createElement('div');
//     div.classList.add('cart-item');

//     div.innerHTML = `
//       <img src="${item.imageSrc}" alt="${item.title}">
//       <div>
//         <h4>${item.title}</h4>
//         <p>${item.price}</p>
//       </div>
//     `;

//     cartItemsContainer.appendChild(div);
//   });

//   cartPanel.style.display = 'block';
// }

// // Toggle cart panel on cart icon click
// cartIcon.addEventListener('click', function(event) {
//   event.preventDefault();
//   cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
// });


// // Inside main.js or your script in index.html

// addToCartButtons.forEach(button => {
//   button.addEventListener('click', function(event) {
//     event.preventDefault();

//     const box = this.closest('.box');
//     const title = box.querySelector('h3').innerText;
//     const price = parseFloat(box.querySelector('span').innerText.replace(/[^\d.]/g, ''));
//     const imageSrc = box.querySelector('img').src;

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const existingItem = cart.find(item => item.title === title);

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push({
//         title,
//         price,
//         imageSrc,
//         quantity: 1
//       });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     //window.location.href = 'cart.html'; 
//   });
// });



