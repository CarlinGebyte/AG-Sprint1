import getProducts from "./getProducts.js";
import {showOffers} from "./showOffers.js";
import {showPopular} from "./showPopular.js"

const offerContainer = document.getElementById("offers-container");
const popularContainer = document.getElementById("popular-container");

const endpoint = "http://localhost:4000/";

document.addEventListener("DOMContentLoaded", () => {
  const offers = getProducts(`${endpoint}Offers`);
  const popular = getProducts(`${endpoint}Popular`);
  offerContainer.innerHTML = "";
  popularContainer.innerHTML = "";
  showOffers(offers, offerContainer);
  showPopular(popular, popularContainer);
});
