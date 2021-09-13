// call products from API---------------------------------
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI ----------------------------------
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("m-1");
    div.innerHTML = `
    <div class="card h-100 border border-5 bg-light">
     <img src="${image}" class="card-img-top p-2" alt="..." width="100px" height="200px">
     <div class="card-body">
       <h6 class="card-title">${product.title.slice(0, 32)}</h6>
       <p>Category: ${product.category}</p>
       <h2>Price: $ ${product.price}</h2>
       <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary text-white">add to cart</button>     
       <button onclick="productDetails(${product.id})" id="details-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
       <div class="d-flex justify-content-around"> 
       <p class="text-white bg-secondary p-2 rounded">Rating: <span class="fw-bold">${product.rating.rate} <i class="far fa-smile"></i></span></p>
       <p class="text-white bg-primary p-2 rounded">Total review: <span class="fw-bold">${product.rating.count} <i class="fas fa-users"></i></span></p>
       </div>
     </div>
   </div>
    `
    document.getElementById("all-products").appendChild(div);
  }
};

// show details in modal part here ---------------------------------------
const productDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
}

const showDetails = (product) => {
  console.log(product);
  const detailsDiv = document.getElementById('productPrice')
  detailsDiv.textContent = '';
  detailsDiv.innerHTML = `
  <div class="card h-100 border border-5 bg-warning">
     <img src="${product.image}" class="card-img-top p-2" alt="..." width="250px" height="400px">
     <div class="card-body">
      <h5 class="card-title text-white bg-secondary p-1 rounded">${product.title}</h5>
      <p class="text-white bg-secondary p-1 rounded">Category: ${product.category}</p>
       <h2 class="text-white bg-secondary p-1 rounded">Price: $ ${product.price}</h2>
     </div>
  </div> `
}

// product total count here------------------------------
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function--------------------------------
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function------------------------------------
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax-----------------------
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function----------------------------
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};

// The end----------------------------------------------


