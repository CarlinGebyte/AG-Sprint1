export const showPopular = async (array, cardContainer) => {
  const offers = await array;
  offers.forEach((element) => {
    const { id, name, price, img, offer, quantity } = element;
    if (offer === undefined) {
      cardContainer.innerHTML += `
        <div class="card" value="${id}">
                    <div id="img-card-popular">
                      <img src="${img}" class="card-img-top"
                           alt="offer" value="${id}" />
                    </div>

                    <div class="card-body" value="${id}">
                        <h5 class="card-title" value="${id}">${price}</h5>
                        <p class="card-text" value="${id}">${name}</p>
                        <p class="card-text" value="${id}">${quantity}</p>
                        <a href="#!" id="${id}" value="${id}" class="btn btn-success">Agregar</a>
                    </div>
                </div>
        `;
    } else {
      let cost = price - price * (offer / 100);
      cardContainer.innerHTML += `
        <div class="card" value="${id}">
                    <div id="text-offer-container" value="${id}">            
                      <p class="card-offer" value="${id}">${offer}% dto.</p>
                    </div>
                    <div id="img-card-popular">
                    <img src="${img}" class="card-img-top"
                        alt="offer" value="${id}" />
                    </div>

                    <div class="card-body" value="${id}">
                        <h5 class="card-title" value="${id}">$${cost}/kg <span>$${price}</span></h5>
                        <p class="card-text" value="${id}">${name}</p>
                        <p class="card-text" value="${id}">${quantity}</p>
                        <a href="#!" id="${id}" class="btn btn-success" value="${id}">Agregar</a>
                    </div>
                </div>
        `;
    }
  });
};
