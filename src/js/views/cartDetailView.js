class CartDetailView {
  #loadButton = document.querySelector('.cart--button');
  #parentElement = document.querySelector('.products');
  #adminElement = document.querySelector('.admin-content');
  // product
  #data;
  #totalPrice;

  render(data, totalPrice) {
    this.#data = data;
    this.#totalPrice = totalPrice;
    const markUp = this.#data.length === 0 ? this.#generateMarkupEmpty() : this.#generateMarkup();
    this.#parentElement.innerHTML = '';
    this.#adminElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  
  addHandlerRender(handler) {
    this.#loadButton.addEventListener('click', handler);
  }

  addDeleteCartItemHandler(handler) {
    this.#parentElement.addEventListener('click', function(evt) {
      const btn = evt.target.closest('.delete-cart-item');
      if (!btn) {
        return;
      }
      const productId = +btn.dataset.id;
  
      handler(productId);
    });
  }

  addHandlerUpdateQuantity(handler) {
    this.#parentElement.addEventListener('click', function(evt) {
      const btn = evt.target.closest('.btn-update-qty');
      if (!btn) {
        return;
      }
      const newQty= +btn.dataset.updateqty;
      const productId = +btn.dataset.id;
      if (newQty > 0) {
        handler(newQty, productId);
      }
    });
  }

  #generateMarkup() {
    let markUp = `
        <div class="card">
          <div class="row">
            <div class="col-md-8 cart">
              <div class="title">
                  <div class="row">
                      <div class="col"><h4><b>Your Cart!</b></h4></div>
                      <div class="col align-self-center text-right text-muted">${this.#data.length} items</div>
                  </div>
              </div>    
              ${this.#generateMarkupDetail()}
              <div class="back-to-shop"><a href="#">&leftarrow;</a><span class="text-muted">Back to shop</span></div>
            </div>
            <div class="col-md-4 summary">
                <div><h5><b>Summary</b></h5></div>
                <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">Total Price</div>
                    <div class="col text-right font-weight-bold">&dollar; ${this.#totalPrice}</div>
                </div>
                <button class="btn">CHECKOUT</button>
            </div>
          </div> 
        </div>
      `;
    return markUp;
  }

  #generateMarkupDetail() {
    let markUp = '';
    this.#data.map(product => {
      markUp += `
        <div class="row border-top border-bottom">
          <div class="row main align-items-center">
              <div class="col-2"><img class="img-fluid" src="${product.images[0]}" alt="${product.description}"></div>
              <div class="col">
                  <div class="row text-muted">${product.brand}</div>
                  <div class="row">${product.title}</div>
              </div>
              <div class="col">
                <div class="d-grid gap-2 d-md-block">
                  <button type="button" class="btn btn-dark btn-sm btn-update-qty" data-id="${product.id}" data-updateqty="${product.quantity - 1}">-</button>
                  ${product.quantity}
                  <button type="button" class="btn btn-dark btn-sm btn-update-qty" data-id="${product.id}" data-updateqty="${product.quantity + 1}">+</button>
                  <button class="btn ms-5 delete-cart-item" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
          </div>
        </div>
      `;
    })
    return markUp;
  }

  #generateMarkupEmpty() {
    return `
      <div>
        <p>No items!</p>
      </div>
    `;
  }
}

export default new CartDetailView();

