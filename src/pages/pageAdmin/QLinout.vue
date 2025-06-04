<template>
  <div class="container py-4">
    <div class="card card border-primary border-top border-3 border-0">
      <div class="card-body">
        <h2 class="mb-4">Quản lý Check-in/Check-out</h2>

        <!-- Dropdown chọn homestay -->
        <div class="mb-4">
          <select
            v-model="selectedHomestay"
            id="homestay"
            class="form-select w-50"
            @change="fetchPhongs"
            :disabled="isLoading"
          >
            <option value="" disabled>Chọn homestay</option>
            <option
              v-for="homestay in homestays"
              :key="homestay.id"
              :value="homestay.id"
            >
              {{ homestay.ten_homestay || "Homestay " + homestay.id }}
            </option>
          </select>
        </div>

        <!-- Loading spinner -->
        <div v-if="isLoading" class="text-center my-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </div>

        <!-- Danh sách phòng dưới dạng card -->
        <div v-else-if="phongs.length" class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="phong in phongs" :key="phong.id" class="col">
            <div
              class="card h-100 shadow border-start border-5"
              :class="getCardBorderClass(phong.trang_thai_o)"
            >
              <div class="card-body">
                <h5 class="card-title fw-bold text-primary">
                  {{ phong.ten_phong }}
                </h5>

                <ul class="list-unstyled mb-3">
                  <li>
                    <strong>Hoạt động:</strong>
                    <span
                      :class="
                        getTrangThaiHoatDongClass(phong.trang_thai_hoat_dong)
                      "
                    >
                      {{ formatTrangThaiHoatDong(phong.trang_thai_hoat_dong) }}
                    </span>
                  </li>
                  <li>
                    <strong>Trạng thái ở:</strong>
                    <span :class="getTrangThaiOClass(phong.trang_thai_o)">
                      {{ formatTrangThaiO(phong.trang_thai_o) }}
                    </span>
                  </li>
                  <!-- Hiển thị từng booking -->
                  <li
                    v-for="(
                      booking, index
                    ) in phong.danh_sach_booking_trong_ngay"
                    :key="booking.id_chi_tiet"
                    class="mt-2 border-top pt-2"
                  >
                    <!-- Debugging log -->
                    {{ console.log("Booking:", booking, "CanCheckIn:", canCheckIn(phong, index), "IsCheckInValid:", isCheckInValid(booking.ngay_nhan_phong)) }}
                    <strong>Booking {{ index + 1 }}:</strong>
                    <ul class="list-unstyled">
                      <li><strong>Khách:</strong> {{ booking.ten_khach }}</li>
                      <li>
                        <strong>Check-in:</strong>
                        {{ formatDateTime(booking.ngay_nhan_phong) }}
                      </li>
                      <li>
                        <strong>Check-out:</strong>
                        {{ formatDateTime(booking.ngay_tra_phong) }}
                      </li>
                      <li>
                        <strong>Trạng thái:</strong>
                        {{ booking.ten_trang_thai }}
                      </li>
                    </ul>
                    <!-- Nút chức năng cho từng booking -->
                    <div class="d-grid gap-2 mt-2">
                      <button
                        v-if="
                          booking.trang_thai == 1 &&
                          isCheckInValid(booking.ngay_nhan_phong) &&
                          canCheckIn(phong, index)
                        "
                        class="btn btn-success btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        @click="setCapNhatPhong(phong, booking)"
                        :disabled="isUpdating"
                      >
                        Check-in
                      </button>
                      <button
                        v-if="booking.trang_thai == 2"
                        class="btn btn-warning btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        @click="setCapNhatPhong(phong, booking)"
                        :disabled="isUpdating"
                      >
                        Check-out
                      </button>
                      <button
                        v-if="booking.trang_thai == 3"
                        class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        @click="setCapNhatPhong(phong, booking)"
                        :disabled="isUpdating"
                      >
                        Đã dọn dẹp
                      </button>
                    </div>
                  </li>
                </ul>

                <!-- Ghi chú chung -->
                <div>
                  <strong>Ghi chú:</strong>
                  <span class="badge" :class="getBadgeClass(phong)">
                    {{ getBadgeText(phong) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thông báo khi không có dữ liệu -->
        <div v-else class="alert alert-info" role="alert">
          Không có phòng nào hoặc chưa chọn homestay.
        </div>

        <!-- Thông báo lỗi -->
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <!-- Modal xác nhận cập nhật trạng thái -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white"><b>Cập nhật trạng thái</b></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert">
              <p>
                Bạn có chắc chắn muốn cập nhật trạng thái cho phòng
                <strong>{{ capNhatPhong.ten_phong }}</strong> (Booking ID:
                {{ capNhatBooking?.id_booking }})?
              </p>
              <p><strong>Khách:</strong> {{ capNhatBooking?.ten_khach }}</p>
              <p>
                <strong>Check-in:</strong>
                {{ formatDateTime(capNhatBooking?.ngay_nhan_phong) }}
              </p>
              <p>
                <strong>Check-out:</strong>
                {{ formatDateTime(capNhatBooking?.ngay_tra_phong) }}
              </p>
              <p>
                <strong>Trạng thái hiện tại:</strong>
                {{ capNhatBooking?.ten_trang_thai || "Không xác định" }}
              </p>
              <p>
                <strong>Trạng thái mới:</strong>
                {{ getNextTrangThai(capNhatBooking?.trang_thai) }}
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="capnhat()"
              data-bs-dismiss="modal"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { parse, format, isValid } from "date-fns";
import baseRequest from "../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  position: "bottom-right",
  duration: 3000,
});

export default {
  name: "QuanLyCheckInOut",
  data() {
    return {
      capNhatPhong: {},
      capNhatBooking: null,
      homestays: [],
      selectedHomestay: "",
      phongs: [],
      isLoading: false,
      isUpdating: false,
      errorMessage: "",
      currentDate: new Date().toISOString().split("T")[0], // e.g., 2025-05-27
      tomorrow: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0], // e.g., 2025-05-28
    };
  },
  mounted() {
    this.fetchHomestays();
  },
  methods: {
    capnhat() {
      this.isUpdating = true;
      baseRequest
        .post("/tinhtrangphong/capnhat", this.capNhatBooking)
        .then((response) => {
          if (response.data.status) {
            toaster.success("Cập nhật trạng thái thành công!");
            this.fetchPhongs(); // Refresh room list
          } else {
            toaster.error(
              response.data.message || "Cập nhật trạng thái thất bại!"
            );
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            toaster.error(error.response.data.error);
          } else {
            toaster.error("Lỗi khi cập nhật trạng thái: " + error.message);
          }
        })
        .finally(() => {
          this.isUpdating = false;
        });
    },
    setCapNhatPhong(phong, booking) {
      this.capNhatPhong = { ...phong };
      this.capNhatBooking = { ...booking };
    },
    getNextTrangThai(trangThai) {
      const statusMap = {
        1: "Đã check-in",
        2: "Cần dọn dẹp",
        3: "Hoàn thành",
      };
      return statusMap[trangThai] || "Không xác định";
    },
    canCheckIn(phong, bookingIndex) {
      if (bookingIndex === 0) return true;
      const previousBooking = phong.danh_sach_booking_trong_ngay[bookingIndex - 1];
      return previousBooking ? previousBooking.trang_thai == 4 : true;
    },
    getCardBorderClass(status) {
      return {
        "border-primary": status === "san_sang",
        "border-warning": status === "da_dat",
        "border-info": status === "da_checkin",
        "border-secondary": status === "can_don_dep",
      };
    },
    getBadgeClass(phong) {
      if (phong.is_sap_checkout) return "bg-danger text-white";
      if (phong.trang_thai_o === "da_dat") return "bg-warning text-dark";
      if (phong.trang_thai_o === "can_don_dep")
        return "bg-secondary text-white";
      return "bg-light text-dark";
    },
    getBadgeText(phong) {
      if (phong.is_sap_checkout) return "Sắp check-out trước 12:00";
      if (phong.trang_thai_o === "da_dat") return "Sắp check-in sau 14:00";
      if (phong.trang_thai_o === "can_don_dep") return "Cần dọn dẹp";
      return "Không có ghi chú";
    },
    async fetchHomestays() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const response = await baseRequest.get("/admin/homestay/data");
        console.log("Homestays Response:", response.data);
        this.homestays = response.data;
        if (this.homestays.length > 0) {
          this.selectedHomestay = this.homestays[0].id;
          this.fetchPhongs();
        } else {
          this.errorMessage = "Không có homestay nào được tìm thấy.";
        }
      } catch (error) {
        this.errorMessage = "Lỗi khi lấy danh sách homestay: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPhongs() {
      if (!this.selectedHomestay) {
        this.phongs = [];
        return;
      }
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const response = await baseRequest.get(
          `/tinhtrangphong/data?homestay_id=${this.selectedHomestay}`
        );
        console.log("Phongs Response:", response.data);
        if (response.data.status === false) {
          toaster.error(response.data.message);
          return;
        }
        this.phongs = response.data.map((phong) => {
          const sortedBookings = [...phong.danh_sach_booking_trong_ngay]
            .map((booking) => ({
              ...booking,
              trang_thai: Number(booking.trang_thai), // Ensure trang_thai is a number
            }))
            .sort((a, b) => {
              const dateA = new Date(a.ngay_nhan_phong);
              const dateB = new Date(b.ngay_nhan_phong);
              console.log("Sorting:", a.ngay_nhan_phong, b.ngay_nhan_phong);
              return dateA - dateB;
            });
          return {
            ...phong,
            danh_sach_booking_trong_ngay: sortedBookings,
            trang_thai_o: this.mapTrangThaiO(
              sortedBookings[sortedBookings.length - 1]?.trang_thai
            ),
          };
        });
      } catch (error) {
        this.errorMessage = "Lỗi khi lấy danh sách phòng: " + error.message;
        this.phongs = [];
      } finally {
        this.isLoading = false;
      }
    },
    mapTrangThaiO(trangThai) {
      const statusMap = {
        1: "da_dat",
        2: "da_checkin",
        3: "can_don_dep",
        4: "completed",
        5: "cleaned",
      };
      return statusMap[trangThai] || "san_sang";
    },
    isCheckInValid(ngayNhanPhong) {
      if (!ngayNhanPhong) {
        console.log("Invalid ngayNhanPhong:", ngayNhanPhong);
        return false;
      }
      const parsedDate = parse(ngayNhanPhong, "yyyy-MM-dd HH:mm", new Date());
      if (!isValid(parsedDate)) {
        console.log("Invalid date format:", ngayNhanPhong);
        return false;
      }
      const checkInDate = format(parsedDate, "yyyy-MM-dd");
      console.log("checkInDate:", checkInDate, "currentDate:", this.currentDate);
      return checkInDate >= this.currentDate;
    },
    formatTrangThaiHoatDong(status) {
      return status === "hoat_dong" ? "Hoạt động" : "Bảo trì";
    },
    formatTrangThaiO(status) {
      const map = {
        san_sang: "Sẵn sàng",
        da_dat: "Đã đặt",
        da_checkin: "Đã có người ở",
        can_don_dep: "Cần dọn dẹp",
      };
      return map[status] || status;
    },
    getTrangThaiHoatDongClass(status) {
      return {
        "text-success": status === "hoat_dong",
        "text-danger": status === "bao_tri",
      };
    },
    getTrangThaiOClass(status) {
      return {
        "text-primary": status === "san_sang",
        "text-warning": status === "da_dat",
        "text-info": status === "da_checkin",
        "text-secondary": status === "can_don_dep",
      };
    },
    formatDateTime(dateTime) {
      if (!dateTime) return "N/A";
      const parsedDate = parse(dateTime, "yyyy-MM-dd HH:mm", new Date());
      return isValid(parsedDate)
        ? format(parsedDate, "dd/MM/yyyy HH:mm")
        : "Invalid Date";
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.card-body {
  padding: 1rem;
}
.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.card-text {
  font-size: 0.9rem;
}
.btn-sm {
  font-size: 0.85rem;
}
</style>