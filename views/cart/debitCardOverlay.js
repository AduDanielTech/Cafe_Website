module.exports= ({total}) =>{
    const [whole, decimal] = total.toString().split('.');
   return `
   <div class="col-md-6 ">
   <!-- form card cc payment -->
   <div class="card-overlay card-outline-secondary">
       <div class=" user_card_form_cont">
           <div class="alert alert-info pb-3">
               <a class="close font-weight-normal initialism" data-dismiss="alert" href="#"><samp></samp></a> 
               User Card details<br>
               This doesn't charge you account
           </div>
           <form class="form" method='POST' action="/cart/payment" role="form" autocomplete="off">
              <div class="user_card_form">
               <div class="form_input">
                   <label for="cc_name">Holder's Name</label>
                   <input name="card_name" type="text" class="" id="cc_name"  title="First and last name" required="required">
               </div>
               <div class="form_input">
                   <label>Card Number</label>
                   <input name="card-number" id="numeric-input" type="text" class="" autocomplete="off" maxlength="20" title="Credit card number" required="">
               </div>
               <div class="form_input">
                   <label>Email</label>
                   <input name="email"  type="email" class="" autocomplete="off"  title="Email address" required="">
               </div>
               <div class="form_input">
                   <label>Home Address</label>
                   <input name="address"  type="text" class="" autocomplete="off"  title="Home address" required="">
               </div>
           </div>
           <div class="form_input card_date">
               <div class="card_expr_date">
                   <label class="">Card Exp. Date</label>
                   <select class="" name="cc_exp_mo" size="0">
                       <option value="01">01</option>
                       <option value="02">02</option>
                       <option value="03">03</option>
                       <option value="04">04</option>
                       <option value="05">05</option>
                       <option value="06">06</option>
                       <option value="07">07</option>
                       <option value="08">08</option>
                       <option value="09">09</option>
                       <option value="10">10</option>
                       <option value="11">11</option>
                       <option value="12">12</option>
                   </select>
               </div>
               <div class="card_expr_date">
                   <select class=" " id="option-year" name="cc_exp_yr" size="0">
                   </select>
               </div>
             
               <div class="card_expr_date">
                   <input name="CVC" type="text" class="CVC" autocomplete="off" maxlength="3" pattern="\\d{3}" title="Three digits at back of your card" required="" placeholder="CVC">
               </div>
           </div>
           <div class="">
               <label 
               class="col-md-12">Amount</label>
           </div>
           <div class="form-inline">
               <div class="input-group">
                   <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                   <input type="text" name="total" class="form-control text-right"  value='${whole}' readonly>
                   <div class="input-group-append"><span class="input-group-text">${decimal}</span></div>
               </div>
           </div>
           <hr>
               <div class="checkout-btns">
                   <div id="close-btn">
                       <a href="/cart" class="closee-btn btn  btn-default btn-md btn-block" >Cancel</a>
                   </div>
                   <div class="">
                       <button type="submit" class="btn checkout-confirm-btn bg-custom btn-md btn-block">Submit</button>
                   </div>
               </div>
               
           </form>
       </div>
   </div>
</div>
   `
}