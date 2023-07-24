module.exports= ({prop}) =>{
    
    return`
    <div class="col-md-6 ">
    <!-- form card cc payment -->
    <div class="card card-overlay card-outline-secondary ${prop}">
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
            <form class="form" method='POST' action="/cart/form" role="form" autocomplete="off">
                <div class="form-group">
                    <label for="cc_name">Card Holder's Name</label>
                    <input name="card_name" type="text" class="form-control" id="cc_name"  title="First and last name" required="required">
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