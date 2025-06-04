<template>
  <div class="container py-4">
   

    <div class="row mt-5">
      <!-- Danh sách bài viết chính -->
      <div class="col-lg-8">
        <div v-for="(baiViet, index) in danhSachBaiViet.filter(bv => bv.tinh_trang == 1).slice(0, 5)" :key="baiViet.id" 
             class="d-flex mb-4 border-bottom pb-3" 
             @click="xemChiTiet(baiViet.id)" 
             style="cursor: pointer;">
          <img :src="baiViet.image" 
               class="me-3" alt="Hình ảnh bài viết" style="width: 170px; height: 120px; object-fit: cover;">
          <div>
            <h6 class="fw-bold">{{ baiViet.tieu_de }}</h6>
            <p class="mb-0 text-muted">{{ rutGonNoiDung(baiViet.noi_dung, 100) }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar Bài viết mới -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h6 class="fw-bold p-2">BÀI VIẾT MỚI</h6>
          </div>
          <div class="card-body">
            <div v-for="(baiViet, index) in danhSachBaiViet.filter(bv => bv.tinh_trang == 1).slice(0, 4)" :key="baiViet.id" 
                 class="d-flex mb-3" 
                 @click="xemChiTiet(baiViet.id)" 
                 style="cursor: pointer;">
              <img :src="baiViet.image" 
                   class="me-2" alt="Hình ảnh bài viết" style="width: 100px; height: 70px; object-fit: cover;">
              <small>{{ baiViet.tieu_de }}</small>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div class="card">
            <div class="card-header">
              <h6 class="fw-bold p-2">BÀI VIẾT NỔI BẬT</h6>
            </div>
            <div class="card-body">
              <div v-for="(baiViet, index) in baiVietNoiBat.filter(bv => bv.tinh_trang == 1)" :key="baiViet.id" 
                   class="d-flex mb-3" 
                   @click="xemChiTiet(baiViet.id)" 
                   style="cursor: pointer;">
                <img :src="baiViet.image" 
                     class="me-3" alt="Hình ảnh bài viết" style="width: 90px; height: 60px; object-fit: cover;">
                <small>{{ baiViet.tieu_de }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      danhSachBaiViet: [],
      urlBackend: 'http://127.0.0.1:8000',
     
    };
  },
  computed: {
    baiVietNoiBat() {
      // Lấy 3 bài viết ngẫu nhiên từ danhSachBaiViet
      const shuffled = [...this.danhSachBaiViet].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  },
  methods: {
    async layDanhSachBaiViet() {
      try {
        const response = await axios.get(`${this.urlBackend}/api/bai_viets/lay-danh-sach`);
        this.danhSachBaiViet = response.data;
      } catch (error) {
        const thongBao = error.response?.data?.thong_bao || error.message || 'Lỗi không xác định';
        alert(`Không thể tải danh sách bài viết: ${thongBao}`);
        console.error('Lỗi khi tải danh sách bài viết:', error);
      }
    },
    rutGonNoiDung(noiDung, doDaiToiDa) {
      const vanBan = this.loaiBoHtml(noiDung);
      if (vanBan.length <= doDaiToiDa) return vanBan;
      return vanBan.substring(0, doDaiToiDa) + '...';
    },
    loaiBoHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },
    xemChiTiet(id) {
      this.$router.push({ name: 'ChiTietBaiViet', params: { id } });
    }
  },
  mounted() {
    // Khởi tạo carousel
    const carouselElement = document.getElementById('carouselExampleFade');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 4000,
        ride: 'carousel',
        pause: false
      });
    }
    // Lấy dữ liệu từ API
    this.layDanhSachBaiViet();
  }
};
</script>

<style>
.carousel-item img {
  width: 100%;
  height: 650px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .carousel-item img {
    height: 400px;
  }
}

@media (max-width: 576px) {
  .carousel-item img {
    height: 300px;
  }
}
</style>
