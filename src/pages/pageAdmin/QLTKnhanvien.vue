<template>
	<div class="container-xxl pt-2">
		<div class="card">
			<div class="card-header">
				<h6>Quản lý tài khoản nhân viên</h6>
			</div>
			<div class="card-body">
				<div class="d-lg-flex justify-content-between mb-4">
					<div class="position-relative">
						<input type="text" class="form-control ps-5 radius-30" v-model="searchQuery" placeholder="Tìm nhân viên">
						<span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
					</div>
					<div class="d-flex">
						<button class="btn btn-success radius-30 mt-2 mt-lg-0 text-nowrap" data-bs-toggle="modal" data-bs-target="#exampleScrollableModal">
							<i class="bx bxs-plus-square"></i> Thêm nhân viên mới
						</button>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table mb-0 table-bordered">
						<thead class="bg-primary text-white text-center">
							<tr class="align-middle">
								<th>ID#</th>
								<th>Ảnh đại diện</th>
								<th>Tên nhân viên</th>
								<th>Email</th>
								<th>Số điện thoại</th>
								<th>Chức vụ</th>
								<th>Homestay đang làm việc</th>
								<th>Tình trạng</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<template v-for="(employee, index) in filteredEmployees" :key="index">
								<tr class="align-middle">
									<td>
										<div class="ms-2">
											<h6 class="mb-0 font-14">{{ employee.id }}</h6>
										</div>
									</td>
									<td><img :src="`http://127.0.0.1:8000/storage/`+employee.avatar" class="" style="height:100px;width:100px; object-fit:cover" alt="" @error="handleImageError" /></td>
									<td>{{ employee.ho_ten }}</td>
									<td>{{ employee.email }}</td>
									<td>{{ employee.so_dien_thoai }}</td>
									<td>{{ employee.ten_chuc_vu }}</td>
									<td class="description">{{ employee.ten_homestay }}</td>
									<td>
										<span v-if="employee.is_block == 0" class="badge rounded-pill text-success bg-light-success p-2">
											<i class="bx bxs-circle me-1"></i>
											Hoạt động
										</span>
										<span v-else class="badge rounded-pill text-danger bg-light-danger p-2">
											<i class="bx bxs-circle me-1"></i>
											Khóa
										</span>
									</td>
									<td>
										<div class="d-flex order-actions">
											<a @click="Object.assign(selectedEmployee, employee)" data-bs-toggle="modal" data-bs-target="#suaScrollableModal" class=""><i class="bx bxs-edit"></i></a>
											<a href="javascript:;" data-bs-toggle="modal" data-bs-target="#deleteModal" class="ms-3" @click="Object.assign(xoaNV, employee)"><i class="bx bxs-trash"></i></a>
										</div>
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Thêm nhân viên -->
	<div class="modal fade" id="exampleScrollableModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Thêm nhân viên mới</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div>
						<label class="mt-2">Tên nhân viên</label>
						<input type="text" class="form-control" v-model="newEmployee.ho_ten" placeholder="Nhập tên nhân viên">
						<label class="mt-2">Ngày sinh</label>
						<input type="date" class="form-control" v-model="newEmployee.ngay_sinh">
						<label class="mt-2">Giới tính</label>
						<select class="form-select" v-model="newEmployee.gioi_tinh">
							<option value="" disabled>Chọn giới tính</option>
							<option value="0">Nam</option>
							<option value="1">Nữ</option>
							<option value="2">Khác</option>
						</select>
						<label class="mt-2">Email</label>
						<input type="email" class="form-control" v-model="newEmployee.email" placeholder="Nhập email" autocomplete="off">
						<label class="mt-2">Số điện thoại</label>
						<input type="text" class="form-control" v-model="newEmployee.so_dien_thoai" placeholder="Nhập số điện thoại">
						<label class="mt-2">Mật khẩu</label>
						<input type="password" class="form-control" v-model="newEmployee.password" placeholder="Nhập mật khẩu" autocomplete="off">
						<label class="mt-2">Chức vụ</label>
						<select class="form-select" v-model="newEmployee.id_chuc_vu" aria-label="Default select example">
							<option value="" disabled>Chọn chức vụ</option>
							<option v-for="chucvu in listChucVu" :key="chucvu.id" :value="chucvu.id">{{ chucvu.ten_chuc_vu }}</option>
						</select>
						<label class="mt-2">Homestay đang làm việc</label>
						<select class="form-select" v-model="newEmployee.id_homestay" aria-label="Default select example">
							<option value="" disabled>Chọn homestay</option>
							<option v-for="homestay in listHomestays" :key="homestay.id" :value="homestay.id">{{ homestay.ten_homestay }}</option>
						</select>
						<label class="mt-2">Tình trạng</label>
						<select class="form-select" v-model="newEmployee.is_block" aria-label="Default select example">
							<option value="" disabled>Chọn tình trạng</option>
							<option value="0">Hoạt động</option>
							<option value="1">Nghỉ việc</option>
						</select>
						<label class="mt-2">URL ảnh đại diện</label>
						<input type="url" class="form-control" v-model="newEmployee.avatar_url" placeholder="Nhập URL ảnh (https://...)">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
					<button type="button" class="btn btn-primary" @click="addEmployee" :disabled="isAdding">Thêm</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Sửa nhân viên -->
	<div class="modal fade" id="suaScrollableModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Sửa thông tin nhân viên</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div>
						<label class="mt-2">Tên nhân viên</label>
						<input type="text" class="form-control" v-model="selectedEmployee.ho_ten" placeholder="Nhập tên nhân viên">
						<label class="mt-2">Ngày sinh</label>
						<input type="date" class="form-control" v-model="selectedEmployee.ngay_sinh">
						<label class="mt-2">Giới tính</label>
						<select class="form-select" v-model="selectedEmployee.gioi_tinh">
							<option value="" disabled>Chọn giới tính</option>
							<option value="0">Nam</option>
							<option value="1">Nữ</option>
							<option value="2">Khác</option>
						</select>
						<label class="mt-2">Email</label>
						<input type="email" class="form-control" v-model="selectedEmployee.email" placeholder="Nhập email" autocomplete="off">
						<label class="mt-2">Số điện thoại</label>
						<input type="text" class="form-control" v-model="selectedEmployee.so_dien_thoai" placeholder="Nhập số điện thoại">
						<label class="mt-2">Mật khẩu (để trống nếu không thay đổi)</label>
						<input type="password" class="form-control" v-model="selectedEmployee.password" placeholder="Nhập mật khẩu mới" autocomplete="off">
						<label class="mt-2">Chức vụ</label>
						<select class="form-select" v-model="selectedEmployee.id_chuc_vu" aria-label="Default select example">
							<option value="" disabled>Chọn chức vụ</option>
							<option v-for="chucvu in listChucVu" :key="chucvu.id" :value="chucvu.id">{{ chucvu.ten_chuc_vu }}</option>
						</select>
						<label class="mt-2">Homestay đang làm việc</label>
						<select class="form-select" v-model="selectedEmployee.id_homestay" aria-label="Default select example">
							<option value="" disabled>Chọn homestay</option>
							<option v-for="homestay in listHomestays" :key="homestay.id" :value="homestay.id">{{ homestay.ten_homestay }}</option>
						</select>
						<label class="mt-2">Tình trạng</label>
						<select class="form-select" v-model="selectedEmployee.is_block" aria-label="Default select example">
							<option value="" disabled>Chọn tình trạng</option>
							<option value="0">Hoạt động</option>
							<option value="1">Nghỉ việc</option>
						</select>
						<label class="mt-2">URL ảnh đại diện</label>
						<input type="url" class="form-control" v-model="selectedEmployee.avatar_url" placeholder="Nhập URL ảnh (https://...)">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveEmployee" :disabled="isSaving">Lưu</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal Xóa nhân viên -->
	<div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header bg-danger">
					<h5 class="modal-title text-white"><b>Xóa nhân viên</b></h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-danger" role="alert">
						Bạn có chắc chắn muốn xóa nhân viên <strong>{{ xoaNV.ho_ten }}</strong>?
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
					<button type="button" class="btn btn-danger" @click="deleteNV" data-bs-dismiss="modal">Xác nhận</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { createToaster } from '@meforma/vue-toaster';
import baseRequest from '../../core/baseRequest';
const toaster = createToaster({
	position: 'bottom-right',
	duration: 3000,
});

export default {
	name: 'EmployeeManagement',
	data() {
		return {
			xoaNV: {},
			searchQuery: '',
			listEmployees: [],
			listHomestays: [],
			listChucVu: [],
			isAdding: false,
			isSaving: false,
			selectedEmployee: {
				id: '',
				ho_ten: '',
				ngay_sinh: '',
				gioi_tinh: null,
				so_dien_thoai: '',
				email: '',
				avatar_url: '',
				password: '',
				is_block: null,
				id_chuc_vu: null,
				id_homestay: null,
			},
			newEmployee: {
				ho_ten: '',
				ngay_sinh: '',
				gioi_tinh: null,
				so_dien_thoai: '',
				email: '',
				password: '',
				avatar_url: '',
				is_block: null,
				id_chuc_vu: null,
				id_homestay: null,
			}
		};
	},
	computed: {
		filteredEmployees() {
			if (!this.searchQuery) {
				return this.listEmployees;
			}
			const query = this.searchQuery.toLowerCase();
			return this.listEmployees.filter(employee =>
				employee.ho_ten.toLowerCase().includes(query) ||
				employee.email.toLowerCase().includes(query) ||
				employee.so_dien_thoai.toLowerCase().includes(query) ||
				employee.ten_homestay.toLowerCase().includes(query)
			);
		}
	},
	mounted() {
		this.getData();
		this.getHomestays();
		this.getChucVu();
	},
	methods: {
		handleImageError(event) {
			event.target.src = 'https://via.placeholder.com/100?text=No+Image';
		},
		getData() {
			baseRequest
				.get('/admin/nhan-vien/data')
				.then((response) => {
					if (response.data.status === false) {
						toaster.error(response.data.message);
						return;
					}
					this.listEmployees = response.data.nhan_vien;
				})
				.catch((error) => {
					console.error('Lấy dữ liệu nhân viên thất bại', error);
					toaster.error('Lấy dữ liệu nhân viên thất bại');
				});
		},
		getHomestays() {
			baseRequest
				.get('/admin/homestay/data')
				.then((response) => {
					this.listHomestays = response.data;
				})
				.catch((error) => {
					console.error('Lấy dữ liệu homestay thất bại', error);
					toaster.error('Lấy dữ liệu homestay thất bại');
				});
		},
		getChucVu() {
			baseRequest
				.get('/admin/chuc-vu/data')
				.then((response) => {
					this.listChucVu = response.data;
				})
				.catch((error) => {
					console.error('Lấy dữ liệu chức vụ thất bại', error);
					toaster.error('Lấy dữ liệu chức vụ thất bại');
				});
		},
		addEmployee() {
			if (!this.validateNewEmployee()) return;
			this.isAdding = true;
			const formData = new FormData();
			formData.append('ho_ten', this.newEmployee.ho_ten);
			formData.append('ngay_sinh', this.newEmployee.ngay_sinh);
			formData.append('gioi_tinh', this.newEmployee.gioi_tinh);
			formData.append('email', this.newEmployee.email);
			formData.append('so_dien_thoai', this.newEmployee.so_dien_thoai);
			formData.append('password', this.newEmployee.password);
			formData.append('id_chuc_vu', this.newEmployee.id_chuc_vu);
			formData.append('id_homestay', this.newEmployee.id_homestay);
			formData.append('is_block', this.newEmployee.is_block);
			if (this.newEmployee.avatar_url) {
				formData.append('avatar_url', this.newEmployee.avatar_url);
			}

			baseRequest
				.post('/admin/nhan-vien/them', formData)
				.then((response) => {
					if (response.data.status === false) {
						toaster.error(response.data.message);
						return;
					}
					this.listEmployees.push(response.data.nhan_vien);
					this.newEmployee = {
						ho_ten: '',
						ngay_sinh: '',
						gioi_tinh: null,
						so_dien_thoai: '',
						email: '',
						password: '',
						avatar_url: '',
						is_block: null,
						id_chuc_vu: null,
						id_homestay: null
					};
					this.getData();
					toaster.success('Thêm nhân viên thành công');
					document.querySelector('#exampleScrollableModal .btn-close').click();
				})
				.catch((error) => {
					console.error('Thêm nhân viên thất bại', error);
					toaster.error(error.response?.data?.message || 'Thêm nhân viên thất bại');
				})
				.finally(() => {
					this.isAdding = false;
				});
		},
		saveEmployee() {
			if (!this.validateSelectedEmployee()) return;
			this.isSaving = true;
			const formData = new FormData();
			formData.append('id', this.selectedEmployee.id);
			formData.append('ho_ten', this.selectedEmployee.ho_ten);
			formData.append('ngay_sinh', this.selectedEmployee.ngay_sinh);
			formData.append('gioi_tinh', this.selectedEmployee.gioi_tinh);
			formData.append('email', this.selectedEmployee.email);
			formData.append('so_dien_thoai', this.selectedEmployee.so_dien_thoai);
			if (this.selectedEmployee.password) {
				formData.append('password', this.selectedEmployee.password);
			}
			formData.append('id_chuc_vu', this.selectedEmployee.id_chuc_vu);
			formData.append('id_homestay', this.selectedEmployee.id_homestay);
			formData.append('is_block', this.selectedEmployee.is_block);
			if (this.selectedEmployee.avatar_url) {
				formData.append('avatar_url', this.selectedEmployee.avatar_url);
			}

			baseRequest
				.post('/admin/nhan-vien/sua', formData)
				.then((response) => {
					if (response.data.status === false) {
						toaster.error(response.data.message);
						return;
					}
					this.getData();
					toaster.success('Cập nhật nhân viên thành công');
				})
				.catch((error) => {
					console.error('Cập nhật nhân viên thất bại', error);
					toaster.error(error.response?.data?.message || 'Cập nhật nhân viên thất bại');
				})
				.finally(() => {
					this.isSaving = false;
				});
		},
		deleteNV() {
			baseRequest
				.post('/admin/nhan-vien/xoa', this.xoaNV)
				.then((response) => {
					if (response.data.status === false) {
						toaster.error(response.data.message);
						return;
					}
					this.getData();
					toaster.success('Xóa nhân viên thành công');
				})
				.catch((error) => {
					console.error('Xóa nhân viên thất bại', error);
					toaster.error(error.response?.data?.message || 'Xóa nhân viên thất bại');
				});
		},
		validateNewEmployee() {
			if (!this.newEmployee.ho_ten.trim()) {
				toaster.error('Tên nhân viên là bắt buộc');
				return false;
			}
			if (!this.newEmployee.email || !/\S+@\S+\.\S+/.test(this.newEmployee.email)) {
				toaster.error('Email không hợp lệ');
				return false;
			}
			if (!this.newEmployee.so_dien_thoai || !/^\+?\d{9,15}$/.test(this.newEmployee.so_dien_thoai)) {
				toaster.error('Số điện thoại không hợp lệ');
				return false;
			}
			if (!this.newEmployee.password || this.newEmployee.password.length < 6) {
				toaster.error('Mật khẩu phải có ít nhất 6 ký tự');
				return false;
			}
			if (this.newEmployee.avatar_url && !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(this.newEmployee.avatar_url)) {
				toaster.error('URL ảnh không hợp lệ (phải là png, jpg, jpeg, hoặc gif)');
				return false;
			}
			if (!this.newEmployee.id_chuc_vu) {
				toaster.error('Vui lòng chọn chức vụ');
				return false;
			}
			if (!this.newEmployee.id_homestay) {
				toaster.error('Vui lòng chọn homestay');
				return false;
			}
			if (this.newEmployee.is_block === null) {
				toaster.error('Vui lòng chọn tình trạng');
				return false;
			}
			return true;
		},
		validateSelectedEmployee() {
			if (!this.selectedEmployee.ho_ten.trim()) {
				toaster.error('Tên nhân viên là bắt buộc');
				return false;
			}
			if (!this.selectedEmployee.email || !/\S+@\S+\.\S+/.test(this.selectedEmployee.email)) {
				toaster.error('Email không hợp lệ');
				return false;
			}
			if (!this.selectedEmployee.so_dien_thoai || !/^\+?\d{9,15}$/.test(this.selectedEmployee.so_dien_thoai)) {
				toaster.error('Số điện thoại không hợp lệ');
				return false;
			}
			if (this.selectedEmployee.password && this.selectedEmployee.password.length < 6) {
				toaster.error('Mật khẩu mới phải có ít nhất 6 ký tự');
				return false;
			}
			if (this.selectedEmployee.avatar_url && !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(this.selectedEmployee.avatar_url)) {
				toaster.error('URL ảnh không hợp lệ (phải là png, jpg, jpeg, hoặc gif)');
				return false;
			}
			if (!this.selectedEmployee.id_chuc_vu) {
				toaster.error('Vui lòng chọn chức vụ');
				return false;
			}
			if (!this.selectedEmployee.id_homestay) {
				toaster.error('Vui lòng chọn homestay');
				return false;
			}
			if (this.selectedEmployee.is_block === null) {
				toaster.error('Vui lòng chọn tình trạng');
				return false;
			}
			return true;
		}
	}
};
</script>

<style scoped>
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
.position-relative .form-control {
	border: 1px solid #d1e7ff;
	border-radius: 30px;
	padding-left: 40px;
}
.position-relative .bx-search {
	color: #6c757d;
	font-size: 18px;
}
.description {
	white-space: normal;
	max-width: 200px;
}
</style>