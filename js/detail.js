import getProducts from "./getProducts.js";
import { showOffers } from "./showOffers.js";

const detailProduct = async (product, url) => {
  const { id, img, name, price, offer } = product;
  let productContainer = document.getElementById("product-detail");
  let imageContainer = document.getElementById("img-detail");
  let cost;
  if (offer != "") {
    cost = price - price * (offer / 100);
    cost = cost.toFixed(1);
  }
  !isNaN(cost) ? (cost = `$${cost} /kg`) : (cost = price);
  imageContainer.innerHTML = "";
  imageContainer.innerHTML = `
    <img src="${img}" alt="product">
  `;

  productContainer.innerHTML = "";
  productContainer.innerHTML = `
    <h3>${name}</h3>
    <p>${cost}</p>
    <span>Precios con IVA incluido</span>
    <p>El peso puede variar de acuerdo al peso real</p>
    <h4>Seleccione el intérvalo de días</h4>
    <select name="interval" class="form-control select-input" id="interval">
        <option value="" selected hidden>Seleccionar</option>
        <option value="hoy">Para hoy</option>
        <option value="de 3 a 5 días">3 a 5 días</option>
        <option value="7 días">7 días</option>
    </select>
    <div id="action-detail">
        <div id="quantity-product">
            <div id="reduce-quantity"><span id="reduce-quantity-btn">&#8722;</span></div>
            <div id="quantity">1</div>
            <div id="add-quantity"><span id="add-quantity-btn">&#x2B</span></div>
        </div>
        <div id="add-detail">
            <button class="btn btn-success" value="${id}" id="add-product-detail">Agregar</button>
        </div>
    </div>
  `;
  const offers = await getProducts(url);
  const offerContainer = document.getElementById("related-container");
  offerContainer.innerHTML = "";
  showOffers(offers, offerContainer);
};

export default detailProduct;
