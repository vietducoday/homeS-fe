<template>
  <div class="container my-3">
    <div class="main-body">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mt-3 border-danger border-top border-3 border-0">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="avatar-container">
                  <img
                    :src="avatarUrl"
                    alt="Profile"
                    class="rounded-circle p-1"
                    style="
                      background: rgb(226, 169, 0);
                      width: 150px;
                      height: 150px;
                      object-fit: cover;
                    "
                    @error="handleImageError"
                  />
                </div>
                <div class="mt-3">
                  <h4>{{ admin?.ho_ten || 'Nhân Viên' }}</h4>
                  <p class="text-secondary mb-1">{{ admin?.chuc_vu?.ten_chuc_vu || 'Chưa cập nhật' }}</p>
                </div>
              </div>
              <hr class="my-4" />
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <h6 class="mb-0">
                    <i class="fa-solid fa-envelope me-2"></i>Email
                  </h6>
                  <span class="text-secondary">{{ admin?.email || 'Chưa cập nhật' }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <h6 class="mb-0">
                    <i class="fa-solid fa-envelope me-2"></i>Homestay làm việc
                  </h6>
                  <span class="text-secondary">{{ admin?.homestay?.ten_homestay || 'Chưa cập nhật' }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <h6 class="mb-0">
                    <i class="fa-solid fa-mobile-screen-button me-2"></i>Số điện thoại
                  </h6>
                  <span class="text-secondary">{{ admin?.so_dien_thoai || 'Chưa cập nhật' }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <h6 class="mb-0">
                    <i class="fa-solid fa-cake-candles me-2"></i>Ngày sinh
                  </h6>
                  <span class="text-secondary">{{ admin?.ngay_sinh || 'Chưa cập nhật' }}</span>
                </li>
              </ul>
              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <button
                  class="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#editProfileModal"
                >
                  <i class="fa-solid fa-circle-info"></i> Chỉnh sửa
                </button>
                <button
                  class="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordModal"
                >
                  <i class="fa-solid fa-key"></i> Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      class="modal fade"
      id="editProfileModal"
      tabindex="-1"
      aria-labelledby="editProfileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModalLabel">Chỉnh sửa thông tin cá nhân</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetProfileForm"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProfile">
              <div class="mb-3">
                <label for="fullName" class="form-label">Họ và tên</label>
                <input
                  v-model="editProfile.ho_ten"
                  type="text"
                  class="form-control"
                  id="fullName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input
                  v-model="editProfile.so_dien_thoai"
                  type="tel"
                  class="form-control"
                  id="phone"
                />
              </div>
              <div class="mb-3">
                <label for="dob" class="form-label">Ngày sinh</label>
                <input
                  v-model="editProfile.ngay_sinh"
                  type="date"
                  class="form-control"
                  id="dob"
                />
              </div>
              <div class="mb-3">
                <label for="avatarUrl" class="form-label">URL ảnh đại diện</label>
                <input
                  v-model="editProfile.avatar_url"
                  type="url"
                  class="form-control"
                  id="avatarUrl"
                  placeholder="Nhập URL ảnh (https://...)"
                />
              </div>
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? 'Đang lưu...' : 'Lưu thay đổi' }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="resetProfileForm"
                >
                  Hủy
                </button>
              </div>
              <p class="text-danger mt-2" v-if="profileError">{{ profileError }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      class="modal fade"
      id="changePasswordModal"
      tabindex="-1"
      aria-labelledby="changePasswordModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changePasswordModalLabel">Đổi mật khẩu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetPasswordForm"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitPassword">
              <div class="mb-3">
                <label for="currentPassword" class="form-label">Mật khẩu hiện tại</label>
                <input
                  v-model="password.current"
                  type="password"
                  class="form-control"
                  id="currentPassword"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label">Mật khẩu mới</label>
                <input
                  v-model="password.new"
                  type="password"
                  class="form-control"
                  id="newPassword"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới</label>
                <input
                  v-model="password.confirm"
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  required
                />
              </div>
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? 'Đang đổi...' : 'Đổi mật khẩu' }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="resetPasswordForm"
                >
                  Hủy
                </button>
              </div>
              <p class="text-danger mt-2" v-if="passwordError">{{ passwordError }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '../../stores/useAdminStore';
import { createToaster } from '@meforma/vue-toaster';
import api from '../../services/api';

const toaster = createToaster({
position: 'bottom-right',
duration: 3000,
});

const router = useRouter();
const adminStore = useAdminStore();

const editProfile = ref({
ho_ten: '',
so_dien_thoai: '',
ngay_sinh: '',
avatar_url: '',
});
const password = ref({
current: '',
new: '',
confirm: '',
});
const defaultAvatar = 'https://i.pinimg.com/474x/4f/b1/6a/4fb16af4177b0e7bfcbc0423a3267a8a.jpg';
const backendBaseUrl = '';
const isLoading = ref(false);
const profileError = ref(null);
const passwordError = ref(null);

const admin = computed(() => adminStore.getAdmin);
const avatarUrl = computed(() =>
admin.value?.avatar ? `${backendBaseUrl}${admin.value.avatar}` : defaultAvatar
);

const checkAuthentication = async () => {
await adminStore.initializeAuth();
if (!adminStore.isLoggedIn) {
  router.push('/admin/login');
} else {
  if (!adminStore.getAdmin) {
    await adminStore.fetchProfile();
  }
  loadAdminInfo();
}
};

const loadAdminInfo = () => {
editProfile.value = {
  ho_ten: admin.value?.ho_ten || '',
  so_dien_thoai: admin.value?.so_dien_thoai || '',
  ngay_sinh: admin.value?.ngay_sinh || '',
  avatar_url: '',
};
};

const handleImageError = (event) => {
event.target.src = defaultAvatar;
};

const submitProfile = async () => {
if (!editProfile.value.ho_ten) {
  profileError.value = 'Họ tên là bắt buộc!';
  return;
}

if (editProfile.value.avatar_url && !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(editProfile.value.avatar_url)) {
  profileError.value = 'URL ảnh không hợp lệ (phải là png, jpg, jpeg, hoặc gif)';
  return;
}

isLoading.value = true;
profileError.value = null;

try {
  // Update avatar if avatar_url is provided
  if (editProfile.value.avatar_url) {
    const avatarResponse = await api.post('/admin/update-avatar', {
      avatar_url: editProfile.value.avatar_url,
    });
    if (avatarResponse.data.status) {
      adminStore.admin.avatar = avatarResponse.data.avatar;
    } else {
      throw new Error(avatarResponse.data.message || 'Cập nhật ảnh đại diện thất bại');
    }
  }

  // Update profile
  const profileResponse = await api.post('/admin/update-profile', {
    ho_ten: editProfile.value.ho_ten,
    so_dien_thoai: editProfile.value.so_dien_thoai,
    ngay_sinh: editProfile.value.ngay_sinh,
  });
  adminStore.admin = profileResponse.data.data;
  toaster.success('Cập nhật thông tin thành công!');
  document.querySelector('#editProfileModal .btn-close').click();
} catch (error) {
  profileError.value = error.response?.data?.message || 'Cập nhật thông tin thất bại!';
  toaster.error(profileError.value);
  console.error('Lỗi khi cập nhật profile:', error);
} finally {
  isLoading.value = false;
}
};

const resetProfileForm = () => {
editProfile.value = {
  ho_ten: admin.value?.ho_ten || '',
  so_dien_thoai: admin.value?.so_dien_thoai || '',
  ngay_sinh: admin.value?.ngay_sinh || '',
  avatar_url: '',
};
profileError.value = null;
};

const submitPassword = async () => {
if (!password.value.current || !password.value.new || !password.value.confirm) {
  passwordError.value = 'Vui lòng điền đầy đủ thông tin!';
  return;
}
if (password.value.new.length < 6) {
  passwordError.value = 'Mật khẩu mới phải có ít nhất 6 ký tự!';
  return;
}
if (password.value.new !== password.value.confirm) {
  passwordError.value = 'Mật khẩu xác nhận không khớp!';
  return;
}

isLoading.value = true;
passwordError.value = null;
try {
  await api.post('/admin/change-password', {
    current_password: password.value.current,
    new_password: password.value.new,
    new_password_confirmation: password.value.confirm,
  });
  toaster.success('Đổi mật khẩu thành công!');
  resetPasswordForm();
  document.querySelector('#changePasswordModal .btn-close').click();
} catch (error) {
  passwordError.value = error.response?.data?.message || 'Đổi mật khẩu thất bại!';
  toaster.error(passwordError.value);
  console.error('Lỗi khi đổi mật khẩu:', error);
} finally {
  isLoading.value = false;
}
};

const resetPasswordForm = () => {
password.value = {
  current: '',
  new: '',
  confirm: '',
};
passwordError.value = null;
};

onMounted(() => {
checkAuthentication();
});
</script>

<style scoped>
.avatar-container {
position: relative;
display: inline-block;
}
</style>