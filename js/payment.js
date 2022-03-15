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
        total += Number(cost);
        count += 1;
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
