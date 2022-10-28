class ProductsView {
  // button for testing
  #loadButton = document.querySelector('.loadProducts');
  #parentElement = document.querySelector('.products');
  #data;

  render(data) {
    this.#data = data;
    const markUp = this.#generateMarkup();
    //console.log(markUp)
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  // Publisher
  addHandlerRender(handler) {
    this.#loadButton.addEventListener('click', handler);
    window.addEventListener('hashchange', handler);
    //window.addEventListener('load', handler);
  }

  #generateMarkup() {
    console.log('Inside view')
    console.log(this.#data)
    let markUp = '';
    this.#data.map(product => {
      markUp += `
        <div class="col mb-5">
        <div class="card h-100">
          <!-- Product image-->
          <img class="card-img-top" src="${product.images[0]}" alt="..." />
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <a href="#${product.id}">
                  <h5 class="fw-bolder">${product.title}</h5>
                </a>
                <!-- Product price-->
                $40.00 - $80.00
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
          </div>
        </div>
      </div>
      `;
    });
    return markUp;
  }
}

export default new ProductsView();