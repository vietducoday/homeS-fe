<template>
  <div class="container-fluid">
    <!-- Tiêu đề Dashboard -->
    <h3 class="mb-4 text-primary fw-bold">Dashboard Quản Lý Homestay</h3>

    <!-- Thống kê tổng quan -->
    <div class="row mb-4">
      <div class="col-md-3 col-sm-6 mb-3">
        <div
          class="card shadow-sm border-0 text-white hover-effect"
          style="background-color: #132e63"
        >
          <div class="card-body d-flex align-items-center">
            <i class="bx bx-home-alt fs-2 me-3"></i>
            <div>
              <h5 class="card-title mb-1 text-white">Tổng số homestay</h5>
              <p class="card-text display-6 mb-0">
                {{ stats.homestays.soluong }}
              </p>
              <small
                >Hoạt động: {{ stats.homestays.hd }} | Ngừng:
                {{ stats.homestays.nhd }}</small
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 mb-3">
        <div
          class="card shadow-sm border-0 text-white hover-effect"
          style="background-color: #132e63"
        >
          <div class="card-body d-flex align-items-center">
            <i class="bx bx-user fs-2 me-3"></i>
            <div>
              <h5 class="card-title mb-1 text-white">Tổng khách hàng</h5>
              <p class="card-text display-6 mb-0">
                {{ stats.khach_hangs.soluong }}
              </p>
              <small>Khách mới tháng này: {{ stats.khach_hangs.new }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 mb-3">
        <div
          class="card shadow-sm border-0 text-white hover-effect"
          style="background-color: #132e63"
        >
          <div class="card-body d-flex align-items-center">
            <i class="fa-solid fa-circle-dollar-to-slot fs-2 me-3"></i>
            <div>
              <h5 class="card-title mb-1 text-white">Tổng doanh thu</h5>
              <p class="card-text display-6 mb-0">{{ stats.doanhthu.total }}</p>
              <small>Tổng doanh thu tất cả homestay</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 mb-3">
        <div
          class="card shadow-sm border-0 text-white hover-effect"
          style="background-color: #132e63"
        >
          <div class="card-body d-flex align-items-center">
            <i class="bx bx-calendar-check fs-2 me-3"></i>
            <div>
              <h5 class="card-title mb-1 text-white">Tổng số đặt phòng</h5>
              <p class="card-text display-6 mb-0">
                {{ stats.datphong.so_luong }}
              </p>
              <small
                >Xác nhận: {{ confirmedBookings }} | Chờ:
                {{ pendingBookings }} | Hủy: {{ cancelledBookings }}</small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <BarChart />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Danh Sách Đặt Phòng Hôm Nay</h5>
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Mã Đặt Phòng</th>
                    <th scope="col">Tên Khách Hàng</th>
                    <th scope="col">Homestay</th>
                    <th scope="col">Ngày Nhận Phòng</th>
                    <th scope="col">Ngày Trả Phòng</th>
                    <th scope="col">Tổng Tiền</th>
                    <th scope="col">Thanh Toán</th>
                    <th scope="col">Ghi Chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in datphonghomnay" :key="booking.id">
                    <td>{{ booking.id }}</td>
                    <td>{{ booking.ho_ten }}</td>
                    <td>{{ booking.ten_homestay }}</td>
                    <td>{{ formatDate(booking.ngay_nhan_phong) }}</td>
                    <td>{{ formatDate(booking.ngay_tra_phong) }}</td>
                    <td>{{ formatCurrency(booking.tong_tien) }}</td>
                    <td>
                      <span
                        :class="
                          booking.is_thanh_toan
                            ? 'badge text-bg-success'
                            : 'badge text-bg-warning'
                        "
                      >
                        {{
                          booking.is_thanh_toan
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"
                        }}
                      </span>
                    </td>
                    <td>{{ booking.ghi_chu || "Không có" }}</td>
                  </tr>
                  <tr v-if="datphonghomnay.length === 0">
                    <td colspan="8" class="text-center">
                      Không có đặt phòng hôm nay
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../../components/Admin/testChart.vue";
import baseRequest from "../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  position: "bottom-right",
  duration: 3000,
});

export default {
  name: "App",
  components: {
    BarChart,
  },
  data() {
    return {
      stats: {
        homestays: {
          soluong: 0,
          hd: 0,
          nhd: 0,
        },
        khach_hangs: {
          soluong: 0,
          new: 0,
        },
        datphong: {
          so_luong: null,
        },
        doanhthu: {
          total: null,
        },
      },
      datphonghomnay: [],
      confirmedBookings: 0,
      pendingBookings: 0,
      cancelledBookings: 0,
    };
  },
  methods: {
    getstats() {
      baseRequest
        .get("/admin/dashboard/stats")
        .then((response) => {
          if (response.data.status === false) {
            toaster.error(response.data.message);
          } else {
            this.stats = response.data;
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thống kê:", error);
          toaster.error("Không thể lấy dữ liệu thống kê");
        });
    },
    getDatPhongHomNay() {
      baseRequest
        .get("/admin/dashboard/data")
        .then((response) => {
          if (response.data.status === false) {
            toaster.error(response.data.message);
          } else {
            this.datphonghomnay = response.data.data;
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách đặt phòng hôm nay:", error);
          toaster.error("Không thể lấy danh sách đặt phòng hôm nay");
        });
    },
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    formatCurrency(amount) {
      if (!amount) return "0";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    },
  },
  mounted() {
    this.getstats();
    this.getDatPhongHomNay();
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 20px;
}

h3 {
  font-size: 1.75rem;
}

.card {
  border-radius: 10px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.1rem;
}

.card-text.display-6 {
  font-size: 2rem;
}

.bg-primary {
  background-color: #007bff !important;
}

.bg-success {
  background-color: #28a745 !important;
}

.bg-info {
  background-color: #17a2b8 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
}

.bg-light-success {
  background-color: #d4edda;
}

.text-success {
  color: #28a745;
}

.bg-light-danger {
  background-color: #f8d7da;
}

.text-danger {
  color: #dc3545;
}

.bg-light-warning {
  background-color: #fff3cd;
}

.text-warning {
  color: #ffc107;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.form-select,
.form-control {
  max-width: 200px;
}

.progress {
  height: 20px;
}

.progress-bar {
  line-height: 20px;
}

.hover-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

small {
  font-size: 0.85rem;
}

.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}

@media (max-width: 576px) {
  .form-select,
  .form-control {
    max-width: 100%;
  }

  .table-responsive {
    font-size: 0.9rem;
  }
}
</style>