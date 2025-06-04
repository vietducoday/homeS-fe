<template>
  <div class="container py-4">
    <div class="row">
      <!-- Nội dung bài viết chính -->
      <div class="col-lg-8">
        <div v-if="baiViet">
          <h2 class="fw-bold mb-4">{{ baiViet.tieu_de }}</h2>
          <p><strong>Ngày đăng:</strong> {{ dinhDangNgay(baiViet.ngay_tao) }}</p>
          <hr>
          <div v-html="baiViet.noi_dung" class="noi-dung-chi-tiet"></div>
          <button class="btn btn-secondary mt-4" @click="$router.go(-1)">Quay lại</button>
        </div>
        <div v-else>
          <p>Đang tải bài viết...</p>
        </div>
      </div>

      <!-- Sidebar Bài viết mới và Bài viết nổi bật -->
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-header">
            <h6 class="fw-bold p-2">BÀI VIẾT MỚI</h6>
          </div>
          <div class="card-body">
            <div v-for="baiViet in danhSachBaiViet.filter(bv => bv.tinh_trang == 1).slice(0, 4)" 
                 :key="baiViet.id" 
                 class="d-flex mb-3" 
                 @click="xemChiTiet(baiViet.id)" 
                 style="cursor: pointer;">
              <img :src="baiViet.image" 
                   class="me-2" 
                   alt="Hình ảnh bài viết" 
                   style="width: 100px; height: 70px; object-fit: cover;">
              <small>{{ baiViet.tieu_de }}</small>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h6 class="fw-bold p-2">BÀI VIẾT NỔI BẬT</h6>
          </div>
          <div class="card-body">
            <div v-for="baiViet in baiVietNoiBat.filter(bv => bv.tinh_trang == 1)" 
                 :key="baiViet.id" 
                 class="d-flex mb-3" 
                 @click="xemChiTiet(baiViet.id)" 
                 style="cursor: pointer;">
              <img :src="baiViet.image" 
                   class="me-2" 
                   alt="Hình ảnh bài viết" 
                   style="width: 100px; height: 70px; object-fit: cover;">
              <small>{{ baiViet.tieu_de }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify';

export default {
  name: 'ChiTietBaiViet',
  props: ['id'],
  data() {
    return {
      baiViet: null,
      danhSachBaiViet: [],
      urlBackend: 'http://127.0.0.1:8000'
    };
  },
  computed: {
    baiVietNoiBat() {
      const shuffled = [...this.danhSachBaiViet].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  },
  methods: {
    async layChiTietBaiViet() {
      try {
        const response = await axios.get(`${this.urlBackend}/api/bai_viets/chi-tiet/${this.id}`);
        this.baiViet = response.data.du_lieu;
        this.baiViet.noi_dung = this.processHtmlContent(this.baiViet.noi_dung);
      } catch (error) {
        const thongBao = error.response?.data?.thong_bao || error.message || 'Lỗi không xác định';
        alert(`Không thể tải chi tiết bài viết: ${thongBao}`);
        console.error('Lỗi khi tải chi tiết bài viết:', error);
      }
    },
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
    processHtmlContent(html) {
      let cleanHtml = DOMPurify.sanitize(html);
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleanHtml, 'text/html');
      const elements = doc.querySelectorAll('*');
      elements.forEach((el) => {
        if (el.tagName !== 'IMG' && el.classList.contains('img-fluid')) {
          el.classList.remove('img-fluid');
        }
        if (el.tagName === 'IMG') {
          el.removeAttribute('style');
          el.removeAttribute('width');
          el.removeAttribute('height');
          el.classList.remove('img-fluid');
          el.classList.add('img-fluid');
          el.setAttribute('loading', 'lazy');
        }
      });
      return doc.body.innerHTML;
    },
    dinhDangNgay(ngay) {
      const d = new Date(ngay);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    },
    xemChiTiet(id) {
      this.$router.push({ name: 'ChiTietBaiViet', params: { id } });
    }
  },
  mounted() {
    this.layChiTietBaiViet();
    this.layDanhSachBaiViet();
    this.$nextTick(() => {
      const images = document.querySelectorAll('.noi-dung-chi-tiet img');
      images.forEach(img => {
        img.addEventListener('error', () => {
          img.src = 'https://via.placeholder.com/300';
          img.alt = 'Hình ảnh không tải được';
          img.classList.add('img-fluid');
        });
      });
    });
  }
};
</script>

<style scoped>
.noi-dung-chi-tiet {
  max-width: 100%;
}
.noi-dung-chi-tiet img {
  display: block;
}
.card {
  border: 1px solid #e0e0e0;
}
.card-header {
  background-color: #f8f9fa;
}
.card-body small {
  font-size: 0.9rem;
  line-height: 1.4;
}
.card-body img {
  border-radius: 4px;
}
@media (max-width: 991px) {
  .col-lg-4 {
    margin-top: 2rem;
  }
}
</style>