const layout = require('../layout');
module.exports = ({}) => {
    return layout({
        content:`
        <!-- Reservation Start -->
        <section id="reservation" class="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
          <div class="row g-0">
            <div class="col-md-6">
              <div class="video">
                <a type="button" class="btn-play" data-bs-toggle="modal" href="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                  <span></span>
                </a>
              </div>
            </div>
            <div class="col-md-6 bg-custom1 d-flex align-items-center">
              <div class="p-5 wow fadeInUp" data-wow-delay="0.2s">
                <h5 class="section-title ff-secondary text-start text-custom fw-normal">Reservation</h5>
                <h1 class="text-white mb-4">Book A Table Online</h1>
                <form method="POST" action="/book" role="form">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-floating">
                        <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required>
                        <label for="name">Your Name</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-floating">
                        <input type="email" class="form-control" id="email" name="email" placeholder="Your Email" required>
                        <label for="email">Your Email</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <!-- Date input -->
                      <div class="form-floating" id="dateInput">
                        <input type="date" class="form-control" id="date" name="date" placeholder="Date" required>
                        <label for="date">Date</label>
                      </div>
                    </div>
        
                    <div class="col-md-6">
                      <!-- Time input -->
                      <div class="form-floating" id="timeInput">
                        <input type="time" class="form-control" id="time" name="time" placeholder="Time" required>
                        <label for="time">Time</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-floating">
                        <select class="form-select" id="select1" name="no_of_people" required>
                          <option value="1">People 1</option>
                          <option value="2">People 2</option>
                          <option value="3">People 3</option>
                        </select>
                        <label for="select1">No Of People</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating">
                        <textarea class="form-control" name="special_request" placeholder="Special Request" id="message" style="height: 100px"></textarea>
                        <label for="message">Special Request</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn bg-custom w-100 py-3" type="submit">Book Now</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        `
    })
}