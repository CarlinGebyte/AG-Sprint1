export const ShowProductsPayment = () => {
  let cartOffers = JSON.parse(localStorage.getItem("Offers"));
  let cartPopular = JSON.parse(localStorage.getItem("Popular"));
  const paymentItems = document.getElementById("cart-payment");

  if (cartOffers != null || cartPopular != null) {
    paymentItems.innerHTML = "";
    if (cartOffers != null) {
      cartOffers.forEach((offer) => {
        const { id, name, img, cost, quantity } = offer;
        paymentItems.innerHTML += `
        <div class="product">
            <div class="image-payment-product">
                <img src="${img}" alt="product">
            </div>
            <div class="product-payment-text">
                <p>${name}</p>
                <h5>$${cost}</h5>
            </div>
            <div class="payment-product-quantity">
                <div class="action-payment-container">
                    <div class="reduce-payment-quantity"><span class="reduce-quantity-btn" value="${id}">&#8722;</span></div>
                    <div class="quantity-payment">${quantity}</div>
                    <div class="add-payment-quantity"><span class="add-quantity-btn" value="${id}">&#x2B</span></div>
                </div>
            </div>
        </div>
    `;
      });
    }
    if (cartPopular != null) {
      cartPopular.forEach((productPopular) => {
        const { id, name, img, cost, quantity } = productPopular;
        paymentItems.innerHTML += `
        <div class="product">
            <div class="image-payment-product">
                <img src="${img}" alt="product">
            </div>
            <div class="product-payment-text">
                <p>${name}</p>
                <h5>$${cost}</h5>
            </div>
            <div class="payment-product-quantity">
                <div class="action-payment-container">
                    <div class="reduce-payment-quantity"><span class="reduce-quantity-btn" value="${id}">&#8722;</span></div>
                    <div class="quantity-payment">${quantity}</div>
                    <div class="add-payment-quantity"><span class="add-quantity-btn" value="${id}">&#x2B</span></div>
                </div>
            </div>
        </div>
    `;
      });
    }
  }
};

export const validatorCard = () => {
  const secureCVC = document.getElementById("secure-code");
  const cardNumber = document.getElementById("card-number-input");
  const btnPayment = document.getElementById("btn-payment-pay");
  const nameCard = document.getElementById("name-card-input");
  secureCVC.addEventListener("keyup", () => {
    if (isNaN(secureCVC.value)) {
      secureCVC.value = "";
    }
  });
  cardNumber.addEventListener("keyup", () => {
    if (isNaN(cardNumber.value.replaceAll(" ", ""))) {
      cardNumber.value = "";
    }
    if (
      cardNumber.value.length == 4 ||
      cardNumber.value.length == 9 ||
      cardNumber.value.length == 14
    ) {
      cardNumber.value += " ";
    }
  });
  nameCard.addEventListener("keyup", () => {
    if (cardNumber.value != "" && secureCVC.value != "") {
        btnPayment.removeAttribute('disabled')
    }
  });
};
