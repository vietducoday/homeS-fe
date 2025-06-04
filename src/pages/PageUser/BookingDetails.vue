<template>
  <div class="container">
    <Steps :currentStep="2" />
    <!-- Step hiện tại -->
    <div class="row mt-4">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <p class="card-title">Homestay</p>
            <h5 class="card-text">{{ bookingDetails.homestay }}</h5>
            <p class="card-text">{{ bookingDetails.diachi }}</p>
            <span class="badge bg-primary">
              {{ bookingDetails.danh_gia }}
              <i class="fa-solid fa-star text-warning"></i>
            </span>
            <span> -- {{ bookingDetails.reviewsCount }} lượt đánh giá</span>
            <hr />
            <!-- Hiển thị tiện ích -->
            <h6>Tiện ích</h6>
            <div
              v-html="bookingDetails.tien_ich"
              class="amenities-container"
            ></div>
          </div>
        </div>
        <div class="card sticky-top">
          <div class="card-body">
            <p>Tóm tắt giá</p>
            <div class="d-flex justify-content-between">
              <p class="fw-bold">Giá phòng</p>
              <p class="fw-bold">{{ formatPrice(totalPriceBeforeTax) }}đ</p>
            </div>
           
            <div
              class="p-3 mt-3 rounded d-flex justify-content-between align-items-center py-4"
              style="background: #062d62; color: aliceblue"
            >
              <p class="fs-5 fw-bold p-0 m-0">Tổng</p>
              <p class="fs-5 fw-bold p-0 m-0">{{ formatPrice(finalTotal) }}đ</p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center mt-2 ms-5"
            >
             
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Chi tiết đặt phòng</h5>
            <div class="row">
              <div class="col-6">
                <p class="fs-8 fw-bold p-0">Nhận phòng</p>
                <p class="fw-bold p-0 m-0" style="font-size: 1.2rem">
                  {{ bookingDetails.checkin }}
                </p>
                <p>từ 14:00</p>
              </div>
              <div class="col-6">
                <p class="fs-8 fw-bold p-0">Trả phòng</p>
                <p class="fw-bold p-0 m-0" style="font-size: 1.2rem">
                  {{ bookingDetails.checkout }}
                </p>
                <p>lúc 12:00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <div>
                      <p class="fs-8 fw-bold p-0">Bạn đã chọn</p>
                      <p class="fw-bold p-0 m-0" style="font-size: 1.2rem">
                        {{ selectedRooms.length }} phòng cho
                        {{ totalGuests }} người
                      </p>
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                  style=""
                >
                  <div class="accordion-body">
                    <div v-for="(room, index) in selectedRooms" :key="index">
                      {{ room.quantity }} x {{ room.ten_phong }} - Giá 1 ngày:
                      {{ formatPrice(room.pricePerDay) }}đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Gộp phần xác nhận thông tin khách hàng vào đây -->
        <div class="card mt-4">
          <div class="card-header">
            <h5>Thông tin khách hàng</h5>
          </div>
          <div class="card-body">
            <!-- Thông báo trạng thái đăng nhập -->
            <div v-if="!userStore.isLoggedIn" class="alert alert-warning">
              Vui lòng <router-link to="/login">đăng nhập</router-link> hoặc
              <router-link to="/register">đăng ký</router-link> để tiếp tục.
            </div>
            <div v-else class="alert alert-success">
              Đã đăng nhập với tài khoản: {{ userStore.getCustomer.email }}
            </div>

            <!-- Form thông tin khách hàng -->
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="fullName" class="form-label">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="fullName"
                  v-model="form.fullName"
                  :disabled="!userStore.isLoggedIn"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  :disabled="!userStore.isLoggedIn"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  v-model="form.phone"
                  :disabled="!userStore.isLoggedIn"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="ghiChu" class="form-label">Ghi chú</label>
                <textarea
                  class="form-control"
                  id="ghiChu"
                  v-model="form.ghi_chu"
                  rows="3"
                  :disabled="!userStore.isLoggedIn"
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="!userStore.isLoggedIn"
              >
                Thanh toán để hoàn tất
              </button>
            </form>
          </div>
        </div>
        <!-- Danh sách phòng -->
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Vui lòng thanh toán để hoàn tất đặt phòng
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="stopCountdown"
          ></button>
        </div>
        <div class="modal-body">
          <img
            style="width: 100%"
            v-bind:src="
              'https://img.vietqr.io/image/mbbank-110409012024-compact2.jpg?accountName=TranVietDuc&amount=' +
              finalTotal +
              '&addInfo=' +
              booking_id
            "
          />
          <div class="text-danger mt-2">
            Lưu ý: Vui lòng thanh toán trong vòng <strong>{{ formatCountdown }}</strong>.
            Nếu không thanh toán, đơn đặt phòng sẽ tự động bị hủy.
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="stopCountdown"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="checkTT"
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from "../../components/User/Step.vue";
import axios from "axios";
import { useBookingStore } from "../../stores/booking";
import { useUserStore } from "../../stores/usesStore";
import  customerRequest  from "../../core/customerRequest";
import api from '../../services/api';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ positions: "bottom-right", duration: 3000 });

export default {
  components: {
    Steps,
  },
  setup() {
    const bookingStore = useBookingStore();
    const userStore = useUserStore();
    return { bookingStore, userStore };
  },
  data() {
    return {
      interval: null,
      countdown: 300, // 5 phút = 300 giây
      selectedRooms: [],
      bookingDetails: {
        homestay: "",
        diachi: "",
        danh_gia: 0,
        checkin: "",
        checkout: "",
        reviewsCount: 0,
        tien_ich: "",
      },
      totalPriceBeforeTax: 0,
      tax: 0,
      finalTotal: 0,
      totalGuests: 0,
      numberOfDays: 0,
      form: {
        fullName: "",
        email: "",
        phone: "",
        ghi_chu: "",
      },
      booking_id: null,
    };
  },
  beforeDestroy() {
    this.stopCountdown();
  },
  mounted() {
    this.loadBookingData();
    this.userStore.initializeAuth();
    this.fillCustomerInfo();
    
    // Lắng nghe sự kiện khi modal mở
    const modalElement = document.getElementById('staticBackdrop');
    modalElement.addEventListener('shown.bs.modal', this.startCountdown);
  },
  computed: {
    formatCountdown() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
  methods: {
    loadBookingData() {
      this.selectedRooms = this.bookingStore.selectedRooms;
      this.totalGuests = this.bookingStore.totalGuests;
      this.bookingDetails.checkin = this.bookingStore.checkIn;
      this.bookingDetails.checkout = this.bookingStore.checkOut;

      // Gọi fetchHomestayDetails và calculatePricing sau khi load dữ liệu
      this.fetchHomestayDetails();
      this.calculatePricing();
    },
    async fetchHomestayDetails() {
      const homestayId = this.bookingStore.homestayId;
      if (!homestayId) {
        console.error("Không tìm thấy homestayId trong bookingStore");
        toaster.error('Không tìm thấy thông tin homestay.');
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/homestays/${homestayId}`,
          {
            params: {
              check_in: this.bookingStore.checkIn || "",
              check_out: this.bookingStore.checkOut || "",
              suc_chua: this.totalGuests || 0,
            },
          }
        );
        const homestayData = response.data;
        this.bookingDetails = {
          homestay: homestayData.ten_homestay || "",
          diachi: homestayData.dia_chi || "",
          danh_gia: homestayData.average_rating || 0,
          checkin: this.bookingStore.checkIn || "",
          checkout: this.bookingStore.checkOut || "",
          reviewsCount: homestayData.reviews?.length || 0,
          tien_ich: homestayData.tien_ich || "<ul></ul>",
        };
      } catch (error) {
        console.error("Lỗi khi lấy thông tin homestay:", error);
        toaster.error('Không thể tải thông tin homestay.');
      }
    },
    async calculatePricing() {
      if (this.bookingStore.checkIn=='' || this.bookingStore.checkOut=='') {
        console.error("Không có phòng nào được chọn.");
        toaster.error('Vui lòng chọn ít nhất một phòng.');
        this.$router.push("/search");
        return;
      }
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/calculate-price",
          {
            rooms: this.selectedRooms.map((room) => ({
              roomId: room.roomId,
              quantity: room.quantity,
            })),
            checkIn: this.bookingStore.checkIn,
            checkOut: this.bookingStore.checkOut,
          }
        );

        const priceData = response.data;
        this.totalPriceBeforeTax = priceData.totalPriceBeforeTax;
        
        this.finalTotal = priceData.finalPrice;
        this.numberOfDays = priceData.numberOfDays;

        this.selectedRooms = this.selectedRooms.map((room) => {
          const roomDetail = priceData.roomDetails.find(
            (r) => r.roomId === room.roomId
          );
          return {
            ...room,
            pricePerDay: roomDetail ? roomDetail.pricePerDay : room.gia,
          };
        });
      } catch (error) {
        console.error("Lỗi khi tính giá:", error);
        toaster.error('Lỗi khi tính giá phòng.');
        
      }
    },
    fillCustomerInfo() {
      if (this.userStore.isLoggedIn && this.userStore.getCustomer) {
        const customer = this.userStore.getCustomer;
        this.form.fullName = customer.ho_ten || "";
        this.form.email = customer.email || "";
        this.form.phone = customer.so_dien_thoai || "";
      }
    },
    submitForm() {
  if (!this.userStore.isLoggedIn) {
    toaster.error("Vui lòng đăng nhập để đặt phòng.");
    this.$router.push("/login");
    return;
  }

  customerRequest
    .post("bookings", {
      id_khach_hang: this.userStore.getCustomer.id,
      homestay_id: this.bookingStore.homestayId,
      ngay_dat: new Date().toISOString().split("T")[0],
      tong_tien: this.finalTotal,
      ghi_chu: this.form.ghi_chu,
      rooms: this.selectedRooms.map((room) => ({
        roomId: room.roomId,
        quantity: room.quantity,
        checkIn: room.checkIn,
        checkOut: room.checkOut,
        ghi_chu: this.form.ghi_chu,
      })),
    })
    .then((response) => {
      const data = response.data;

      if (data && data.booking_id) {
        this.booking_id = data.booking_id;
        toaster.success(response.data.message); 
        this.$router.push(`/thanh-toan/${data.booking_id}`);
      } else {
        toaster.error(response.data.message || "Đặt phòng thất bại.");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi đặt phòng:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Đặt phòng thất bại.";
    
    });
},


    
    startCountdown() {
      this.countdown = 300; // Reset về 5 phút
      this.stopCountdown(); // Dừng countdown trước đó nếu có
      this.interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.stopCountdown();
          const modalElement = document.getElementById('staticBackdrop');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.hide();
          }
          toaster.error('Hết thời gian thanh toán. Đơn đặt phòng đã bị hủy.');
          this.$router.push('/');
        }
      }, 1000);
    },
    stopCountdown() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.amenities-container span {
  font-size: 1rem;
  font-weight: 300;
  background: #062d62;
  color: #ffc107;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: inline-block;
}

.amenities-container span i {
  margin-right: 0.25rem;
}
</style>