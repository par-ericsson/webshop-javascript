/* const API_URL = 'https://dummyjson.com/products';

const parentElement = document.querySelector('.products');

let markUp = '';
fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let products = data.products;
    //console.log(products)
    products.map(product => {
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
    parentElement.insertAdjacentHTML('afterbegin', markUp);
  })
  .catch(function(error) {
    console.log(error);
  });
 */