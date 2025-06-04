<template>
  <div>
    <Baner></Baner>

    <div class="text-center mt-5">
      <h5>Homestay của chúng tôi</h5>
    </div>
    <ListHShome></ListHShome>

    <div class="container mt-4">
      <div class="card p-4" style="background-color: #f9f9f9">
        <div class="d-flex justify-content-center align-items-baseline mb-4">
          <h3 class="fw-bold text-center">
            DỊCH VỤ TẠI <span style="color: #062d62">Home</span
            ><span style="color: #f2961f">S</span>
          </h3>
        </div>

        <div class="row text-center">
          <div class="col-md-3 mb-3">
            <i
              class="fa-solid fa-file-circle-question fa-3x text-danger mb-2"
            ></i>
            <p>
              <strong>Chat Bot AI thông minh</strong><br />
              <span class="text-muted"
                >Giải đáp nhanh mọi thắc mắc về quy trình đặt phòng, hoạt động
                24/24</span
              >
            </p>
          </div>
          <div class="col-md-3 mb-3">
            <i class="fa-solid fa-calendar-check fa-3x text-success mb-2"></i>
            <p>
              <strong>Đặt phòng nhanh chóng</strong><br />
              <span class="text-muted"
                >Quy trình đặt phòng nhanh chóng, thông tin được bảo mật
                cao</span
              >
            </p>
          </div>
          <div class="col-md-3 mb-3">
            <i class="fa-solid fa-star-half-stroke fa-3x text-warning mb-2"></i>
            <p>
              <strong>Đánh giá minh bạch</strong><br />
              <span class="text-muted">
                Xem phản hồi thực tế từ khách trước, giúp bạn yên tâm lựa chọn
                đúng chỗ ở phù hợp.
              </span>
            </p>
          </div>
          <div class="col-md-3 mb-4">
            <i class="fa-solid fa-credit-card fa-3x text-primary mb-2"></i>
            <p>
              <strong>Thanh toán linh hoạt</strong><br />
              <span class="text-muted">
                Hỗ trợ nhiều hình thức thanh toán như chuyển khoản, ví điện tử,
                hoặc tại homestay.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="card mt-5" style="background-color: #062d62">
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 text-white py-2">
                <img src="/logolight.png" alt="" style="height: 50px" />
                <p class="pt-5">
                  Với hơn 7 homestay tại Đà Nẵng, chúng tôi luôn đem lại cho bạn
                  những chỗ nghỉ có phòng cách decor phong phú và thuận tiện khi
                  đặt phòng qua website của chúng tôi
                </p>
                <h5 class="text-warning">
                  <i class="fa-solid fa-check"></i> Đặt phòng dễ dàng, nhanh
                  chóng
                </h5>
                <h5 class="text-warning">
                  <i class="fa-solid fa-check"></i> Đội ngũ hỗ trợ 24/24
                </h5>
                <h5 class="text-warning">
                  <i class="fa-solid fa-check"></i> Nhận phòng thuận tiện
                </h5>
              </div>
              <div class="col-lg-6 py-2">
                <img
                  src="https://th.bing.com/th/id/R.20a8cdefb8d7afcd18affb1203e0510c?rik=sm8WzCLgsrXC7g&pid=ImgRaw&r=0"
                  alt="Ảnh minh họa"
                  class="w-100 rounded-4 shadow-sm"
                  style="
                    height: 400px;
                    object-fit: cover;
                    transition: 0.3s ease;
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6>Đánh giá khách hàng</h6>
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
        <div class="col">
          <div
            class="card"
            style="
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            "
          >
            <div class="card-body" style="padding: 20px">
              <div
                style="display: flex; align-items: center; margin-bottom: 15px"
              >
                <div style="display: flex; margin-right: 10px">
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star-half-alt"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                </div>
                <span style="font-weight: bold; font-size: 16px">4.5/5</span>
              </div>
              <p style="font-style: italic; margin-bottom: 15px">
                "Khách sạn tuyệt vời với dịch vụ chu đáo, phòng ốc sạch sẽ và
                view đẹp. Nhân viên nhiệt tình!"
              </p>
              <div style="display: flex; align-items: center">
                <img
                  src="../../assets/images/avatars/avatar-3.png"
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                  "
                />
                <div>
                  <p style="font-weight: bold; margin: 0">Nguyễn Văn A</p>
                  <p style="font-size: 12px; color: #888; margin: 0">
                    Khách hàng mới
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div
            class="card"
            style="
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            "
          >
            <div class="card-body" style="padding: 20px">
              <div
                style="display: flex; align-items: center; margin-bottom: 15px"
              >
                <div style="display: flex; margin-right: 10px">
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                </div>
                <span style="font-weight: bold; font-size: 16px">5/5</span>
              </div>
              <p style="font-style: italic; margin-bottom: 15px">
                "Trải nghiệm tuyệt vời! Mọi thứ từ phòng nghỉ đến dịch vụ đều
                hoàn hảo. Sẽ quay lại vào lần tới."
              </p>
              <div style="display: flex; align-items: center">
                <img
                  src="../../assets/images/avatars/avatar-2.png"
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                  "
                />
                <div>
                  <p style="font-weight: bold; margin: 0">Trần Thị B</p>
                  <p style="font-size: 12px; color: #888; margin: 0">
                    Khách hàng mới
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div
            class="card"
            style="
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            "
          >
            <div class="card-body" style="padding: 20px">
              <div
                style="display: flex; align-items: center; margin-bottom: 15px"
              >
                <div style="display: flex; margin-right: 10px">
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="fa-solid fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                  <i
                    class="far fa-star"
                    style="color: #ffd700; font-size: 18px"
                  ></i>
                </div>
                <span style="font-weight: bold; font-size: 16px">4/5</span>
              </div>
              <p style="font-style: italic; margin-bottom: 15px">
                "Khách sạn tốt, vị trí thuận tiện. Chỉ có wifi hơi chậm một chút
                nhưng không ảnh hưởng nhiều."
              </p>
              <div style="display: flex; align-items: center">
                <img
                  src="../../assets/images/avatars/avatar-1.png"
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                  "
                />
                <div>
                  <p style="font-weight: bold; margin: 0">Lê Văn C</p>
                  <p style="font-size: 12px; color: #888; margin: 0">
                    Kháh hàng mới
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Baner from "../../components/User/Baner.vue";
import ListHShome from "../../components/User/ListHShome.vue";
import ListPost from "../../components/User/ListPost.vue";

export default {
  name: "HomePage",
  components: {
    Baner,
    ListHShome,
    ListPost,
  },
  data() {},

  methods: {},
};
</script>

<style scoped>
/* Responsive chỉnh modal & khoảng cách */
.modal-dialog {
  max-width: 90%;
}

@media (max-width: 768px) {
  .modal-dialog {
    margin: 1rem;
  }
}
.card .fa-3x {
  transition: transform 0.3s;
}
.card .fa-3x:hover {
  transform: scale(1.2);
}
img:hover {
  transform: scale(1.02);
}


</style>