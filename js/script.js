import getProducts from "./getProducts.js";
import { showOffers } from "./showOffers.js";
import { showPopular } from "./showPopular.js";
import detailProduct from "./detail.js";
import offerToCart from "./cart.js";
import { popularToCart } from "./cart.js";
import { showProductsCart } from "./cart.js";
import { ShowProductsPayment } from "./payment.js";
import { validatorCard } from "./payment.js";

const offerContainer = document.getElementById("offers-container");
const popularContainer = document.getElementById("popular-container");
const closeDetail = document.getElementById("close-detail");
const modalDetail = document.getElementById("modal-detail-bg");
const addAlert = document.getElementById("alert-add");
const cart = document.getElementById("cart-button");
const modalCart = document.getElementById("modal-cart");
const closeCart = document.getElementById("close-cart");
const addProductsN = document.getElementById("add-products-n");
const locationText = document.getElementById("text-location-header");
const locationLogo = document.getElementById("logo-location-header");
const modalLocation = document.getElementById("modal-location-bg");
const closeLocation = document.getElementById("close-location");
const inputLocation = document.getElementById("selector-location");
const btnSearchLocation = document.getElementById("search-btn");
const location = document.getElementById("text-location-header");
const locationCart = document.getElementById("location-cart-tittle");
const paymentModal = document.getElementById("payment-bg");
const closePayment1 = document.getElementById("bg-return");
const closePayment2 = document.getElementById("return-text");
const modalThanks = document.getElementById("bg-thanks");

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

// const addQuantity = (quantityContainer) => {};

closeDetail.addEventListener("click", () => {
  modalDetail.style.display = "none";
});

const hideAlert = () => {
  addAlert.style.display = "none";
};

offerContainer.addEventListener("click", async (e) => {
  let id = e.target.getAttribute("value");
  if (id === null) return;
  modalDetail.style.display = "block";
  // console.log(id);
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
    modalDetail.style.display = "none";
    addAlert.style.display = "block";
    window.setTimeout(hideAlert, 4000);
  });
});
popularContainer.addEventListener("click", async (e) => {
  let id = e.target.getAttribute("value");
  if (id === null) return;
  modalDetail.style.display = "block";
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
    modalDetail.style.display = "none";
    addAlert.style.display = "block";
    window.setTimeout(hideAlert, 4000);
  });
});

// END PRODUCT DETAIL

// CART
const cartItems = document.getElementById("cart-products");
const noProducts = document.getElementById("no-products");

const hideCart = () => {
  modalCart.style.display = "none";
};

cart.addEventListener("click", () => {
  modalCart.style.display = "block";
  showProductsCart();
});
closeCart.addEventListener("click", hideCart);
addProductsN.addEventListener("click", hideCart);

cartItems.addEventListener("click", (e) => {
  const { target } = e;
  switch (target.id) {
    case "clear-cart-btn":
      const emptyCart = document.getElementById("clear-cart-btn");
      if (emptyCart != null) {
        emptyCart.addEventListener("click", localStorage.clear());
      }
      cartItems.innerHTML = "";
      noProducts.style.display = "block";
      console.log(target.id);
      break;
    case "pay-cart-btn":
    case "total-price-cart":
    case "count-cart-modal":
    case "go-pay":
      const openPaymentBtn = document.getElementById(`${target.id}`);
      const paymentModal = document.getElementById("payment-bg");
      const showPayment = () => {
        paymentModal.style.display = "block";
      };
      console.log(openPaymentBtn);
      openPaymentBtn.addEventListener("click", showPayment());
      console.log(target.id);
      const btnPayment = document.getElementById("btn-payment-pay");
      let total = JSON.parse(localStorage.getItem("total"));
      console.log(total);
      btnPayment.innerHTML = `
        Pagar <span>$${total}</span>
      `;
      ShowProductsPayment();
      break;
  }
});

// END CART

// HEADER LOCATION

const showLocationModal = () => {
  modalLocation.style.display = "block";
};
const hideLocation = () => {
  modalLocation.style.display = "none";
};

inputLocation.addEventListener("change", () => {
  btnSearchLocation.removeAttribute("disabled");
});

btnSearchLocation.addEventListener("click", () => {
  let locationUser = inputLocation.value;
  location.innerText = locationUser;
  locationCart.innerText = locationUser;
  hideLocation();
});
closeLocation.addEventListener("click", hideLocation);

locationText.addEventListener("click", showLocationModal);
locationLogo.addEventListener("click", showLocationModal);

// END HEADER LOCATION

// PAYMENT MODAL
const btnPayment = document.getElementById("btn-payment-pay");
const form = document.getElementById("form-payment");

const hideThanks = () => {
  modalThanks.style.display = "none";
};
const btnThanks = document.getElementById("button-thanks");
btnThanks.addEventListener("click", () => {
  hideThanks();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  paymentModal.style.display = "none";
  modalCart.style.display = "none";
  form.reset();
  console.log('first')
  modalThanks.style.display = "block";
  window.setTimeout(hideThanks, 5000);
});

const closePayment = () => {
  paymentModal.style.display = "none";
  btnPayment.removeAttribute("disabled");
  btnPayment.setAttribute("disabled", "disabled");
  form.reset();
};

closePayment1.addEventListener("click", closePayment);
closePayment2.addEventListener("click", closePayment);

validatorCard();
