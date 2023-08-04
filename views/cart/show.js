const layout = require('../layout');

module.exports = ({ items, totalPrice }) => {
  let renderedItems
  let empty
totalPrice !== 0?
 renderedItems = items
.map(item => {
   const price = parseFloat((item.product.price * item.quantity).toFixed(2))
  return `    
  <div class="cart-card cart">
  <label class="cart-title">Your cart <span>
  <form action="/cart/deleteItem" method="post">
    <input hidden value="${item.id}" name="productId">
    <button  class="delete-item w-20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="delete-item" fill="#ff0000" width="25px" height="25px" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
    </button>
    </form> 
   </span></label>
  <div class="products">
    
        <img class="flex-shrink-0 img-fluid rounded " load="lazy" src="data:image/png;base64, ${item.product.image}" alt="" style="width: 80px;">
      <div>
      <span class="cart-title">${item.product.title}</span>
      <p></p>
      <p></p>
      </div>
      <div class="quantity">
        <input class="change-quantity"  data-product-id="${item.id}" value="${item.quantity}" />
      </div>
      <label id class="cart-item-price small">$${item.product.price}</label>
    
  </div>
</div>
  `;
})
.join('')
:
 empty = `
<div class="cart-card cart emptycart" >
<div> 
<img src="/image/emptycart.jpg" class="emptycart-img" alt="empty cart">
</div>
<div class="emptycart-details">
<h2> There are no items in your cart</h2>
   <a class="bg-custom empty btn-a" href="/menu">Order From Menu</a>
</div>
</div>
`
  
 



  return layout({
    content: `
    
    ${totalPrice !== 0?
        `
          <section id="cart" class="pb-4">
      <div class="cart-cont">
      <div class="master-cont">
      
      ${renderedItems}
       <div class="card checkout">
        <label class="title">Checkout</label>
        <div class="details">
          <span>Your cart subtotal:</span>
          <span class="total-price">${totalPrice}$</span>
          <span>Discount through applied coupons:</span>
          <span>0$</span>
          <span>Shipping fees:</span>
          <span>0$</span>
        </div>
        <div class="checkout--footer">
          <label class="price total-price lower-total"><sup>$</sup><span >${totalPrice}</span></label>
          <button id="modalBtn" type="submit" class="checkout-btn">Checkout</button>
        </div>
      </div>
         `
       :empty}
     
    </div>
              </div>
      </section>
    `
  });
};
