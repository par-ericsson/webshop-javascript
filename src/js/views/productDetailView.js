class ProductDetailsView {
  #parentElement = document.querySelector('.products');
  #product;
  
  render(data) {
    this.#product = data;
    const markUp = this.#generateMarkup();
    //console.log(markUp)
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  // Publisher
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }
  
  #generateMarkup() {
    return `
      <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${this.#product[0].images[0]}" alt="..." />
      </div>
      <div class="col-md-6">
        <div class="small mb-1">${this.#product[0].brand}</div>
        <h1 class="display-5 fw-bolder">${this.#product[0].title}</h1>
        <div class="fs-5 mb-5">
          <span>$${this.#product[0].price}</span>
        </div>
        <p class="lead">${this.#product[0].description}</p>
        <div class="d-flex">
          <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
          <button class="btn btn-outline-dark flex-shrink-0" type="button">
            <i class="bi-cart-fill me-1"></i>
            Add to cart
          </button>
        </div>
      </div>
    `;
  }
}

export default new ProductDetailsView();