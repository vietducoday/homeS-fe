<template>
  <Steps :currentStep="1" />
  <div class="container mt-4">
    
    
    <!-- Hiển thị thông báo lỗi nếu không có id -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Thông tin homestay -->
    <div v-else-if="homestay.ten_homestay" class="row">
      <div class="col-lg-8 col-md-12">
        <div class="card ">
          <div class="card-body">
            <div
              class="w-100 d-flex justify-content-between align-items-center"
            >
              <h5>{{ homestay.ten_homestay }}</h5>
              <div class="d-flex">
                <button class="btn btn-sm">
                  <i class="fa-regular fa-heart"></i>
                </button>
                <a
                  href="#datngay"
                  class="btn"
                  style="
                    background: #062d62;
                    color: aliceblue;
                    border-radius: 0;
                  "
                >
                  Đặt ngay
                </a>
              </div>
            </div>

            <p>
              <i class="fa-solid fa-location-dot"></i> {{ homestay.dia_chi }}
            </p>
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  v-for="(image, index) in homestay.images"
                  :key="index"
                  type="button"
                  :data-bs-target="'#carouselExampleIndicators'"
                  :data-bs-slide-to="index"
                  :class="{ active: index === 0 }"
                  :aria-current="index === 0 ? 'true' : 'false'"
                  :aria-label="'Slide ' + (index + 1)"
                ></button>
              </div>
              <div class="carousel-inner">
                <div
                  v-for="(image, index) in homestay.images"
                  :key="index"
                  :class="['carousel-item', { active: index === 0 }]"
                >
                  <img
                    :src="
                      image
                    "
                    class="d-block w-100"
                    style="
                      max-height: 500px;
                      min-height: 250px;
                      object-fit: cover;
                      height: calc(100vw * (6 / 19));
                    "
                    alt="homestay image"
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <!-- Mô tả -->
            <p class="mt-2">{{ homestay.mo_ta }}</p>
            <!-- Tiện ích -->
            <h5>Tiện ích</h5>
            <div v-html="homestay.tien_ich" class="amenities-container"></div>
          </div>
        </div>
      </div>
      <!-- Đánh giá -->
      <div class="col-lg-4 col-md-12">
        <div class="card ">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h5>Đánh giá</h5>
              <div class="d-flex justify-content-center align-items-center">
                <span class="text-center mx-1"
                  >{{ homestay.reviews.length }} đánh giá</span
                >
                <span
                  class="badge p-2"
                  style="background: #062d62; color: white"
                >
                  {{ averageRating }} <i class="fa-solid fa-star"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div
              v-for="(review, index) in homestay.reviews.filter(r => r.rating >= 4 ).slice(0, 5)"
              :key="index"
              class="p-1 mb-3 shadow-sm rounded"
            >
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex ms-1 mt-1 align-items-center">
                  <img
                    :src="review.avatar"
                    class="user-img ms-0"
                    alt="user avatar"
                  />
                  <div class="ms-2">
                    <div class="fw-bold">{{ review.user }}</div>
                    <span
                      class="badge"
                      style="background: #062d62; color: white"
                    >
                      {{ review.rating }} <i class="fa-solid fa-star"></i>
                    </span>
                  </div>
                </div>
              </div>
              <p class="ms-3 mt-1">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr v-if="homestay.ten_homestay" />
    <!-- Danh sách phòng -->
    <div
      v-if="homestay.ten_homestay"
      class="d-flex justify-content-between align-items-center w-100"
    >
      <h5 id="datngay">Vui lòng chọn phòng</h5>
      <router-link
        v-if="bookingStore.selectedRooms.length > 0"
        to="/bookingdetail"
        class="btn"
        style="background: #062d62; color: aliceblue; border-radius: 0"
        @click="saveBookingData"
      >
        Xác nhận
      </router-link>
      <button
        v-else
        class="btn"
        style="background: #062d62; color: aliceblue; border-radius: 0"
        disabled
      >
        Xác nhận
      </button>
    </div>
    <div v-if="homestay.ten_homestay" class="row">
      <div
        v-for="room in homestay.rooms"
        :key="room.id"
        class="col-lg-4 col-sm-12"
      >
        <div class="card">
          <div
            :id="'carouselRoom' + room.id"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                v-for="(image, index) in room.images"
                :key="index"
                :class="['carousel-item', { active: index === 0 }]"
              >
                <img
                  :src="
                    image
                      
                  "
                  style="max-height: 250px; object-fit: cover"
                  class="d-block w-100"
                  alt="room image"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              :data-bs-target="'#carouselRoom' + room.id"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              :data-bs-target="'#carouselRoom' + room.id"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          <div class="card-body">
            <div class="row">
              <h5>{{ room.ten_phong }}</h5>
              <div class="col">
                <p class="m-0">Diện tích: {{ room.dien_tich }} m2</p>
                <p class="m-0">Số lượng khách: {{ room.suc_chua }}</p>
                <p class="m-0">Giường đôi: {{ room.so_giuong }}</p>
              </div>
              <div class="col text-end">
                <p class="m-0 fs-6 fw-bold" style="color: #062d62">
                  {{ formatPrice(room.gia) }}
                  <i class="fa-solid fa-dong-sign"></i>
                </p>
                <div
                  class="d-flex w-100 justify-content-end align-items-center"
                >
                  <input
                    type="checkbox"
                    :id="'room-' + room.id"
                    v-model="roomSelections[room.id]"
                    @change="updateSelectedRooms(room)"
                    class="form-check-input me-2"
                  />
                  <label :for="'room-' + room.id" class="form-check-label"
                    >Chọn phòng</label
                  >
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>
                <span
                  v-for="(tienIch, index) in parseRoomTienIch(room.tien_ich)"
                  :key="index"
                  class="me-3"
                >
                  <i :class="tienIch.icon"></i> {{ tienIch.name }}
                </span>
                <span
                  v-if="!parseRoomTienIch(room.tien_ich).length"
                  class="text-muted"
                >
                  Không có tiện ích được liệt kê.
                </span>
              </div>
              <div>
                <button
                  class="btn"
                  @click="showRoomDetails(room)"
                  style="color: #062d62"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Thông báo nếu không có phòng -->
      <div v-if="homestay.rooms && homestay.rooms.length === 0" class="col-12">
        <p class="text-muted text-center">
          Không có phòng khả dụng với tiêu chí tìm kiếm.
        </p>
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
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
             Chi tiết phòng <b style="color: #062d62;">{{ chi_tiet_phong.ten_phong }}</b>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <p>
                  <strong>Diện tích:</strong> {{ chi_tiet_phong.dien_tich }} m²
                </p>
                <p>
                  <strong>Sức chứa:</strong> {{ chi_tiet_phong.suc_chua }} người
                </p>
                <p>
                  <strong>Giường đôi:</strong> {{ chi_tiet_phong.so_giuong }}
                </p>
                <p>
                  <strong>Giá:</strong> {{ formatPrice(chi_tiet_phong.gia) }}
                  <i class="fa-solid fa-dong-sign"></i>
                </p>
                <h6>Tiện ích:</h6>
                <div>
                  <span
                    v-for="(tienIch, index) in parseRoomTienIch(
                      chi_tiet_phong.tien_ich
                    )"
                    :key="index"
                    class="me-3"
                  >
                    <i :class="tienIch.icon"></i> {{ tienIch.name }}
                  </span>
                  <span
                    v-if="!parseRoomTienIch(chi_tiet_phong.tien_ich).length"
                    class="text-muted"
                  >
                    Không có tiện ích được liệt kê.
                  </span>
                  <template v-for="(reviews, index) in chi_tiet_phong.reviews" :key="index">
                    <div class="card">
                      <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex ms-1 mt-1 align-items-center">
                  <img
                    :src="reviews.avatar"
                    class="user-img ms-0"
                    alt="user avatar"
                  />
                  <div class="ms-2">
                    <div class="fw-bold">{{ reviews.user }}</div>
                    <span
                      class="badge"
                      style="background: #062d62; color: white"
                    >
                      {{ reviews.rating }} <i class="fa-solid fa-star"></i>
                    </span>
                  </div>
                </div>
              </div>
              <p class="ms-3 mt-1">{{ reviews.comment }}</p>
                    </div>
                  </template>
                </div>
              </div>
              <div class="col-md-8">
                <div class="row">
                  
                    <template
                      v-for="(image, index) in chi_tiet_phong.images"
                      :key="index"
                    >
                      <div class="col-6">
                        <img
                          :src="
                            image
                          "
                          style="object-fit: cover"
                          class="img-fluid my-2"
                          alt="room image"
                        />
                      </div>
                    </template>
                 
                </div>
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
            <button type="button" class="btn btn-primary">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useSearchStore } from "../../stores/search";
import { useBookingStore } from "../../stores/booking";
import Steps from "../../components/User/Step.vue";

export default {
  components: {
    Steps,
  },
  setup() {
    const searchStore = useSearchStore();
    const bookingStore = useBookingStore();
    return { searchStore, bookingStore };
  },
  data() {
    return {
      chi_tiet_phong: {
        ten_phong: "",
        dien_tich: 0,
        suc_chua: 0,
        so_giuong: 0,
        gia: 0,
        tien_ich: "",
        images: [],
        reviews: [],
      },
      homestay: {
        id: null,
        ten_homestay: "",
        dia_chi: "",
        mo_ta: "",
        tien_ich: "",
        anh_chinh: "",
        images: [],
        reviews: [],
        average_rating: 0,
        rooms: [],
      },
      roomSelections: {},
      errorMessage: "",
    };
  },
  computed: {
    averageRating() {
      return this.homestay.average_rating || 0;
    },
  },
  mounted() {
    const homestayId = this.$route.params.id;
    console.log("HomestayDetail - homestayId:", homestayId);
    if (!homestayId || homestayId === "undefined") {
      this.errorMessage =
        "Không tìm thấy homestay. Vui lòng quay lại trang tìm kiếm.";
      return;
    }
    this.fetchHomestayDetail();

    // Lắng nghe sự kiện đóng modal để đặt lại chi_tiet_phong
    const modal = document.getElementById("staticBackdrop");
    modal.addEventListener("hidden.bs.modal", () => {
      this.chi_tiet_phong = {
        ten_phong: "",
        dien_tich: 0,
        suc_chua: 0,
        so_giuong: 0,
        gia: 0,
        tien_ich: "",
        images: [],
        reviews: [],
      };
    });
  },
  methods: {
    async fetchHomestayDetail() {
      try {
        const homestayId = this.$route.params.id;
        let { checkIn, checkOut, sucChua } = this.searchStore;

        if (!checkIn || !checkOut || !sucChua) {
          checkIn = this.$route.query.checkIn || "";
          checkOut = this.$route.query.checkOut || "";
          sucChua = this.$route.query.sucChua || "";
        }

        if (!checkIn || !checkOut || !sucChua) {
          this.errorMessage =
            "Không có thông tin tìm kiếm. Vui lòng tìm kiếm lại.";
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/homestays/${homestayId}`,
          {
            params: {
              check_in: checkIn,
              check_out: checkOut,
              suc_chua: sucChua,
            },
          }
        );
        this.homestay = response.data;
        this.homestay.rooms.forEach((room) => {
          this.$set(this.roomSelections, room.id, false);
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin homestay:", error);
      }
    },
    showRoomDetails(room) {
      this.chi_tiet_phong = {
        ten_phong: room.ten_phong,
        dien_tich: room.dien_tich,
        suc_chua: room.suc_chua,
        so_giuong: room.so_giuong,
        gia: room.gia,
        tien_ich: room.tien_ich,
        images: room.images,
      };
    },
    parseRoomTienIch(tienIchHtml) {
      if (!tienIchHtml) return [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(tienIchHtml, "text/html");
      const listItems = doc.querySelectorAll("li");
      return Array.from(listItems).map((item) => {
        const icon = item.querySelector("i")?.className || "";
        const name = item.textContent.trim();
        return { icon, name };
      });
    },
    updateSelectedRooms(room) {
      const isSelected = this.roomSelections[room.id];
      if (isSelected) {
        this.bookingStore.addRoom({
          roomId: room.id,
          ten_phong: room.ten_phong,
          gia: room.gia,
          quantity: 1,
          checkIn: this.$route.query.checkIn || this.searchStore.checkIn,
          checkOut: this.$route.query.checkOut || this.searchStore.checkOut,
        });
      } else {
        this.bookingStore.removeRoom(room.id);
      }
      this.bookingStore.updateTotalGuests(
        this.bookingStore.selectedRooms,
        this.homestay.rooms
      );
    },
    saveBookingData() {
      this.bookingStore.setBookingData({
        selectedRooms: this.bookingStore.selectedRooms,
        homestayId: this.homestay.id,
        checkIn: this.$route.query.checkIn || this.searchStore.checkIn,
        checkOut: this.$route.query.checkOut || this.searchStore.checkOut,
        totalGuests: this.bookingStore.totalGuests,
      });
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

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
  margin-right: 0.25 Kita rem;
}
</style>