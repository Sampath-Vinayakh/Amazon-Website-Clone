let productsHTML = ``
products.forEach((product)=>{
  productsHTML += `<div class="product-container">
  <div class="product-pic-container">
    <img src="${product.image}" class="product-pic">
  </div>
  <div class="product-name">
  ${product.name}
  </div>
  <div class="product-rating">
    <img src="images/ratings/rating-${product.rating.stars*10}.png" class="product-rating-image">
    <div class="product-rating-count">
      ${product.rating.count}
    </div>
  </div>
  <div class="product-price">
    $${(product.priceCents/100).toFixed(2)}
  </div>
  <div class="product-quantity-container">
    <select class="quantity-selector js-quantity-selector-${product.id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>
  </div>
  <div>
    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added to cart
    </div>
    <button class="add-to-cart-button js-add-to-cart" data-product-id = '${product.id}'>Add to cart</button>
  </div>
  </div>`;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;


document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      let timeoutId = '';
      button.addEventListener('click',()=>{
       const {productId} = button.dataset;
        let matcheditem;
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);

        cart.forEach((product)=>{
            if(product.productId===productId){
              matcheditem = product;
            }
        });
        if(matcheditem){
            matcheditem.quantity+= quantity;
        }
        else {
          cart.push({
            productId,
            quantity
          });
        }
        let cartQuantity = 0;
        cart.forEach((product)=>{
            cartQuantity +=product.quantity;
        });
        document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;

        if(timeoutId){
          clearTimeout(timeoutId);
        }
        document.querySelector(`.js-added-to-cart-${productId}`)
          .setAttribute("style","opacity:1");
        timeoutId = setTimeout(()=>{
          document.querySelector(`.js-added-to-cart-${productId}`)
          .setAttribute("style","opacity:0");
        },2000);
      })
    });