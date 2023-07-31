


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
   
      


    
     new WOW().init();

  
  /* TOAST */
  
  function toast() {
    var notification = $('.notification')
    if (notification.hasClass('show-notification')) {
      notification.removeClass('show-notification').addClass('hide-notification');
    } else {
      notification.removeClass('hide-notification').addClass('show-notification');
      setTimeout(function() {
        notification.removeClass('show-notification').addClass('hide-notification');
      }, 3000); // Change the time in milliseconds (e.g., 3000 for 3 seconds)
    }
  }
  ``
  $('.toast-cont .fa-times').click(function(e) {
    e.stopPropagation();
    $(this).closest('.notification').removeClass('show-notification').addClass('hide-notification');
  });

        /* homepage url */
     $(document).ready(function() {
        var currentUrl = window.location.href;
        var isHomePage = currentUrl.endsWith('/') || currentUrl.endsWith('/index.html') || currentUrl.endsWith('/#reservation')|| currentUrl.endsWith('/#team') || currentUrl.endsWith('/#') || currentUrl.endsWith('');
      
        if (isHomePage) {
            
            $('body').removeClass();
            $('.navbar').removeClass('bg-custom1');
            $('body').addClass('hero-header');
        } else {
            $('.navbar').addClass('bg-custom1');
            $('body').addClass('other-header');
          $('body').removeClass();
        }
      });
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top bg-dark shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top bg-dark shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    //  toggle button for modal
        $("#modalBtn").click(function() {
            $("#modal").addClass("open-modal");
            
        });
        
        $("#close-btn").click(function() {
          
            $("#modal").removeClass("open-modal");
        });


          
    


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })

    });
    
     

/* ************************************* */
/* ************************************* */
/* *************REQUESTS *************** */
/* ************************************* */
/* ************************************* */


 // Handle product submission
 $('.add-to-cart').click( function(event) {
    const formData = event.target.parentElement.id
    const data = { productId: formData };

        $.ajax({        
      type: 'POST',
      url: '/cart/products',
      data: data, 
      success:async function(response) {
        const {successToast, quantity} = response
        await $('.toast-cont').html(successToast) 
        await $('.cart-link').append(``) 
        await $('.cart-link').append(`<span class="noproduct bg-custom">${quantity}</span>`) 
        
       
        return toast()
      },
      error: function(error) {
              console.error(error);   
      }
    });
  });  
  
  $('.searchInput').keyup( function(event) {
    const formData = $('.searchInput').val()
    
    const data = { title: formData };
    console.log('jiii')
        $.ajax({        
      type: 'POST',
      url: '/search',
      data: data, 
      success:async function(response) {
        const data = (item) =>  `<div class="col-lg-6">
        <div class="d-flex align-items-center pb-2">
            <img class="flex-shrink-0 img-fluid rounded" src="data:image/png;base64, ${item.image}" alt="" style="width: 80px;">
            <div class="w-100 d-flex flex-column text-start ps-4">
                <h5 class="d-flex justify-content-between border-bottom pb-2">
                    <span>${item.title}</span>
                    <span class="text-custom">$${item.price}</span>
                </h5>
               
                <span>
                <button id="${item.id}"  class="add-to-cart text-custom"  >
                  <span  class="material-symbols-outlined ">
                  shopping_cart
                  </span>
                  </button>
                
                </span>
                </small>
            </div>
        </div>
    </div>
        `
        const searchResult = (products) => {
          $('.search-overlay').html('')
          return  products.forEach(item => {
            $('.search-overlay').append(data(item))
          });
        
          }
    
    const render = (item) => {
      if (item) {
      
    } else {
      return item
    }}
       if(formData){
        return render(searchResult(response.products))
      }else {
        return $('.search-overlay').html('')
      }
     
      },
      error: function(err) {

              return console.error(err);   
      }
    });
  });  

  
  
  $('.checkout-btn').click( function(event) {
        $.ajax({        
      type: 'GET',
      url: '/cart/checkout',
      success:async function(response) {
       await $('#modal-container').html(response)
       return  $("#option-year").html(() => {
        let options = "";
        for (let year = 2023; year <= 2030; year++) {
          options += `<option>${year}</option>`;
        }
        
        return options;
      });
    
      },
      error: function(error) {
              console.error(error);   
      }
    });
  });  

  $(document).ready(function() {
    // Submit event handler for the checkout form
    $('#checkout-form').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      var formData = $(this).serialize(); // Get the form data
  
      $.post('/cart/payment', formData)
        .done(function(response) {
          console.log(response);
          // Handle the successful response here
        })
        .fail(function(error) {
          console.error(error);
          // Handle the error here
        });
    });
  });
  
   

  
  $(document).ready(function() {
    // updating totoal to checkouty
   
      
    // change quantity
    $('.change-quantity').change(function(e) {
        e.preventDefault();
        var changes = [];
        $('.change-quantity').each(function() {
          var productId  = $(this).data('product-id');
          var quantity = $(this).val();
          changes.push({ productId, quantity });
        });
        $.post('/cart/change', { changes }, function(response) {
            location.reload();
        });
      });

   
  });

})(jQuery);
