class AdminView {
  #parentElement = document.querySelector('.admin-content');
  #productElement = document.querySelector('.products');
  #adminButton = document.querySelector('.admin-link');
  #deleteProductBtn = document.querySelector('.delete-product-btn');
  #products;

  render(products) {
    this.#products = products;
    const markUp = this.#generateMarkup();
    this.#parentElement.innerHTML = '';
    this.#productElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  addHandlerRender(handler) {
    this.#adminButton.addEventListener('click', handler);
  }

  #generateMarkup() {
    return `
    <section>
      <div class="container-xl">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>Manage <b>Products</b></h2>
                </div>
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th></th>
                  <th>Brand</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>			
                <tr>
                  ${this.#generateProductsDetail()}
                </tr> 
              </tbody>
            </table>
         </div>        
        </div>
    </section>
    `;
  }

  #generateProductsDetail() {
    let markUp = '';
    this.#products.map(product => {
      markUp += `
        <tr>
          <td>${product.id}</td>
          <td><img class="card-img-top" src="${product.images[0]}" style="width:25px;height:25px;" alt="..." /></td>
          <td>${product.brand}</td>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td>
            <a href="#edit/${product.id}">Edit</a>
            <a href="#deleteView/${product.id}">Delete</a>
          </td>
        </tr>
      `;
    })
    return markUp;
  }
}

export default new AdminView();

