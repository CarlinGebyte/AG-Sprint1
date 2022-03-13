import getProducts from "./getProducts.js";
import { showOffers } from "./showOffers.js";
import { showPopular } from "./showPopular.js";
import detailProduct from "./detail.js";

const offerContainer = document.getElementById("offers-container");
const popularContainer = document.getElementById("popular-container");
const closeDetail = document.getElementById("close-detail");
const modalDetail = document.getElementById("modal-detail-bg");
const cart = document.getElementById("cart-button");
const modalCart = document.getElementById("modal-cart");
const closeCart = document.getElementById("close-cart");

const endpoint = "http://localhost:4000/";

document.addEventListener("DOMContentLoaded", () => {
  const offers = getProducts(`${endpoint}Offers`);
  const popular = getProducts(`${endpoint}Popular`);
  offerContainer.innerHTML = "";
  popularContainer.innerHTML = "";
  showOffers(offers, offerContainer);
  showPopular(popular, popularContainer);
});

// card.addEventListener("click", (e) => {
//   console.log(modal);
//   let id = e.target.getAttribute("value");
//   let offer = getProducts(`${endpoint}Offers/${id}`);
//   modal.classList.add("show");
// });

closeDetail.addEventListener("click", () => {
  modalDetail.style.display = "none";
});

offerContainer.addEventListener("click", async (e) => {
  modalDetail.style.display = "block";
  let id = e.target.getAttribute("value");
  let offer = await getProducts(`${endpoint}Offers/${id}`);
  await detailProduct(offer, `${endpoint}Offers`);
});
popularContainer.addEventListener("click", async (e) => {
  modalDetail.style.display = "block";
  let id = e.target.getAttribute("value");
  let popular = await getProducts(`${endpoint}Popular/${id}`);
  await detailProduct(popular, `${endpoint}Offers`);
});

cart.addEventListener("click", () => {
  modalCart.style.display = "block";
});
closeCart.addEventListener("click", () => {
  modalCart.style.display = "none";
});
