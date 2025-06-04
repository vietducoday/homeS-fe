<template>
  <div
    class="wrapper"
    style="
      min-height: 100vh;
      background-image: url('https://baodanang.vn/dataimages/202505/original/images1777456_AR_1.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      align-items: center;
      justify-content: center;
    "
  >
    <div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
          <div class="col mx-auto">
            <div class="my-4 text-center">
              <img src="../../../public/logolight.png" width="180" alt="" />
            </div>
            <div
              class="card"
              style="
                background-color: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
              "
            >
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="text-center">
                    <h3 class="">Đăng Ký</h3>
                    <p>
                      Đã có tài khoản? <a href="/login">Đăng nhập tại đây</a>
                    </p>
                  </div>

                  <div class="login-separater text-center mb-4">
                    <hr />
                  </div>

                  <div class="">
                    <div class="row g-3">
                      <div class="col-12">
                        <label class="form-label">Họ và Tên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="dangKyTK.ho_ten"
                          required
                        />
                        <div v-if="errors.ho_ten" class="text-danger mt-1">
                          {{ errors.ho_ten }}
                        </div>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Địa chỉ Email</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="dangKyTK.email"
                          required
                        />
                        <div v-if="errors.email" class="text-danger mt-1">
                          {{ errors.email }}
                        </div>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Số Điện Thoại</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="dangKyTK.so_dien_thoai"
                        
                          required
                        />

                        <div
                          v-if="errors.so_dien_thoai"
                          class="text-danger mt-1"
                        >
                          {{ errors.so_dien_thoai }}
                        </div>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Ngày Sinh ()</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="dangKyTK.ngay_sinh"
                          required
                        />
                        <div v-if="errors.ngay_sinh" class="text-danger mt-1">
                          {{ errors.ngay_sinh }}
                        </div>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Giới Tính</label>
                        <select
                          class="form-select"
                          v-model="dangKyTK.gioi_tinh"
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="1">Nam</option>
                          <option value="2">Nữ</option>
                          <option value="0">Khác</option>
                        </select>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Mật Khẩu</label>
                        <div class="input-group">
                          <input
                            v-model="dangKyTK.mat_khau"
                            :type="passwordFieldType"
                            class="form-control"
                            required
                          />
                          <span
                            class="input-group-text"
                            @click="togglePasswordVisibility"
                            style="cursor: pointer"
                          >
                            <i
                              :class="
                                passwordFieldType === 'password'
                                  ? 'fa-regular fa-eye'
                                  : 'fa-regular fa-eye-slash'
                              "
                            ></i>
                          </span>
                        </div>
                        <div v-if="errors.mat_khau" class="text-danger mt-1">
                          {{ errors.mat_khau }}
                        </div>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Nhập Lại Mật Khẩu</label>
                        <div class="input-group">
                          <input
                            v-model="dangKyTK.mat_khau_confirmation"
                            :type="rePasswordFieldType"
                            class="form-control"
                            required
                          />
                          <span
                            class="input-group-text"
                            @click="toggleRePasswordVisibility"
                            style="cursor: pointer"
                          >
                            <i
                              :class="
                                rePasswordFieldType === 'password'
                                  ? 'fa-regular fa-eye'
                                  : 'fa-regular fa-eye-slash'
                              "
                            ></i>
                          </span>
                        </div>
                        <div
                          v-if="errors.mat_khau_confirmation"
                          class="text-danger mt-1"
                        >
                          {{ errors.mat_khau_confirmation }}
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="d-grid">
                          <button @click="dangKy()" class="btn btn-primary">
                            <i class="bx bx-user"></i> Đăng Ký
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({
  position: "top-right",
  duration: 3000,
  pauseOnHover: true,
});

export default {
  data() {
    return {
      dangKyTK: {
        ho_ten: "",
        email: "",
        so_dien_thoai: "",
        ngay_sinh: "",
        gioi_tinh: "",
        mat_khau: "",
        mat_khau_confirmation: "",
      },
      errors: {
        ho_ten: "",
        email: "",
        so_dien_thoai: "",
        ngay_sinh: "",
        mat_khau: "",
        mat_khau_confirmation: "",
      },
      passwordFieldType: "password",
      rePasswordFieldType: "password",
    };
  },
  methods: {
    validateForm() {
      this.errors = {
        ho_ten: "",
        email: "",
        so_dien_thoai: "",
        ngay_sinh: "",
        mat_khau: "",
        mat_khau_confirmation: "",
      };
      let isValid = true;

      // Tên không được chứa số, ký tự đặc biệt hoặc emoji
      const nameRegex = /^[\p{L}\s]+$/u;
      if (!nameRegex.test(this.dangKyTK.ho_ten.trim())) {
        this.errors.ho_ten = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
        isValid = false;
      }

      // Email đúng định dạng
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.dangKyTK.email.trim())) {
        this.errors.email = "Email không đúng định dạng.";
        isValid = false;
      }

      // Số điện thoại Việt Nam
      const phoneRegex =
        /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
      if (!this.dangKyTK.so_dien_thoai.trim()) {
        this.errors.so_dien_thoai = "Vui lòng nhập số điện thoại.";
        isValid = false;
      } else if (!phoneRegex.test(this.dangKyTK.so_dien_thoai.trim())) {
        this.errors.so_dien_thoai =
          "Số điện thoại không đúng định dạng Việt Nam.";
        isValid = false;
      }

      // Ngày sinh phải đủ 18 tuổi
      if (this.dangKyTK.ngay_sinh) {
        const birthDate = new Date(this.dangKyTK.ngay_sinh);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        const isOver18 =
          age > 18 ||
          (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

        if (!isOver18) {
          this.errors.ngay_sinh = "Bạn phải từ 18 tuổi trở lên để đăng ký.";
          isValid = false;
        }
      } else {
        this.errors.ngay_sinh = "Vui lòng chọn ngày sinh.";
        isValid = false;
      }

      // Mật khẩu mạnh
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;
      if (!passwordRegex.test(this.dangKyTK.mat_khau)) {
        this.errors.mat_khau =
          "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
        isValid = false;
      }

      // Nhập lại mật khẩu
      if (this.dangKyTK.mat_khau !== this.dangKyTK.mat_khau_confirmation) {
        this.errors.mat_khau_confirmation =
          "Mật khẩu và xác nhận mật khẩu không khớp.";
        isValid = false;
      }

      return isValid;
    },

    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    toggleRePasswordVisibility() {
      this.rePasswordFieldType =
        this.rePasswordFieldType === "password" ? "text" : "password";
    },
    dangKy() {
      if (!this.validateForm()) {
        return;
      }

      axios
        .post("http://127.0.0.1:8000/api/register", this.dangKyTK)
        .then((res) => {
          if (res.data.status == 201) {
            toaster.success(res.data.message);
            this.dangKyTK = {
              ho_ten: "",
              email: "",
              so_dien_thoai: "",
              ngay_sinh: "",
              gioi_tinh: "",
              mat_khau: "",
              mat_khau_confirmation: "",
            };
            this.errors = {};
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((res) => {
          toaster.error(res.response?.data?.message || "Đăng ký thất bại");
          console.error(res);
        });
    },
    kichhoatTK() {
      axios
        .post("http://127.0.0.1:8000/api/gui-mail-kich-hoat", this.dangKyTK)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            this.dangKyTK = {};
          } else {
            toaster.error(res.data.message);
          }
        });
    },
  },
};
</script>

<style scoped>
input.form-control,
select.form-select {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #ced4da;
  color: #fff;
}

h3 {
  font-weight: bold;
  color: #fff;
}

p,
label,
.form-check-label,
.text-danger {
  color: #f8f9fa;
}

input.form-control::placeholder {
  color: #ddd;
}

.text-danger {
  font-size: 0.875rem;
}
</style>