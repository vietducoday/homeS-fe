<template>
  <div class="container min-vh-100 d-flex justify-content-center align-items-center">
    <div class="row w-100 justify-content-center">
      <div class="col-lg-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center">
            <h5 class="mb-0"><b>THANH TOÁN ĐỂ HOÀN TẤT ĐẶT PHÒNG</b></h5>
          </div>
          <div class="card-body text-center">
            <img
              class="img-fluid"
              :src="`https://img.vietqr.io/image/mbbank-110409012024-compact2.jpg?accountName=TranVietDuc&amount=${ChiTietDatPhong?.tong_tien}&addInfo=${ChiTietDatPhong?.id}`"
              alt="QR Code"
            />
          </div>
          <div class="card-footer">
            <p><b>Hướng dẫn thanh toán:</b></p>
            <ul>
              <li>Quét mã QR bằng ứng dụng ngân hàng của bạn.</li>
              <li>
                Thanh toán với đúng số tiền
                <b class="text-danger">{{ formatPrice(ChiTietDatPhong?.tong_tien) }} đ</b>
                và nội dung
                <b>{{ ChiTietDatPhong?.id || 'N/A' }}</b>
              </li>
              <li>Sau khi thanh toán, nhấn <b>Kiểm tra thanh toán</b> bên dưới.</li>
            </ul>
            <p v-if="ChiTietDatPhong?.ten_homestay">
              <b>Homestay:</b> {{ ChiTietDatPhong.ten_homestay }} ({{ ChiTietDatPhong.dia_chi || 'N/A' }})
            </p>
            <div class="text-center">
              <button class="btn btn-primary" :disabled="loading" @click="checkTT">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Kiểm tra thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customerRequest from "../../core/customerRequest";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });

export default {
  data() {
    return {
      ChiTietDatPhong: {},
      bookingId: null,
      loading: false,
    };
  },
  mounted() {
    this.bookingId = this.$route.params.id;
    if (this.bookingId) {
      this.thanhToan(this.bookingId);
    } else {
      toaster.error("Không tìm thấy ID đặt phòng!");
    }
  },
  methods: {
    thanhToan(bookingId) {
      customerRequest
        .get(`thanh-toan/${bookingId}`)
        .then((response) => {
          this.ChiTietDatPhong = response.data.data || {};
          this.bookingId = response.data.data?.id || bookingId;
        })
        .catch((error) => {
          const message = error.response?.data?.message || "Lỗi khi lấy thông tin thanh toán.";
          toaster.error(message);
        });
    },
    checkTT() {
      if (!this.bookingId) {
        toaster.error("Không tìm thấy ID đặt phòng!");
        return;
      }

      this.loading = true;
      customerRequest
        .get(`check-thanh-toan/${this.bookingId}`)
        .then((response) => {
          const data = response.data;
          if (data.status === true || data.status === "1") {
            toaster.success(data.message);
            setTimeout(() => {
              this.$router.push("/profile");
            }, 1000);
          } else {
            toaster.error(data.message);
          }
        })
        .catch((error) => {
          const message = error.response?.data?.message || "Lỗi khi kiểm tra thanh toán.";
          toaster.error(message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatPrice(price) {
      return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "0";
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
