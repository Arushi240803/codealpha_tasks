const productsContainer =
  document.getElementById("products-container");

let productsData = [];


// FETCH PRODUCTS
const fetchProducts = async () => {

  try {

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    productsData =
      await response.json();

    displayProducts(productsData);

  } catch (error) {

    console.log(error);
  }
};



// DISPLAY PRODUCTS
const displayProducts = (products) => {

  productsContainer.innerHTML = "";


  products.forEach((product) => {

    // CREATE CARD
    const card =
      document.createElement("div");

    card.classList.add("product-wrapper");


    card.innerHTML = `

      <a
        href="../pages/product-details.html?id=${product.id}"
        class="product-link"
      >

        <div class="product-card">

          <img
            src="${product.image}"
            alt="${product.title}"
          >

          <h2>${product.title}</h2>

          <p class="category">
            ${product.category}
          </p>

          <p class="description">
            ${product.description.slice(0, 80)}...
          </p>

          <h3>
            $${product.price}
          </h3>

          <button class="add-btn">
            Add To Cart
          </button>

        </div>

      </a>

    `;


    // ADD TO CART BUTTON
    const addBtn =
      card.querySelector(".add-btn");


    addBtn.addEventListener(
      "click",
      (event) => {

        // STOP PAGE REDIRECT
        event.preventDefault();

        addToCart(product);
      }
    );


    productsContainer.appendChild(card);
  });
};



// UPDATE CART COUNT
const updateCartCount = () => {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;


  cart.forEach((item) => {

    total += item.quantity;
  });


  const cartCount =
    document.getElementById("cart-count");


  if (cartCount) {

    cartCount.innerText = total;
  }
};




// ADD TO CART
const addToCart = (product) => {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  const existingProduct =
    cart.find(
      (item) => item.id === product.id
    );


  // PRODUCT EXISTS
  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    // ADD NEW PRODUCT
    cart.push({

      ...product,

      quantity: 1,
    });
  }


  // SAVE TO LOCAL STORAGE
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  // UPDATE NAVBAR COUNT
  updateCartCount();


  console.log(
    "ADDED:",
    product.title
  );


  alert("Added to cart");
};


// INITIAL LOAD
updateCartCount();

fetchProducts();