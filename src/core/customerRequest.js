import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';
import { useUserStore } from '../stores/usesStore';

const apiUrl = 'http://127.0.0.1:8000/api/';
const toaster = createToaster({ position: 'top-right' });

// Tạo instance của Axios với URL cơ bản
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Interceptor để xử lý lỗi 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore();
      await userStore.logout();
      toaster.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  // Lấy header với token người dùng để xác thực
  getHeader() {
    const userStore = useUserStore();
    const token = userStore.token; // Lấy token từ user store
    if (!token) {
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  },

  // Yêu cầu GET
  get(url) {
    return axiosInstance.get(url, { headers: this.getHeader() }).catch((res) => {
      if (res.response?.data?.errors) {
        const result = Object.entries(res.response.data.errors);
        result.forEach((v) => {
          toaster.error(v[1][0]);
        });
      } else {
        toaster.error(res.response?.data?.message || 'Đã có lỗi xảy ra');
      }
      return Promise.reject(res);
    });
  },

  // Yêu cầu POST
  post(url, data) {
    return axiosInstance.post(url, data, { headers: this.getHeader() }).catch((res) => {
      if (res.response?.data?.errors) {
        const result = Object.entries(res.response.data.errors);
        result.forEach((v) => {
          toaster.error(v[1][0]);
        });
      } else {
        toaster.error(res.response?.data?.message || 'Đã có lỗi xảy ra');
      }
      return Promise.reject(res);
    });
  },

  // Yêu cầu DELETE
  delete(url) {
    return axiosInstance.delete(url, { headers: this.getHeader() }).catch((res) => {
      if (res.response?.data?.errors) {
        const result = Object.entries(res.response.data.errors);
        result.forEach((v) => {
          toaster.error(v[1][0]);
        });
      } else {
        toaster.error(res.response?.data?.message || 'Đã có lỗi xảy ra');
      }
      return Promise.reject(res);
    });
  },

  // Yêu cầu PUT
  put(url, data) {
    return axiosInstance.put(url, data, { headers: this.getHeader() }).catch((res) => {
      if (res.response?.data?.errors) {
        const result = Object.entries(res.response.data.errors);
        result.forEach((v) => {
          toaster.error(v[1][0]);
        });
      } else {
        toaster.error(res.response?.data?.message || 'Đã có lỗi xảy ra');
      }
      return Promise.reject(res);
    });
  },
};