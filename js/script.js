import getProducts from "./getProducts.js";
import { showOffers } from "./showOffers.js";
import { showPopular } from "./showPopular.js";
import detailProduct from "./detail.js";
import offerToCart from "./cart.js";
import { popularToCart } from "./cart.js";
import { showProductsCart } from "./cart.js";

const offerContainer = document.getElementById("offers-container");
const popularContainer = document.getElementById("popular-container");
const closeDetail = document.getElementById("close-detail");
const modalDetail = document.getElementById("modal-detail-bg");
const cart = document.getElementById("cart-button");
const modalCart = document.getElementById("modal-cart");
const closeCart = document.getElementById("close-cart");
const addProductsN = document.getElementById("add-products-n");

const endpoint = "https://ag-sprint1.herokuapp.com/";

document.addEventListener("DOMContentLoaded", () => {
  const offers = getProducts(`${endpoint}Offers`);
  const popular = getProducts(`${endpoint}Popular`);
  offerContainer.innerHTML = "";
  popularContainer.innerHTML = "";
  showOffers(offers, offerContainer);
  showPopular(popular, popularContainer);
});

// PRODUCT DETAIL

const addQuantity = (quantityContainer) => {};

closeDetail.addEventListener("click", () => {
  modalDetail.style.display = "none";
});

offerContainer.addEventListener("click", async (e) => {
  modalDetail.style.display = "block";
  let id = e.target.getAttribute("value");
  let offer = await getProducts(`${endpoint}Offers/${id}`);
  await detailProduct(offer, `${endpoint}Offers`);
  const reduce = document.getElementById("reduce-quantity-btn");
  const add = document.getElementById("add-quantity-btn");
  reduce.addEventListener("click", () => {
    let quantity = document.getElementById("quantity");
    if (quantity.innerHTML != "1") {
      quantity.innerHTML = Number(quantity.innerHTML) - 1;
    } else {
      quantity.innerHTML = 1;
    }
  });
  add.addEventListener("click", () => {
    let quantity = document.getElementById("quantity");
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
  });

  const btnAdd = document.getElementById("add-product-detail");
  btnAdd.addEventListener("click", () => {
    let quantity = document.getElementById("quantity").innerHTML;
    offerToCart(offer, quantity);
  });
});
popularContainer.addEventListener("click", async (e) => {
  modalDetail.style.display = "block";
  let id = e.target.getAttribute("value");
  let popular = await getProducts(`${endpoint}Popular/${id}`);
  await detailProduct(popular, `${endpoint}Offers`);
  const reduce = document.getElementById("reduce-quantity-btn");
  const add = document.getElementById("add-quantity-btn");
  reduce.addEventListener("click", () => {
    let quantity = document.getElementById("quantity");
    if (quantity.innerHTML != "1") {
      quantity.innerHTML = Number(quantity.innerHTML) - 1;
    } else {
      quantity.innerHTML = 1;
    }
  });
  add.addEventListener("click", () => {
    let quantity = document.getElementById("quantity");
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
  });

  const btnAdd = document.getElementById("add-product-detail");
  btnAdd.addEventListener("click", () => {
    let quantity = document.getElementById("quantity").innerHTML;
    popularToCart(popular, quantity);
  });
});

// END PRODUCT DETAIL

// CART

const hideCart = () => {
  modalCart.style.display = "none";
};

cart.addEventListener("click", () => {
  modalCart.style.display = "block";
  showProductsCart();
});
closeCart.addEventListener("click", hideCart);
addProductsN.addEventListener("click", hideCart);

// END CART
