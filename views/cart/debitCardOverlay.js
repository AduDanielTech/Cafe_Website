module.exports= ({total}) =>{
    const [whole, decimal] = total.toString().split('.');
    return`
    <div class="col-md-6 ">
    <!-- form card cc payment -->
    <div class="card card-overlay card-outline-secondary">
        <div class="card-body ">
            <div class="card-body-header ">
            <h3 class="text-center">Credit Card Payment</h3>
            
            </div>
            <hr>
            <div class="alert alert-info p-2 pb-3">
                <a class="close font-weight-normal initialism" data-dismiss="alert" href="#"><samp></samp></a> 
                CVC code is required.<br>
                This doesn't charge you account
            </div>
            <form class="form" method='POST' action="/cart/payment" role="form" autocomplete="off">
                <div class="form-group">
                    <label for="cc_name">Card Holder's Name</label>
                    <input name="card_name" type="text" class="form-control" id="cc_name"  title="First and last name" required="required">
                </div>
                <div class="form-group">
                    <label>Card Number</label>
                    <input name="card-number" id="numeric-input" type="text" class="form-control" autocomplete="off" maxlength="20" title="Credit card number" required="">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input name="email"  type="email" class="form-control" autocomplete="off"  title="Email address" required="">
                </div>
                <div class="form-group">
                    <label>Home Address</label>
                    <input name="address"  type="text" class="form-control" autocomplete="off"  title="Home address" required="">
                </div>
                <div class="form-group row">
                    <label class="col-md-12">Card Exp. Date</label>
                    <div class="col-md-4">
                        <select class="form-control" name="cc_exp_mo" size="0">
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
                    <div class="col-md-4">
                        <select class="form-control " id="option-year" name="cc_exp_yr" size="0">
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input name="CVC" type="text" class="form-control" autocomplete="off" maxlength="3" pattern="\\d{3}" title="Three digits at back of your card" required="" placeholder="CVC">
                    </div>
                </div>
                <div class="row">
                    <label class="col-md-12">Amount</label>
                </div>
                <div class="form-inline">
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                        <input type="text" name="total" class="form-control text-right"  value='${whole}' readonly>
                        <div class="input-group-append"><span class="input-group-text">${decimal}</span></div>
                    </div>
                </div>
                <hr>
                <div class="form-group  checkout-btns">
                    <div id"close-btn">
                        <a href="/cart" class="closee-btn btn  btn-default btn-lg btn-block" >Cancel</a>
                    </div>
                    <div class="">
                        <button type="submit" class="btn checkout-confirm-btn bg-custom btn-lg btn-block">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
    `
}