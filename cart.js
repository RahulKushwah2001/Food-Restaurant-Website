// Load Cart from localStorage ===
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// === DOM Elements ===
const addToCartButtons = document.querySelectorAll('.btn');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');
const cartIcon = document.querySelector('.fa-shopping-cart');

// === Add to Cart ===
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const box = this.closest('.box');
      const title = box.querySelector('h3').innerText;
      const price = parseFloat(box.querySelector('span').innerText.replace(/[^\d.]/g, ''));
      const imageSrc = box.querySelector('img').src;

      const existingItem = cartItems.find(item => item.title === title);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          title,
          price,
          imageSrc,
          quantity: 1
        });
      }

      saveCart();
      updateCartCount();
      updateCartUI();
      showAddToCartMessage(title);
    });
  });
}

// === Update Cart UI ===
function updateCartUI() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    if (totalPriceElement) totalPriceElement.innerText = '0';
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');

    div.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.title}">
      <div class="cart-details">
        <h4>${item.title}</h4>
        <p>Price: ₹${item.price}</p>
        <p>
          Quantity:
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="changeQuantity(${index}, this.value)">
        </p>
        <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <span class="remove-btn" onclick="removeItem(${index})">✖</span>
    `;

    cartItemsContainer.appendChild(div);
  });

  if (totalPriceElement) {
    totalPriceElement.innerText = calculateTotal();
  }
}

// === Update Cart Count on 🛒 Icon ===
function updateCartCount() {
  const count = cartItems.reduce((total, item) => total + item.quantity, 0);
  if (cartCountElement) {
    cartCountElement.innerText = count;
  }
}

// === Save Cart to localStorage ===
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// === Remove Item from Cart ===
function removeItem(index) {
  cartItems.splice(index, 1);
  saveCart();
  updateCartCount();
  updateCartUI();
}

// === Change Quantity ===
function changeQuantity(index, newQty) {
  const qty = parseInt(newQty);
  if (qty < 1 || isNaN(qty)) return;

  cartItems[index].quantity = qty;
  saveCart();
  updateCartCount();
  updateCartUI();
}

// === Calculate Total Price ===
function calculateTotal() {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// === Checkout Placeholder ===
function checkout() {
  alert("Checkout functionality is not implemented yet.");
}

// === Optional: Toast Message Instead of Alert ===
function showAddToCartMessage(productName) {
  const toast = document.createElement('div');
  toast.innerText = `${productName} added to cart!`;
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.padding = '10px 20px';
  toast.style.backgroundColor = '#333';
  toast.style.color = '#fff';
  toast.style.borderRadius = '4px';
  toast.style.zIndex = 1000;
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 1500);
}

// === Initial Load ===
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  updateCartCount();
});

