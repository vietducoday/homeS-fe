<template >
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <p class="card-title">Homestay</p>
            <h5 class="card-text">{{ ChiTietDatPhong?.ten_homestay }}</h5>
            <p class="card-text">{{ ChiTietDatPhong?.dia_chi }}</p>
            <span class="badge bg-primary">
              5
              <i class="fa-solid fa-star text-warning"></i>
            </span>
            <span> 100</span>
            <hr />
            <!-- Hiển thị tiện ích -->
           
          </div>
        </div>
        <div class="card sticky-top">
          <div class="card-body">
            <p>Giá</p>
           
            <div
              class="p-3 mt-3 rounded d-flex justify-content-between align-items-center py-4"
              style="background: #062d62; color: aliceblue"
            >
              <p class="fs-5 fw-bold p-0 m-0">Tổng</p>
              <p class="fs-5 fw-bold p-0 m-0">
                {{ ChiTietDatPhong?.tong_tien }}
              </p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center mt-2 ms-5"
            >
             
            </div>
            <div class="text-end">
              <span
                v-if="ChiTietDatPhong.is_thanh_toan == 1"
                class="badge badge-lg bg-success"
              >
                <i class="fa-solid fa-check"></i> Đã thanh toán
              </span>
              <span v-else class="badge badge-lg bg-danger">
                <i class="fa-solid fa-xmark"></i> Chưa thanh toán
              </span>
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
                  {{ ChiTietPhong[0]?.ngay_nhan_phong }}
                </p>
                <p>từ 14:00</p>
              </div>
              <div class="col-6">
                <p class="fs-8 fw-bold p-0">Trả phòng</p>
                <p class="fw-bold p-0 m-0" style="font-size: 1.2rem">
                  {{ ChiTietPhong[0]?.ngay_tra_phong }}
                </p>
                <p>lúc 12:00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body">
            <div class="row">
              <div class="text-center fw-bold fs-5">Phòng đã chọn</div>
              <template v-for="(phong, index) in ChiTietPhong" :key="index">
                <div class="row g-4">
                  <div
                    v-for="(phong, index) in ChiTietPhong"
                    :key="index"
                    class="col-lg-6 col-md-12"
                  >
                    <div class="card shadow-sm border-0 h-100 rounded-3">
                      <div
                        class="card-header text-white"
                        style="background-color: #062d62"
                      >
                        <h5 class="mb-0 text-center text-white fw-bold">
                          {{ phong.ten_phong }}
                        </h5>
                      </div>
                      <div class="card-body">
                        <p class="card-text mb-1">
                          <strong>Giá:</strong>
                          {{ phong.gia.toLocaleString() }} VNĐ
                        </p>
                        <p class="card-text mb-1">
                          <strong>Diện tích:</strong> {{ phong.dien_tich }} m²
                        </p>
                        <p class="card-text mb-1">
                          <strong>Sức chứa:</strong> {{ phong.suc_chua }} người
                        </p>
                        <p class="card-text">
                          <strong>Mô tả:</strong> {{ phong.mo_ta }}
                        </p>
                      </div>
                      <div class="card-footer">
                        <div v-if="phong.sao == null">
                          <button class="btn btn-danger" @click="Object.assign(phongDanhGia, phong)" data-bs-toggle="modal" data-bs-target="#exampleModal">Đánh giá ngay</button>
                          <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                  {{ phongDanhGia.ten_phong }}
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label"
                                      >Đánh giá:</label
                                    >
                                    <select
                                      class="form-select"
                                      v-model="phongDanhGia.sao"
                                      aria-label="Default select example"
                                    >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                  </div>
                                  <div class="mb-3">
                                    <label for="message-text" class="col-form-label"
                                      >Nội dung:</label
                                    >
                                    <textarea
                                      class="form-control"
                                      v-model="phongDanhGia.noi_dung"
                                      placeholder="Nhập nội dung đánh giá"
                                    ></textarea>
                                  </div>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    đóng
                                  </button>
                                  <button type="button" @click="danhGia()" class="btn btn-primary"  data-bs-dismiss="modal">
                                   Thêm đánh giá
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <p class="fw-bold">Đánh giá của bạn</p>
                          <div class="d-flex justify-content-between">
                            <span class="text-white p-2 me-2 radius-10 shadow-sm" style="background-color: #062d62;">
                              {{ phong.noi_dung }}
                            </span>
                            <span>
                              <span class="badge py-2" style="background-color: #062d62;"
                                >{{ phong.sao }} <i class="fa-solid fa-star text-warning"></i
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- Gộp phần xác nhận thông tin khách hàng vào đây -->

        <!-- Danh sách phòng -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import customerRequest from "../../core/customerRequest";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });
export default {
  name: "ChiTietDatPhong",
  props: ["id"],
  data() {
    return {
      phongDanhGia: {},
      ChiTietDatPhong: {},
      ChiTietPhong: {},
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.getChiTietDatPhong();
  },
  methods: {
    danhGia(){
      customerRequest
        .post("danh-gia", this.phongDanhGia)
        .then((response) => {
          console.log("Đánh giá thành công:", response.data);
          toaster.success("Đánh giá thành công");
          this.getChiTietDatPhong();
          this.phongDanhGia = {}; // Reset phongDanhGia after successful submission
        })
        .catch((error) => {
          console.error("Lỗi khi đánh giá:", error);
          this.$toaster.error("Có lỗi xảy ra khi đánh giá");
        });
    },
    getChiTietDatPhong() {
      const payload = {
        params: {
          id: this.id,
        },
      };
      customerRequest
        .get("chi-tiet-dat-phong/" + this.id)
        .then((response) => {
          this.ChiTietDatPhong = response.data.data.booking;
          this.ChiTietPhong = response.data.data.chi_tiet_phongs;

          console.log("Chi tiết đặt phòng:", this.ChiTietDatPhong);
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error);
        });
    },
  },
};
</script>
<style >
</style>