class CartDetailView {
  #loadButton = document.querySelector('.cart--button');
  #parentElement = document.querySelector('.products');
  #data;
  #totalPrice;

  render(data, totalPrice) {
    this.#data = data;
    this.#totalPrice = totalPrice;
    const markUp = this.#data.length === 0 ? this.#generateMarkupEmpty() : this.#generateMarkup();
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  
  addHandlerRender(handler) {
    this.#loadButton.addEventListener('click', handler);
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
                <hr>
                <form>
                    <p>SHIPPING</p>
                    <select><option class="text-muted">Standard-Delivery- &dollar;2.00</option></select>
                </form>
                <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">Total Price</div>
                    <div class="col text-right">&dollar; ${this.#totalPrice}</div>
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
                  <button type="button" class="btn btn-dark btn-sm">-</button>
                  1
                  <button type="button" class="btn btn-dark btn-sm">+</button>
                </div>
              </div>
              <div class="col">&dollar; ${product.price}</div>
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

