const offerToCart = (product, quantity) => {
  const { id, name, img, price, offer } = product;
  let productsList = [];
  let cost;
  if (offer != "") {
    cost = price - price * (offer / 100);
    cost = cost.toFixed(1);
  }
  !isNaN(cost) ? (cost = `${cost}`) : (cost = price);
  let toAdd = {
    id,
    name,
    img,
    cost,
    quantity,
  };
  const storageCart = JSON.parse(localStorage.getItem("Offers"));

  if (storageCart !== null) {
    // SI YA EXISTE UN LOCAL STORAGE LO ACTUALIZO
    let inCart = [false];

    storageCart.forEach((product, index) => {
      if (product.id == id) {
        inCart = [true, index];
      }
    });
    if (inCart[0] != false) {
      let existProduct = storageCart[inCart[1]];
      existProduct.quantity = toAdd.quantity;
      existProduct.cost = (toAdd.cost * existProduct.quantity).toFixed(1);
      storageCart.splice(inCart[1], 1);
      storageCart.unshift(existProduct);
      localStorage.setItem("Offers", JSON.stringify(storageCart));
    } else {
      storageCart.unshift(toAdd);
      localStorage.setItem("Offers", JSON.stringify(storageCart));
    }
  } else {
    // SI NO EXISTE UN LOCAL STORAGE LO CONSTRUYO
    productsList.unshift(toAdd);
    localStorage.setItem("Offers", JSON.stringify(productsList));
  }
};

export const popularToCart = (product, quantity) => {
  const { id, name, img, price } = product;
  let productsList = [];
  let cost = Number(price.slice(1, 3));
  console.log(price.slice(1, 3));
  quantity = Number(quantity);
  let toAdd = {
    id,
    name,
    img,
    cost,
    quantity,
  };
  const storageCart = JSON.parse(localStorage.getItem("Popular"));

  if (storageCart !== null) {
    // SI YA EXISTE UN LOCAL STORAGE LO ACTUALIZO
    let inCart = [false];

    storageCart.forEach((product, index) => {
      if (product.id == id) {
        inCart = [true, index];
      }
    });
    if (inCart[0] != false) {
      let existProduct = storageCart[inCart[1]];
      existProduct.quantity = toAdd.quantity;
      existProduct.cost = (toAdd.cost * existProduct.quantity).toFixed(1);
      storageCart.splice(inCart[1], 1);
      storageCart.unshift(existProduct);
      localStorage.setItem("Popular", JSON.stringify(storageCart));
    } else {
      storageCart.unshift(toAdd);
      localStorage.setItem("Popular", JSON.stringify(storageCart));
    }
  } else {
    // SI NO EXISTE UN LOCAL STORAGE LO CONSTRUYO
    productsList.unshift(toAdd);
    localStorage.setItem("Popular", JSON.stringify(productsList));
  }
};

export const showProductsCart = () => {
  let cartOffers = JSON.parse(localStorage.getItem("Offers"));
  let cartPopular = JSON.parse(localStorage.getItem("Popular"));
  const cartItems = document.getElementById("cart-products");
  const modalCart = document.getElementById("modal-cart");
  const noProducts = document.getElementById("no-products");

  if (cartOffers != null || cartPopular != null) {
    cartItems.innerHTML = "";
  }
  let total = 0;
  let count = 0;
  if (cartOffers != null) {
    cartOffers.forEach((offer) => {
      const { id, name, img, cost, quantity } = offer;
      total += Number(cost);
      count += 1;
      cartItems.innerHTML += `
        <div class="product">
            <div class="image-cart-product">
                <img src="${img}" alt="product">
            </div>
            <div class="product-cart-text">
                <p>${name}</p>
                <h5>$${cost}</h5>
            </div>
            <div class="cart-product-quantity">
                <div class="action-cart-container">
                    <div class="reduce-cart-quantity"><span class="reduce-quantity-btn" value="${id}">&#8722;</span></div>
                    <div class="quantity-cart">${quantity}</div>
                    <div class="add-cart-quantity"><span class="add-quantity-btn" value="${id}">&#x2B</span></div>
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
      cartItems.innerHTML += `
        <div class="product">
            <div class="image-cart-product">
                <img src="${img}" alt="product">
            </div>
            <div class="product-cart-text">
                <p>${name}</p>
                <h5>$${cost}</h5>
            </div>
            <div class="cart-product-quantity">
                <div class="action-cart-container">
                    <div class="reduce-cart-quantity"><span class="reduce-quantity-btn" value="${id}">&#8722;</span></div>
                    <div class="quantity-cart">${quantity}</div>
                    <div class="add-cart-quantity"><span class="add-quantity-btn" value="${id}">&#x2B</span></div>
                </div>
            </div>
        </div>
    `;
    });
  }
  if (cartOffers != null || cartPopular != null) {
    cartItems.innerHTML += `
      <div id="cart-actions-end">
        <div id="clear-cart"><p id="clear-cart-btn">Vaciar canasta</p></div>
        <div id="pay-cart">
          <button class="btn btn-success" id="pay-cart-btn">
            <div id="count-cart-modal">${count}</div>
            <div id="go-pay">Ir a pagar</div>
            <div id="total-price-cart">$${total}</div>
          </button>
        </div>
      </div>
    `;
    localStorage.setItem('total', JSON.stringify(`${total}`))
    noProducts.style.display = "none";
  }
  modalCart.style.display = "block";
  
};

export default offerToCart;
