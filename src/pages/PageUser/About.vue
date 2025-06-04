<template>
  <!-- Hero Banner -->
  <div class="position-relative"
      style="background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/2162442/pexels-photo-2162442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); background-size: cover; background-position: center; height: 500px;">
      <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div class="container">
              <div class="row">
                  <div class="col-md-8 text-white">
                      <h2 class="display-4 fw-bold text-light">Chào mừng đến với <span style="color: #062d62">Home</span
                        ><span style="color: #f2961f">S</span></h2>
                      <p class="lead">Chuỗi homestay lớn nhất Đà Nẵng</p>
                      <button href="#xemngay" class="btn btn-danger btn-lg">Khám phá ngay</button>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- About Section -->
  <div id="about" class="py-5">
      <div class="container">
          <div class="row mb-4">
              <div class="col-12 text-center">
                  <h2 id="xemngay" class="fw-bold">Về HomeS</h2>
                  <div class="d-inline-block bg-danger" style="width: 60px; height: 3px; margin-bottom: 30px;"></div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                  <p><span style="color: #062d62">Home</span
                    ><span style="color: #f2961f">S</span> là chuỗi homestay cao cấp được thành lập vào năm 2023, 
                  mang đến trải nghiệm cực kỳ thú vị với dịch vụ cực tốt</p>
                  <p>Với sứ mệnh "Nâng tầm trải nghiệm du lịch Đà Nẵng", chúng tôi không ngừng đầu tư vào cơ sở vật
                      chất, dịch vụ khách hàng và công nghệ để mang đến những giây phút nghỉ dưỡng tuyệt vời nhất cho
                      khách hàng.</p>
                  <p>Hệ thống <span style="color: #062d62">Home</span
                    ><span style="color: #f2961f">S</span> hiện có 7 homestay và hơn 50 phòng đảm bảo phục vụ trên 1.000.000 lượt khách trên năm.</p>
              </div>
              <div class="col-md-6">
                  <div class="rounded overflow-hidden">
                      <img src="https://i.pinimg.com/736x/f1/93/61/f1936169318f8cc748ca2855b5b0933c.jpg"
                          alt="Hình ảnh HomeS" class="img-fluid w-100">
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Features Section -->
  <div id="features" class="bg-light py-5">
      <div class="container">
          <div class="row mb-4">
              <div class="col-12 text-center">
                  <h2 class="fw-bold">Tiện ích độc đáo</h2>
                  <div class="d-inline-block bg-danger" style="width: 60px; height: 3px; margin-bottom: 30px;"></div>
              </div>
          </div>
          <div class="row g-4">
              <div class="col-md-4">
                  <div class="text-center p-4 bg-white rounded shadow-sm h-100" style="transition: all 0.3s ease;"
                      onmouseover="this.style.transform='translateY(-5px)'; this.classList.add('shadow');"
                      onmouseout="this.style.transform='translateY(0)'; this.classList.remove('shadow');">
                      <div class="mb-3">
                          <i class="bi bi-display text-danger fs-1"></i>
                      </div>
                      <h4>Netflix</h4>
                      <p class="mb-0">Tất cả homestay thuộc <span style="color: #062d62">Home</span
                        ><span style="color: #f2961f">S</span> đều được trang bị tài khoản Netflix free</p>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="text-center p-4 bg-white rounded shadow-sm h-100" style="transition: all 0.3s ease;"
                      onmouseover="this.style.transform='translateY(-5px)'; this.classList.add('shadow');"
                      onmouseout="this.style.transform='translateY(0)'; this.classList.remove('shadow');">
                      <div class="mb-3">
                          <i class="bi bi-speaker text-danger fs-1"></i>
                      </div>
                      <h4>Đầy đủ nội thất</h4>
                      <p class="mb-0">Mỗi phòng đều được trang bị nội thất đầy đủ như bếp, tủ lạnh, máy chiếu, điều hòa,...</p>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="text-center p-4 bg-white rounded shadow-sm h-100" style="transition: all 0.3s ease;"
                      onmouseover="this.style.transform='translateY(-5px)'; this.classList.add('shadow');"
                      onmouseout="this.style.transform='translateY(0)'; this.classList.remove('shadow');">
                      <div class="mb-3">
                          <i class="bi bi-cup-straw text-danger fs-1"></i>
                      </div>
                      <h4>CSKH 24/24</h4>
                      <p class="mb-0">Luôn luôn trong trạng thái sẵn sàng hỗ trợ khách hàng 24/24.</p>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Technology Section -->
 

  <!-- Location Section -->
  <div id="locations" class="bg-light py-5">
      <div class="container">
          <div class="row mb-4">
              <div class="col-12 text-center">
                  <h2 class="fw-bold">Hệ thống Homestay</h2>
                  <div class="d-inline-block bg-danger" style="width: 60px; height: 3px; margin-bottom: 30px;"></div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-3 mb-4">
                  <div class="card h-100 shadow-sm">
                      <div class="card-body">
                          <h5 class="card-title">Bơ Yang Homestay</h5>
                          <p class="card-text">Tầng 5, TTTM Vincom Bà Triệu, Hai Bà Trưng, Hà Nội</p>
                          <p class="mb-0"><i class="bi bi-telephone me-2"></i> 024.3974.8888</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 mb-4">
                  <div class="card h-100 shadow-sm">
                      <div class="card-body">
                          <h5 class="card-title">Healing Homestay</h5>
                          <p class="card-text">Tầng 4, Vincom Plaza Ngô Quyền, Sơn Trà, Đà Nẵng</p>
                          <p class="mb-0"><i class="bi bi-telephone me-2"></i> 0236.3754.9999</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 mb-4">
                  <div class="card h-100 shadow-sm">
                      <div class="card-body">
                          <h5 class="card-title">Rosie Homestay</h5>
                          <p class="card-text">Tầng 5, Saigon Centre, 65 Lê Lợi, Quận 1, TP.HCM</p>
                          <p class="mb-0"><i class="bi bi-telephone me-2"></i> 028.3821.7777</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 mb-4">
                  <div class="card h-100 shadow-sm">
                      <div class="card-body">
                          <h5 class="card-title">Tibi Homestay</h5>
                          <p class="card-text">Tầng 3, SC VivoCity, 1058 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                          <p class="mb-0"><i class="bi bi-telephone me-2"></i> 028.3622.5555</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

</template>

<script>
export default {


}
</script>

<style></style>