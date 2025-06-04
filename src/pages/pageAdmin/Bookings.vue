<template>
  <div class="container mt-4">
    <h2>Quản lý đặt phòng</h2>

    <!-- Báo cáo cơ bản -->
    <div class="card mb-4">
      <div class="card-body">
        <h5>Thống kê</h5>
        <div class="d-flex justify-content-between">
          <p>
            <strong>Tổng doanh thu:</strong> {{ formatPrice(totalRevenue) }}đ
          </p>
          <p><strong>Số đặt phòng:</strong> {{ bookingStats.total }}</p>
          <p><strong>Đang chờ:</strong> {{ bookingStats.pending }}</p>
          <p><strong>Đã xác nhận:</strong> {{ bookingStats.confirmed }}</p>
          <p><strong>Đã hủy:</strong> {{ bookingStats.cancelled }}</p>
          <p><strong>Đã hoàn thành:</strong> {{ bookingStats.completed }}</p>
        </div>
      </div>
    </div>

    <!-- Nút thêm mới đặt phòng -->
    <div class="mb-3">
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        Tạo đặt phòng
      </button>
    </div>

    <!-- Bộ lọc và tìm kiếm -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="search">Tìm kiếm</label>
            <input
              type="text"
              id="search"
              class="form-control"
              v-model="filters.search"
              placeholder="Mã đặt phòng hoặc tên khách hàng"
              @input="fetchBookings"
            />
          </div>
          <div class="col-md-2">
            <label for="is_thanh_toan">Trạng thái thanh toán</label>
            <select
              id="is_thanh_toan"
              class="form-select"
              v-model="filters.is_thanh_toan"
              @change="fetchBookings"
            >
              <option value="">Tất cả</option>
              <option value="true">Đã thanh toán</option>
              <option value="false">Chưa thanh toán</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="tinh_trang">Trạng thái đặt phòng</label>
            <select
              id="tinh_trang"
              class="form-select"
              v-model="filters.tinh_trang"
              @change="fetchBookings"
            >
              <option value="">Tất cả</option>
              <option value="pending">Đang chờ</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="cancelled">Đã hủy</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="start_date">Từ ngày</label>
            <input
              type="date"
              id="start_date"
              class="form-control"
              v-model="filters.start_date"
              @change="fetchBookings"
            />
          </div>
          <div class="col-md-2">
            <label for="end_date">Đến ngày</label>
            <input
              type="date"
              id="end_date"
              class="form-control"
              v-model="filters.end_date"
              @change="fetchBookings"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bảng danh sách đặt phòng -->
    <div class="card border-primary border-top border-3 border-0">
      <div class="card-body">
       <div class="table-responsive">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </div>
        <table class="table table-bordered table-hover" v-else>
          <thead>
            <tr>
              <th>Mã đặt phòng</th>
              <th>Tên khách hàng</th>
              <th>Email</th>
              <th>Homestay</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Ghi chú</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.id }}</td>
              <td>{{ booking.ten_khach_hang }}</td>
              <td>{{ booking.email_khach_hang }}</td>
              <td>{{ booking.ten_homestay }}</td>
              <td>{{ formatDate(booking.ngay_dat) }}</td>
              <td>{{ formatPrice(booking.tong_tien) }}đ</td>
              <td>
                <span v-if="booking.is_thanh_toan == 0">
                  <button
                    class="btn btn-danger btn-sm"
                    @click="updatePaymentStatus(booking.id)"
                  >
                    Chưa thanh toán
                  </button>
                </span>
                <span v-else>
                  <button class="btn btn-success btn-sm">Đã thanh toán</button>
                </span>
              </td>
              <td>{{ booking.ghi_chu || "Không có" }}</td>
              <td>
                <button
                  class="btn btn-primary btn-sm me-1"
                  @click="openDetailModal(booking)"
                >
                  Xem chi tiết
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteBooking(booking.id)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       </div>
    </div>

    <!-- Modal hiển thị chi tiết đặt phòng -->
    <div
      class="modal fade"
      id="detailModal"
      tabindex="-1"
      aria-labelledby="detailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailModalLabel">
              Chi tiết đặt phòng #{{ selectedBooking?.id }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Thông tin khách hàng và ngày đặt -->
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <b>ID đặt phòng</b> {{ selectedBooking?.id }} <br>
                    <b>Khách hàng: </b>{{ selectedBooking?.ten_khach_hang }} <br>
                    <b>Email: </b>{{ selectedBooking?.email_khach_hang }} <br>
                    <b>Homestay: </b> {{ selectedBooking?.ten_homestay }} <br>
                    <b>Thanh toán: </b> 
                      <span v-if="selectedBooking?.is_thanh_toan == 0">
                        <span class="badge bg-danger">Chưa thanh toán</span>
                      </span>
                      <span v-else>
                        <span class="badge bg-success">Đã thanh toán</span>
                      </span>
                  </div>
                  <div class="col-md-6">
                    <div class="text-center">
                      <img src="/logodark.png" alt="" style="height: 3rem;">
                    </div>
                    <div class="text-end mt-2">
                      <b>Ngày đặt</b>
                      {{ formatDate(selectedBooking?.ngay_dat) }} <br>
                    </div>
                  </div>
                </div>

                <!-- Danh sách phòng đã chọn -->
                <h6>Phòng đã chọn</h6>
                <table class="table table-bordered">
                  <thead class="text-white" style="background-color: #132e63;">
                    <tr>
                      <th>Phòng</th>
                      <th>Ngày nhận</th>
                      <th>Ngày trả</th>
                      <th>Giá</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(room, index) in selectedBooking?.chi_tiet_dat_phongs"
                      :key="index"
                    >
                      <td>{{ room.ten_phong }}</td>
                      <td>{{ formatDate(room.ngay_nhan_phong) }}</td>
                      <td>{{ formatDate(room.ngay_tra_phong) }}</td>
                      <td>{{ room.gia }}</td>
                      <td>{{ room.ghi_chu || "Không có" }}</td>
                    </tr>
                  </tbody>
                </table>

                <!-- Ghi chú và tổng tiền -->
                <div class="row">
                  <div class="col-md-6">
                    <b for="ghi_chu">Yêu cầu đặc biệt </b>{{ selectedBooking?.ghi_chu || "Không có" }}
                  </div>
                  <div class="col-md-6">
                    <b>Tổng tiền: </b>
                    <b class="text-danger">{{ formatPrice(selectedBooking?.tong_tien) }}đ</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button type="button" class="btn btn-primary" @click="exportToPDF">
              Xuất PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal thêm đặt phòng -->
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Tạo đặt phòng</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Thông tin khách hàng và ngày đặt -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="customer">Khách hàng</label>
                <select
                  class="form-select"
                  v-model="addForm.id_khach_hang"
                  required
                >
                  <option value="">Chọn khách hàng</option>
                  <option
                    v-for="customer in customers"
                    :key="customer.id"
                    :value="customer.id"
                  >
                    {{ customer.ho_ten }} ({{ customer.email }})
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="ngay_dat">Ngày đặt</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="addForm.ngay_dat"
                  required
                />
              </div>
            </div>

            <!-- Tìm kiếm phòng trống -->
            <div class="row">
              <div class="col-lg-4">
                <label>Check-in</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="timphong.check_in"
                  :min="minCheckInDate"
                  @change="updateCheckOutMin"
                />
              </div>
              <div class="col-lg-4">
                <label>Check-out</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="timphong.check_out"
                  :min="minCheckOutDate"
                  @change="checkAvailability"
                />
              </div>
              <div class="col-lg-4">
                <label>Sức chứa</label>
                <div class="d-flex justify-content-between">
                  <input
                    class="form-control"
                    type="number"
                    v-model.number="timphong.suc_chua"
                    @change="checkAvailability"
                  />
                  <button
                    @click="checkAvailability"
                    class="btn btn-danger ms-2"
                  >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <h6>Kết quả tìm kiếm</h6>
            <div
              v-if="availableHomestays.length === 0 && !loading"
              class="text-center"
            >
              <p>Không tìm thấy phòng trống.</p>
            </div>
            <div class="accordion" id="accordionAdd" v-else>
              <div
                class="accordion-item"
                v-for="(homestay, index) in availableHomestays"
                :key="homestay.id"
              >
                <h2 class="accordion-header" :id="`heading-add-${homestay.id}`">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse-add-${homestay.id}`"
                    :aria-expanded="index === 0"
                    :aria-controls="`collapse-add-${homestay.id}`"
                  >
                    {{ homestay.ten_homestay }}
                  </button>
                </h2>
                <div
                  :id="`collapse-add-${homestay.id}`"
                  class="accordion-collapse collapse"
                  :class="{ show: index === 0 }"
                  :aria-labelledby="`heading-add-${homestay.id}`"
                  data-bs-parent="#accordionAdd"
                >
                  <div class="accordion-body">
                    <ul class="list-group">
                      <li
                        v-for="room in homestay.available_rooms"
                        :key="room.id"
                        class="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>Tên phòng:</strong> {{ room.ten_phong }}<br />
                          <strong>Sức chứa:</strong>
                          {{ room.suc_chua }} người<br />
                          <strong>Giá/ngày:</strong>
                          {{ formatPrice(room.gia) }} VNĐ
                        </div>
                        <button
                          class="btn btn-sm btn-primary"
                          @click="selectRoom(homestay, room)"
                        >
                          Chọn
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Danh sách phòng đã chọn -->
            <hr />
            <h6>Phòng đã chọn</h6>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Homestay</th>
                  <th>Phòng</th>
                  <th>Ngày nhận</th>
                  <th>Ngày trả</th>
                  <th>Số lượng</th>
                  <th>Ghi chú</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(room, index) in addForm.rooms" :key="index">
                  <td>{{ room.homestayName }}</td>
                  <td>{{ room.roomName }}</td>
                  <td>{{ formatDate(room.checkIn) }}</td>
                  <td>{{ formatDate(room.checkOut) }}</td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="room.quantity"
                      min="1"
                      @change="calculateTotalPrice"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="room.ghi_chu"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="removeRoom(index)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Ghi chú và tổng tiền -->
            <div class="row">
              <div class="col-md-6">
                <label for="ghi_chu">Ghi chú</label>
                <textarea
                  class="form-control"
                  v-model="addForm.ghi_chu"
                  rows="3"
                ></textarea>
              </div>
              <div class="col-md-6">
                <label>Tổng tiền</label>
                <input
                  class="form-control"
                  type="text"
                  :value="formatPrice(addForm.tong_tien) + 'đ'"
                  readonly
                />
              </div>
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
              data-bs-dismiss="modal"
              class="btn btn-primary"
              @click="saveBooking"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";
import baseRequest from "../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const toaster = createToaster({
  position: "bottom-right",
  duration: 3000,
});

export default {
  data() {
    const formatDateToString = (date) => {
      return date.toISOString().split("T")[0];
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const twoDaysAfter = new Date();
    twoDaysAfter.setDate(twoDaysAfter.getDate() + 2);

    return {
      timphong: {
        check_in: formatDateToString(tomorrow),
        check_out: formatDateToString(twoDaysAfter),
        suc_chua: 1,
      },
      bookings: [],
      selectedBooking: null,
      detailModal: null,
      addModal: null,
      filters: {
        search: "",
        is_thanh_toan: "",
        tinh_trang: "",
        start_date: "",
        end_date: "",
      },
      availableHomestays: [],
      addForm: {
        id_khach_hang: "",
        homestay_id: "",
        ngay_dat: "",
        tong_tien: 0,
        ghi_chu: "",
        rooms: [],
      },
      customers: [],
      loading: false,
      bookingStats: {
        total: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0,
        completed: 0,
      },
      totalRevenue: 0,
      minCheckInDate: formatDateToString(tomorrow),
      minCheckOutDate: formatDateToString(twoDaysAfter),
    };
  },
  mounted() {
    this.fetchBookings();
    this.fetchCustomers();
    this.detailModal = new Modal(document.getElementById("detailModal"));
    this.addModal = new Modal(document.getElementById("addModal"));
  },
  methods: {
    async exportToPDF() {
      const cardElement = document.querySelector("#detailModal .card");

      if (!cardElement) {
        toaster.error("Không tìm thấy nội dung card để xuất PDF.");
        return;
      }

      try {
        const canvas = await html2canvas(cardElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a5", // A5 size: 148mm x 210mm
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Scale the image to fit within A5 dimensions
        let height = imgHeight;
        let width = pdfWidth;
        if (imgHeight > pdfHeight) {
          height = pdfHeight;
          width = (imgProps.width * pdfHeight) / imgProps.height;
        }

        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`HoaDon_DatPhong_${this.selectedBooking?.id}.pdf`);

        toaster.success("Đã xuất hóa đơn PDF thành công!");
      } catch (err) {
        console.error("Lỗi khi xuất PDF:", err);
        toaster.error("Xuất PDF thất bại!");
      }
    },
    updateCheckOutMin() {
      if (this.timphong.check_in) {
        const checkInDate = new Date(this.timphong.check_in);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (checkInDate < tomorrow) {
          this.timphong.check_in = this.minCheckInDate;
          checkInDate.setTime(tomorrow.getTime());
        }

        const minCheckOut = new Date(checkInDate);
        minCheckOut.setDate(checkInDate.getDate() + 1);
        this.minCheckOutDate = this.formatDateToString(minCheckOut);

        if (
          this.timphong.check_out &&
          new Date(this.timphong.check_out) < minCheckOut
        ) {
          this.timphong.check_out = this.minCheckOutDate;
        }
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.minCheckOutDate = this.formatDateToString(tomorrow);
      }
      this.checkAvailability();
    },
    async fetchBookings() {
      this.loading = true;
      try {
        const response = await baseRequest.get("/admin/bookings", {
          params: this.filters,
        });
        this.bookings = response.data;
        this.calculateStats();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đặt phòng:", error);
        toaster.error("Đã có lỗi xảy ra khi lấy danh sách đặt phòng.");
      } finally {
        this.loading = false;
      }
    },
    async fetchCustomers() {
      this.loading = true;
      try {
        const response = await baseRequest.get("/admin/customers");
        this.customers = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
        toaster.error("Đã có lỗi xảy ra khi lấy danh sách khách hàng.");
      } finally {
        this.loading = false;
      }
    },
    async checkAvailability() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate());
      const checkInDate = new Date(this.timphong.check_in);
      if (checkInDate < tomorrow) {
        toaster.error("Ngày check-in phải từ ngày mai trở đi!");
        return;
      }

      if (this.timphong.check_in && this.timphong.check_out) {
        const checkOutDate = new Date(this.timphong.check_out);
        if (checkOutDate <= checkInDate) {
          toaster.error("Ngày check-out phải sau ngày check-in!");
          return;
        }
      }

      this.loading = true;
      try {
        const response = await baseRequest.post(
          "http://127.0.0.1:8000/api/admin/check-available-rooms",
          {
            check_in: this.timphong.check_in,
            check_out: this.timphong.check_out,
            suc_chua: this.timphong.suc_chua,
          }
        );
        this.availableHomestays = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        if (this.availableHomestays.length === 0) {
          toaster.info("Không tìm thấy phòng trống.");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra phòng trống:", error);
        toaster.error(
          "Lỗi khi kiểm tra phòng trống: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        this.loading = false;
      }
    },
    updatePaymentStatus(bookingId) {
      baseRequest
        .post(`/admin/bookings/${bookingId}`)
        .then(() => {
          toaster.success("Cập nhật trạng thái thanh toán thành công!");
          this.fetchBookings();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
          toaster.error("Lỗi khi cập nhật trạng thái thanh toán.");
        });
    },
    deleteBooking(bookingId) {
      baseRequest
        .delete(`/admin/bookings/${bookingId}`)
        .then((response) => {
          if (response.data.status == false) {
            toaster.error(response.data.message || "Không thể xóa đặt phòng!");
            return;
          }
          toaster.success("Xóa đặt phòng thành công!");
          this.fetchBookings();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa đặt phòng:", error);
          toaster.error("Lỗi khi xóa đặt phòng.");
        });
    },
    openDetailModal(booking) {
      this.selectedBooking = booking;
      this.detailModal.show();
    },
    selectRoom(homestay, room) {
      if (
        this.addForm.rooms.length > 0 &&
        this.addForm.homestay_id !== homestay.id
      ) {
        toaster.error("Chỉ được chọn phòng từ cùng một homestay!");
        return;
      }
      this.addForm.homestay_id = homestay.id;
      this.addForm.rooms.push({
        roomId: room.id,
        roomName: room.ten_phong,
        homestayId: homestay.id,
        homestayName: homestay.ten_homestay,
        checkIn: this.timphong.check_in,
        checkOut: this.timphong.check_out,
        quantity: 1,
        ghi_chu: "",
        pricePerDay: room.gia,
      });
      this.calculateTotalPrice();
    },
    removeRoom(index) {
      this.addForm.rooms.splice(index, 1);
      if (this.addForm.rooms.length === 0) {
        this.addForm.homestay_id = "";
      }
      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      this.addForm.tong_tien = this.addForm.rooms.reduce((total, room) => {
        if (room.checkIn && room.checkOut) {
          const checkIn = new Date(room.checkIn);
          const checkOut = new Date(room.checkOut);
          const numberOfDays = Math.ceil(
            (checkOut - checkIn) / (1000 * 60 * 60 * 24)
          );
          return (
            total +
            room.quantity *
              (numberOfDays > 0 ? numberOfDays : 0) *
              room.pricePerDay
          );
        }
        return total;
      }, 0);
    },
    async saveBooking() {
      if (
        !this.addForm.id_khach_hang ||
        !this.addForm.rooms.length ||
        !this.addForm.ngay_dat ||
        !this.addForm.homestay_id
      ) {
        toaster.error(
          "Vui lòng điền đầy đủ thông tin khách hàng, ngày đặt và ít nhất một phòng!"
        );
        return;
      }
      this.loading = true;
      try {
        const payload = {
          id_khach_hang: this.addForm.id_khach_hang,
          homestay_id: this.addForm.homestay_id,
          ngay_dat: this.addForm.ngay_dat,
          tong_tien: this.addForm.tong_tien,
          ghi_chu: this.addForm.ghi_chu,
          rooms: this.addForm.rooms.map((room) => ({
            roomId: room.roomId,
            quantity: room.quantity,
            checkIn: room.checkIn,
            checkOut: room.checkOut,
            ghi_chu: room.ghi_chu,
          })),
        };
        const response = await baseRequest.post("/admin/bookings", payload);
        this.logChange("Tạo đặt phòng", response.data.id, payload);
        if (response.data.status === false) {
          toaster.error(response.data.message || "Không thể tạo đặt phòng!");
          return;
        }
        toaster.success("Thêm mới đặt phòng thành công!");
        
        this.addModal.hide();
        this.fetchBookings();
        this.resetForm();
      } catch (error) {
        console.error("Lỗi khi lưu đặt phòng:", error);
        const errorMessage = error.response?.data?.message || error.message;
        if (error.response?.data?.roomId) {
          toaster.error(
            `Phòng ${error.response.data.roomId} không khả dụng trong khoảng thời gian đã chọn!`
          );
        } else {
          toaster.error("Đã có lỗi xảy ra: " + errorMessage);
        }
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const twoDaysAfter = new Date();
      twoDaysAfter.setDate(twoDaysAfter.getDate() + 2);

      this.addForm = {
        id_khach_hang: "",
        homestay_id: "",
        ngay_dat: "",
        tong_tien: 0,
        ghi_chu: "",
        rooms: [],
      };
      this.timphong = {
        check_in: this.formatDateToString(tomorrow),
        check_out: this.formatDateToString(twoDaysAfter),
        suc_chua: 1,
      };
      this.availableHomestays = [];
      this.minCheckInDate = this.formatDateToString(tomorrow);
      this.minCheckOutDate = this.formatDateToString(twoDaysAfter);
    },
    calculateStats() {
      this.totalRevenue = this.bookings.reduce(
        (total, booking) => total + booking.tong_tien,
        0
      );
      this.bookingStats.total = this.bookings.length;
      this.bookingStats.pending = this.bookings.filter(
        (b) => b.tinh_trang === "pending"
      ).length;
      this.bookingStats.confirmed = this.bookings.filter(
        (b) => b.tinh_trang === "confirmed"
      ).length;
      this.bookingStats.cancelled = this.bookings.filter(
        (b) => b.tinh_trang === "cancelled"
      ).length;
      this.bookingStats.completed = this.bookings.filter(
        (b) => b.tinh_trang === "completed"
      ).length;
    },
    logChange(action, id, data) {
      console.log(
        `[${new Date().toLocaleString()}] ${action} - ID: ${id}`,
        data
      );
    },
    notifyAdmin(message) {
      toaster.info(`Thông báo cho quản lý: ${message}`);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    },
    formatPrice(price) {
      return price;
    },
    formatDateToString(date) {
      return date.toISOString().split("T")[0];
    },
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
.form-select,
.form-control {
  width: 100%;
}
.modal-content {
  padding: 20px;
  background-color: white;
  color: black;
}
.invoice-header {
  text-align: center;
  border-bottom: 2px solid #007bff;
  margin-bottom: 20px;
}
</style>