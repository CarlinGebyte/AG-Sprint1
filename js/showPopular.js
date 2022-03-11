export const showPopular = async (array, cardContainer) => {
  const offers = await array;
  offers.forEach((element) => {
    const { id, name, price, img, offer, quantity } = element;
    if (offer === undefined) {
      cardContainer.innerHTML += `
        <div class="card">
                    <img src="${img}" class="card-img-top"
                        alt="offer" />
                    <div class="card-body">
                        <h5 class="card-title">${price}</h5>
                        <p class="card-text">${name}</p>
                        <p class="card-text">${quantity}</p>
                        <a href="#!" id="${id}" class="btn btn-primary">Agregar</a>
                    </div>
                </div>
        `;
    } else {
      let cost = price - price * (offer / 100);
      cardContainer.innerHTML += `
        <div class="card">
                    <p class="card-offer">${offer}% dto.</p>
                    <img src="${img}" class="card-img-top"
                        alt="offer" />
                    <div class="card-body">
                        <h5 class="card-title">$${cost}/kg <span>$${price}</span></h5>
                        <p class="card-text">${name}</p>
                        <p class="card-text">${quantity}</p>
                        <a href="#!" id="${id}" class="btn btn-primary">Agregar</a>
                    </div>
                </div>
        `;
    }
  });
};
