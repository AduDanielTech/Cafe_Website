const layout = require('../layout');

module.exports = () => {
 
  return layout({
    content: `
   
    <!-- Main -->
    <header id="home" >
        <div class="container text-light">
            <div class="row align-items-center justify-content-between ">
                <div class="col p-5 justify-content-center">
                    <h2>
                        Enjoy Our 
                    </h2>
                    <h2>
                        Delicious Meal
                    </h2>
                    <p class="lead">
                       Embark on a gastronomic adventure in a welcoming ambiance. Savor a symphony of flavors, crafted with passion and care. Unforgettable dining moments await you.
                    </p>
                    <a href="/book" class="btn p-3 btn-light  mt3 text-light bg-custom">
                       BOOK A TABLE
                    </a>
                </div>
                <div class="col-lg-6 text-center text-lg-end overflow-hidden">
                    <img src="/image/hero.png" alt="img" class="img-fluid img  ">
                </div>
            </div>
        </div>
    </header>
    <section class="container-xxl py-5">
    <div class="container">
    <div class="row g-4">
        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="service-item rounded pt-3">
                <div class="p-4">
                    <i class="fa fa-3x fa-user-tie text-custom mb-4"></i>
                    <h5>Experienced Chefs</h5>
                    <p>Our team consists of skilled and experienced chefs who are passionate about delivering culinary excellence.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="service-item rounded pt-3">
                <div class="p-4">
                    <i class="fa fa-3x fa-utensils text-custom mb-4"></i>
                    <h5>Premium Quality Food</h5>
                    <p>We source the finest ingredients to create dishes that are not only delicious but also of the highest quality.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="service-item rounded pt-3">
                <div class="p-4">
                    <i class="fa fa-3x fa-cart-plus text-custom mb-4"></i>
                    <h5>Convenient Online Ordering</h5>
                    <p>With our user-friendly online ordering system, you can easily place your order from the comfort of your home.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <div class="service-item rounded pt-3">
                <div class="p-4">
                    <i class="fa fa-3x fa-headset text-custom mb-4"></i>
                    <h5>24/7 Customer Support</h5>
                    <p>Our dedicated customer support team is available around the clock to assist you with any inquiries or concerns.</p>
                </div>
            </div>
        </div>
    </div>
</div>

</section>
    <!-- About Start -->
    <section class="container-xxl py-5" id="about">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6">
                    <div class="row g-3">
                        <div class="col-6 text-start">
                            <img class="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src="/image/about-1.jpg">
                        </div>
                        <div class="col-6 text-start">
                            <img class="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="/image/about-2.jpg" style="margin-top: 25%;">
                        </div>
                        <div class="col-6 text-end">
                            <img class="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="/image/about-3.jpg">
                        </div>
                        <div class="col-6 text-end">
                            <img class="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="/image/about-4.jpg">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 about-us-header">
                    <h5 class="section-title ff-secondary text-start text-custom fw-normal">About Us</h5>
                    <h1 class="mb-4"><div>Welcome to</div> <i class="fa fa-utensils text-custom me-2"></i><div>The Gourmet Griddle</div></h1>
                    <p class="mb-4"> where culinary artistry meets warm hospitality! Our journey began with a passion for crafting exquisite flavors and a commitment to providing a memorable dining experience for every guest that walks through our doors. Our diverse menu celebrates the harmonious blend of tastes from around the world, offering sizzling beef patties, mouthwatering pizzas, hearty burgers, fluffy pancakes, and more.</p>
                    <p class="mb-4"> where skilled chefs craft culinary masterpieces using quality ingredients. Our cozy ambiance is perfect for gathering with friends and family to indulge in delectable dishes and create lasting memories. Join us for a delightful culinary adventure and savor the flavors that make our cafe store a true delight for all. Bon appétit!</p>
                    <div class="row g-4 mb-4">
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center border-start border-5 border-custom px-3">
                                <h1 class="flex-shrink-0 display-5 text-custom mb-0" data-toggle="counter-up">15</h1>
                                <div class="ps-4">
                                    <p class="mb-0">Years of</p>
                                    <h6 class="text-uppercase mb-0">Experience</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center border-start border-5 border-custom px-3">
                                <h1 class="flex-shrink-0 display-5 text-custom mb-0" data-toggle="counter-up">50</h1>
                                <div class="ps-4">
                                    <p class="mb-0">Popular</p>
                                    <h6 class="text-uppercase mb-0">Master Chefs</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="btn bg-custom py-3 px-5 mt-2 white"  href="">Read More</a>
                </div>
            </div>
        </div>
    </section>
    <!-- About End -->
    
    
  <!-- Teams -->
  <section id="team" class="container-xxl pt-5 pb-3">
    <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 class="section-title ff-secondary text-center text-custom fw-normal">Team Members</h5>
            <h1 class="mb-5">Our Master Chefs</h1>
        </div>
        <div class="row g-4">
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div class="team-item text-center rounded overflow-hidden">
                    <div class="rounded-circle overflow-hidden m-4">
                        <img class="img-fluid" src="/image/team-1.jpg" alt="">
                    </div>
                    <h5 class="mb-0">John Smith</h5>
                    <small>Head Chef</small>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <div class="team-item text-center rounded overflow-hidden">
                    <div class="rounded-circle overflow-hidden m-4">
                        <img class="img-fluid" src="/image/team-2.jpg" alt="">
                    </div>
                    <h5 class="mb-0">Michael Johnson</h5>
                    <small>Sous Chef</small>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                <div class="team-item text-center rounded overflow-hidden">
                    <div class="rounded-circle overflow-hidden m-4">
                        <img class="img-fluid" src="/image/team-3.jpg" alt="">
                    </div>
                    <h5 class="mb-0">James Williams</h5>
                    <small>Pastry Chef</small>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                <div class="team-item text-center rounded overflow-hidden">
                    <div class="rounded-circle overflow-hidden m-4">
                        <img class="img-fluid" src="/image/team-4.jpg" alt="">
                    </div>
                    <h5 class="mb-0">Robert Davis</h5>
                    <small>Junior Chef</small>
                    <div class="d-flex justify-content-center mt-3">
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-square bg-custom mx-1" href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

  <!-- end of chef list -->
  <!-- Testimonial Start -->
  <section id="testimonial" class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
  <div class="container">
  <div class="text-center">
      <h5 class="section-title ff-secondary text-center text-custom fw-normal">Testimonials</h5>
      <h1 class="mb-5">What Our Customers Say!</h1>
  </div>
  <div class="owl-carousel testimonial-carousel">
      <div class="testimonial-item bg-transparent border rounded p-4">
          <div class="d-flex align-items-center pb-2">
              <img class="img-fluid flex-shrink-0 rounded-circle" src="/image/testimonial-1.jpg" style="width: 50px; height: 50px;">
              <div class="ps-3">
                  <h5 class="mb-1">John Doe</h5>
                  <small>Food Enthusiast</small>
              </div>
          </div>
          <p>The Gourmet Griddle's food is simply outstanding! The flavors are rich and the presentation is top-notch. I'm always excited to visit and try something new.</p>
      </div>
      <div class="testimonial-item bg-transparent border rounded p-4">
          <div class="d-flex align-items-center pb-2">
              <img class="img-fluid flex-shrink-0 rounded-circle" src="/image/testimonial-2.jpg" style="width: 50px; height: 50px;">
              <div class="ps-3">
                  <h5 class="mb-1">Jane Smith</h5>
                  <small>Food Blogger</small>
              </div>
          </div>
          <p>The Gourmet Griddle's food never disappoints. Each dish is a work of art and a burst of flavors. It's my go-to place for a delightful culinary experience.</p>
      </div>
      <div class="testimonial-item bg-transparent border rounded p-4">
          <div class="d-flex align-items-center pb-2">
              <img class="img-fluid flex-shrink-0 rounded-circle" src="/image/testimonial-3.jpg" style="width: 50px; height: 50px;">
              <div class="ps-3">
                  <h5 class="mb-1">Michael Johnson</h5>
                  <small>Food Critic</small>
              </div>
          </div>
          <p>The Gourmet Griddle sets the bar high when it comes to culinary excellence. From appetizers to desserts, each dish tells a story of skill and passion.</p>
      </div>
      <div class="testimonial-item bg-transparent border rounded p-4">
          <div class="d-flex align-items-center pb-2">
              <img class="img-fluid flex-shrink-0 rounded-circle" src="/image/testimonial-4.jpg" style="width: 50px; height: 50px;">
              <div class="ps-3">
                  <h5 class="mb-1">Emily Davis</h5>
                  <small>Regular Customer</small>
              </div>
          </div>
          <p>The Gourmet Griddle's food never ceases to amaze me. The flavors are unique, and the ambiance adds to the overall dining experience. It's a hidden gem!</p>
      </div>
  </div>
</div>

  </section>
  <!-- Testimonial End -->
    `
  });
};
