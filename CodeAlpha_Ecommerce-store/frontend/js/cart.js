const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   DISPLAY CART
========================= */

const displayCart = () => {
  cartContainer.innerHTML = "";

  // EMPTY CART
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <a href="../pages/products.html">
          Continue Shopping
        </a>
      </div>
    `;

    cartTotal.innerText = "";
    checkoutBtn.style.display = "none";
    return;
  }

  checkoutBtn.style.display = "block";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-card">

        <img src="${item.image}" alt="${item.title}" />

        <div class="cart-info">

          <h2>${item.title}</h2>

          <p class="price">
            $${item.price}
          </p>

          <div class="qty-controls">

            <button onclick="decreaseQuantity(${item.id})">
              −
            </button>

            <span>${item.quantity}</span>

            <button onclick="increaseQuantity(${item.id})">
              +
            </button>

          </div>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${item.id})"
        >
          Remove
        </button>

      </div>
    `;
  });

  cartTotal.innerText = `Total: $${total.toFixed(2)}`;
};

/* =========================
   UPDATE CART
========================= */

const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
};

/* =========================
   INCREASE QUANTITY
========================= */

const increaseQuantity = (id) => {
  cart = cart.map((item) => {
    if (item.id === id) {
      item.quantity++;
    }

    return item;
  });

  updateCart();
};

/* =========================
   DECREASE QUANTITY
========================= */

const decreaseQuantity = (id) => {
  cart = cart.map((item) => {
    if (item.id === id && item.quantity > 1) {
      item.quantity--;
    }

    return item;
  });

  updateCart();
};

/* =========================
   REMOVE ITEM
========================= */

const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
};

/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");

    // LOGIN CHECK
    if (!token) {
      alert("Login required");
      return;
    }

    // EMPTY CHECK
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    let totalPrice = 0;

    const orderItems = cart.map((item) => {
      totalPrice += item.price * item.quantity;

      return {
        name: item.title,
        quantity: item.quantity,
        price: item.price
      };
    });

    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        orderItems,
        totalPrice
      })
    });

    const data = await res.json();

    console.log("CHECKOUT RESPONSE:", data);

    if (!res.ok) {
      alert(data.message || "Order failed");
      return;
    }

    alert("Order placed successfully!");

    // CLEAR CART
    cart = [];

    updateCart();

  } catch (err) {
    console.log("CHECKOUT ERROR:", err);

    alert("Server error during checkout");
  }
});

/* =========================
   INITIAL LOAD
========================= */

displayCart();