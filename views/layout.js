module.exports = ({ content }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Gourmet Griddle</title>
            <!-- styles -->
    
            <!-- bootstrap link -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <link rel="stylesheet" href="/css/style.css">
    
            <!-- Google Fonts -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <!-- Google links -->
            <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            
            <!-- Icon Font Stylesheet -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    
        <!-- Library Stylesheets -->
        <link href="/lib/animate/animate.min.css" rel="stylesheet">
        
        
    </head>
    <body id="body" class="">
    <!-- modal -->
    <div id="modal" class="modal-overlay">
        <div id="modal-container" class="modal-container">
        
        </div>
      </div>
   
      <!-- Navbar -->
      <nav class="navbar navbar-expand-md navbar-dark container-fluid">
        <div class="container ">
            <a href="#" class="navbar-brand inflate-font">CAFE</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item active">
                        <a href="/" class="my-1 nav-link ">HOME</a>
                    </li>
                    <li class="nav-item">
                    <a href="/#about" class="my-1 nav-link about-link">ABOUT</a>
                    </li>
                    <li class="nav-item">
                    <a href="/menu" class="my-1 nav-link ">MENU</a>
                    </li>
                    <li class="nav-item">
                        <a href="/cart" class="my-1 nav-link cart-link">CART</a>
                    </li>
                    
                    <li class="nav-item">
                        <a href="/book" class="my-1 nav-link ">BOOK A TABLE</a>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a href="#" class="my-1 nav-link dropdown-toggle " data-bs-toggle="dropdown">MORE</a>
                        <div class="dropdown-menu m-0">
                            <a href="/#team" class="dropdown-item">Our Team</a>
                            <a href="/#testimonial" class="dropdown-item">Testimonial</a>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div> 
    </nav>
    <div class='toast-cont'> 
    </div>
          ${content}
            <!-- Footer Start -->
            <div class="container-fluid bg-custom1 text-light footer pt-5  wow fadeIn" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="row g-5">
                        <div class="col-lg-3 col-md-6">
                            <h4 class="section-title ff-secondary text-start text-custom fw-normal mb-4">Company</h4>
                            <a class="btn text-custom btn-link" href="">About Us</a>
                            <a class="btn text-custom btn-link" href="">Contact Us</a>
                            <a class="btn text-custom btn-link" href="">Reservation</a>
                            <a class="btn text-custom btn-link" href="">Privacy Policy</a>
                            <a class="btn text-custom btn-link" href="">Terms & Condition</a>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="section-title ff-secondary text-start text-custom fw-normal mb-4">Contact</h4>
                            <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>321 Street, Lagos, Nigeria</p>
                            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+2349079730611</p>
                            <p class="mb-2"><i class="fa fa-envelope me-3"></i>adudaniel097@gmail.com</p>
                            <div class="d-flex pt-2">
                                <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-youtube"></i></a>
                                <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="section-title ff-secondary text-start text-custom fw-normal mb-4">Opening</h4>
                            <h5 class="text-light fw-normal">Monday - Saturday</h5>
                            <p>09AM - 09PM</p>
                            <h5 class="text-light fw-normal">Sunday</h5>
                            <p>10AM - 08PM</p>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="section-title ff-secondary text-start text-custom fw-normal mb-4">Newsletter</h4>
                            <p>Stay updated with our latest offers and news by subscribing to our newsletter.</p>
                            <div class="position-relative mx-auto" style="max-width: 400px;">
                                <input class="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email">
                                <button type="button" class="btn bg-custom py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="copyright">
                        <div class="row">
                            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a class="border-bottom text-custom" href="#">CAFE</a>, All Right Reserved. 
                  Designed By <a class="border-bottom text-custom" href="https://github.com/Fhejs7g">Adu Daniel</a>
                            </div>
                            <div class="col-md-6 text-center text-md-end">
                                <div class="footer-menu">
                                    <a class="text-custom" href="">Home</a>
                                    <a class="text-custom" href="">Cookies</a>
                                    <a class="text-custom" href="">Help</a>
                                    <a class="text-custom" href="">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer End -->
    
    
            <!-- Back to Top -->
            <a href="#" class="btn btn-lg bg-custom btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
        </div>
        <!-- javascript -->
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
        <!-- Libraries -->
        <script src="/lib/wow/wow.min.js"></script>
        <script src="/lib/easing/easing.min.js"></script>
        <script src="/lib/counterup/counterup.min.js"></script>
    
        <script src="/js/main.js"></script>
        <script >
        (function ($) {
            "use strict";
            function safeExecution(callback) {
                try {
                  callback();
                } catch (error) {
                  console.error(error);
                  // Handle the error here, e.g., display an error message to the user or log it.
                }
              }
              
              $(document).ready(function() {
                safeExecution(function() {
                  // updating totoal to checkouty
              
                  // change quantity
                  $('.change-quantity').change(function(e) {
                    e.preventDefault();
                    var changes = [];
                    $('.change-quantity').each(function() {
                      var productId = $(this).data('product-id');
                      var quantity = $(this).val();
                      console.log(quantity);
                      changes.push({ productId, quantity });
                    });
                    $.post('/cart/change', { changes }, function(response) {
                      location.reload();
                    });
                  });
                });
              });
              
        })(jQuery);        
        </script>
    </body>
    </html>
    `;
  };
  