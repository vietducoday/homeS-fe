<template>
  <div class="hero-banner text-white position-relative mb-3 overflow-hidden">
    <!-- Ảnh nền -->
    <img
      src="https://baodanang.vn/dataimages/202505/original/images1777456_AR_1.jpg"
      class="position-absolute top-0 start-0 w-100 h-100 object-cover"
      alt="Banner"
    />

    <!-- Lớp phủ màu gradient -->
    <div
      class="position-absolute top-0 start-0 w-100 h-100"
      style="background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2));"
    ></div>

    <!-- Nội dung -->
    <div
      class="position-relative h-100 d-flex flex-column justify-content-center px-3 px-md-5 py-5 z-2"
    >
      <h2 class="hero-title mb-2">Chuỗi homestay lớn nhất Đà Nẵng</h2>
      <h1 class="hero-brand">Home<span style="color: #fcb900;">S</span></h1>
      <p class="hero-subtext mb-4">
        Hãy để chúng tôi đồng hành cùng kỳ nghỉ của bạn
      </p>
      <router-link
        to="/search"
        class="btn btn-warning btn-lg fw-bold rounded-pill px-4 shadow"
        style="width: fit-content"
      >
        <i class="fa fa-calendar-check me-2"></i> Đặt ngay
      </router-link>
    </div>
  </div>
</template>


<style scoped>
.hero-banner {
  height: calc(100vw * (6 / 19));
  min-height: 320px;
  max-height: 700px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.hero-brand {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

.hero-subtext {
  font-size: 1.1rem;
  max-width: 500px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.5rem;
  }
  .hero-brand {
    font-size: 2.5rem;
  }
  .hero-subtext {
    font-size: 0.95rem;
  }
}
</style>
