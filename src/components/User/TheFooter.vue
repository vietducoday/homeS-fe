<template >
  <!-- Footer -->
  <footer class="text-center text-lg-start" style="background-color: #062d62">
    <section class="bg-">
      <div class="container text-center text-md-start mt-5 text-white">
        <!-- Grid row -->
        <div class="row pt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <!-- Content -->

            <router-link to="/" class="navbar-brand d-flex align-items-center">
              <img src="/logolight.png" alt="Logo" style="height: 40px" />
            </router-link>

            <p class="mt-2">
              Chuỗi homestay tình yêu lớn nhất Đà Nẵng với hơn 7 cơ sở sẽ mang
              lại cho bạn những trải nghiệm tuyệt vời nhất.
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4 text-warning">Homestay nổi bật</h6>
            <p>
              <a href="#!" class="text-reset">Healing homestay</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Bơ Yang homestay</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Rosie homestay</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Tibi homestay</a>
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4 text-warning ">Useful links</h6>
            <p>
              <a
                href="#!"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                class="text-reset "
                >Điều Khoản</a
              >
            </p>
            <p>
              <a href="#!" class="text-reset">Dịch vụ</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Đặt phòng</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Trợ giúp</a>
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4 text-warning">Contact</h6>
            <p><i class="fas fa-home me-3"></i> 32 Đinh Thị Hòa, Đà Nẵng</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              homes@gmail.com
            </p>
            <p><i class="fas fa-phone me-3"></i> 123456789</p>
            <p><i class="fas fa-print me-3"></i> 123456789</p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->

    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05)">
      © 2025 Copyright:
      <a class="text-reset fw-bold" href="https://mdbootstrap.com/"
        >HomeS.com</a
      >
    </div>
    <!-- Copyright -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <DieuKhoan></DieuKhoan>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Footer -->
</template>
<script>
import DieuKhoan from "../../components/User/DieuKhoan.vue";
export default {
  components: {
    DieuKhoan,
  },
};
</script>
<style >
</style>