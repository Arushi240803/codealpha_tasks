console.log("product-details.js loaded");

const productDetails =
  document.getElementById("product-details");


// GET ID FROM URL
const params =
  new URLSearchParams(window.location.search);

const id =
  params.get("id");


// FETCH PRODUCT
const fetchProduct = async () => {

  try {

    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`
    );

    const product =
      await response.json();

    displayProduct(product);

  } catch (error) {

    console.log(error);
  }
};


// DISPLAY PRODUCT
const displayProduct = (product) => {

  productDetails.innerHTML = `

    <div class="details-card">

      <div class="details-image">

        <img
          src="${product.image}"
          alt="${product.title}"
        >

      </div>


      <div class="details-info">

        <h1>${product.title}</h1>

        <p class="category">
          ${product.category}
        </p>

        <p class="description">
          ${product.description}
        </p>

        <h2>$${product.price}</h2>

        <button id="details-add-btn">
          Add To Cart
        </button>

      </div>

    </div>

  `;


  // BUTTON EVENT
  const addBtn =
    document.getElementById("details-add-btn");

  addBtn.addEventListener(
    "click",
    () => {

      addToCart(product);
    }
  );
};



// ADD TO CART
const addToCart = (product) => {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  const existingProduct =
    cart.find(
      (item) => item.id === product.id
    );


  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({

      ...product,

      quantity: 1,
    });
  }


  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  console.log(
    "ADDED:",
    product.title
  );

  alert("Added to cart");
};


// INITIAL FETCH
fetchProduct();