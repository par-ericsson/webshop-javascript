class EditView {
  #parentElement = document.querySelector('.products');
  #adminElement = document.querySelector('.admin-content');
  #product;

  renderForm(product) {
    this.#product = product[0];
    const markUp = this.#generateForm();
    this.#parentElement.innerHTML = '';
    this.#adminElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderEditedResult(product) {
    this.#product = product;
    const markUp = this.#generateResult();
    this.#parentElement.innerHTML = '';
    this.#adminElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  addHandlerUpload(handler) {
    this.#parentElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      const tempProduct = {};
      tempProduct.id = document.getElementById('productId').value;
      tempProduct.title = document.getElementById('productTitle').value;
      tempProduct.price = document.getElementById('productPrice').value;
    
      handler(tempProduct);
    });
  }

  #generateResult() {
    return `
      <div>
        <h2>Edited Product</h2>
        <h3>${this.#product.title}</h3>
        <h3>${this.#product.price}</h3>
      </div>
    `;
  }

  #generateForm() {
    return `
      <form>
        <h3>Edit form</h3>
        <label>Id</label>
        <input value="${this.#product.id}" disabled id="productId" />
        <label>Title</label>
        <input value="${this.#product.title}" required name="title" type="text" id="productTitle" />
        <label>Price</label>
        <input value="${this.#product.price}" required name="price" type="number" min="1" max="10000" id="productPrice" />
        <button>Submit</button>
      </form>
    `;
  }
}

export default new EditView();