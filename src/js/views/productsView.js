class ProductsView {
  #parentElement = document.querySelector('.products');
  #adminElement = document.querySelector('.admin-content');
  #data;

  render(data) {
    this.#data = data;
    const markUp = this.#generateMarkup();
    //console.log(markUp)
    this.#parentElement.innerHTML = '';
    this.#adminElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  // Publisher
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  addHandlerUpdateCart(handler) {
    this.#parentElement.addEventListener('click', function(evt) {
      const updateCartBtn = evt.target.closest('.addto-cart');
      if (!updateCartBtn) {
        return;
      }
      const id = +updateCartBtn.dataset.add;
      
      handler(id);
    })
  }

  renderSpinner() {
    const markUp = '<div class="lds-dual-ring"></div>';
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  #generateMarkup() {
    //console.log('Inside view')
    //console.log(this.#data)
    let markUp = '';
    this.#data.map(product => {
      markUp += `
        <div class="col mb-5">
        <div class="card h-100">
          <!-- Product image-->
          <h5 class="fw-bolder text-center pt-1">${product.brand}</h5>
          <img class="card-img-top" src="${product.images[0]}" alt="..." />
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <a href="#${product.id}">
                  <h5 class="fw-bolder">${product.title}</h5>
                </a>
                <!-- Product price-->
                $${product.price}
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
            <button class="text-center btn btn-outline-dark mt-auto addto-cart" data-add='${product.id}'>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      `;
    });
    return markUp;
  }
}

export default new ProductsView();

