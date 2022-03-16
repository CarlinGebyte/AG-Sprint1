export const showOffers = async (array, cardContainer) => {
  const offers = await array;
  offers.forEach((element) => {
    const { id, name, price, img, offer } = element;
    let cost = price - price * (offer / 100);
    cost = cost.toFixed(1);
    cardContainer.innerHTML += `
        <div class="card" value="${id}">
            <div id="text-offer-container" value="${id}">            
                <p class="card-offer" value="${id}">${offer}% dto.</p>
            </div>
            <img src="${img}" value="${id}" class="card-img-top"
                alt="offer" />
            <div class="card-body" value="${id}">
                <h5 class="card-title" value="${id}">$${cost}/kg <span>$${price}</span></h5>
                <p class="card-text" value="${id}">${name}</p>
                <a href="#!" value="${id}" class="btn btn-success">Agregar</a>
            </div>
        </div>
        `;
  });
};
