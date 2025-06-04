<template >
  <div class="container pt-3">
    <div class="card border-primary border-top border-3 border-0">
      <div class="card-header">
        <h5><b>QUẢN LÝ DÁNH GIÁ</b></h5>
      </div>
      <div class="card-body">
        <div class="table-reponse">
          <table class="table table-bordered">
			<thead class="bg-primary text-white fw-bold text-center">
				<tr>
					<td>
						ID
					</td>
					<td>Tên khách hàng</td>
					<td>Phòng</td>
					<td>Nội dung</td>
					<td>Số sao</td>
					<td>Tình trạng</td>
					<td>Hành động</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(value, index) in ListDanhGia" :key="index">
					<td>{{ value.id }}</td>
					<td>{{ value.khach_hang.ho_ten }}</td>
					<td>{{ value.phong.ten_phong }}</td>
					<td>{{ value.noi_dung }}</td>
					<td>{{ value.sao }}</td>
					<td><button v-if="value.tinh_trang == 1" @click="capNhat(value.id)"  class="btn btn-success">Hiện</button>
						<button v-else @click="capNhat(value.id)" class="btn btn-danger">Ẩn</button>
					</td>
					<td><button data-bs-toggle="modal" data-bs-target="#xoaModal" @click="Object.assign(xoa,value)"  class="btn btn-primary">Xóa</button></td>
					<div
    class="modal fade"
    id="xoaModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Xóa đánh giá
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2"
          >
            <div class="d-flex align-items-center">
              <div class="font-35 text-white">
                <i class="bx bxs-message-square-x"></i>
              </div>
              <div class="ms-3">
                <div class="text-white">
                  Bạn có chắc chắc chắn muốn xóa đánh giá của 
                  <b>{{ xoa.khach_hang?.ho_ten }}</b> này không?
                </div>
                <div class="text-white">
                  <b>Lưu ý:</b>Điều này không thể hoàn tác!!
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
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
            @click="xoaDanhGia()"
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
				</tr>
			</tbody>
		  </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseRequest from "../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "bottom-right", duration: 3000 });
export default {
  data() {
    return {
      ListDanhGia: [],
	  xoa: {},
      filters: {
        start_date: "",
        end_date: "",
        khach_hang_id: "",
        phong_id: "",
      },
    };
  },
  mounted() {
    this.fetchDanhGia();
  },
  methods: {
	xoaDanhGia() {
	  baseRequest
		.post("admin/xoa-danh-gia", {
		  id: this.xoa.id,
		})
		.then((response) => {
		  if(response.data.status == true) {
      toaster.success(response.data.message || "Xóa đánh giá thành công!");
		  this.fetchDanhGia(); // Cập nhật lại danh sách sau khi xóa
		}
      else {
      toaster.error(response.data.message || "Không thể xóa đánh giá này.");
      }
    }
  )
		.catch((error) => {
		  console.error("Lỗi khi xóa đánh giá:", error);
		  toaster.error("Có lỗi xảy ra khi xóa đánh giá.");
		});
	},
	capNhat(id) {
	  baseRequest
		.post("admin/cap-nhat-danh-gia", {
		  id: id,
		})
		.then((response) => {
		  if(response.data.status == true) {
      toaster.success(response.data.message || "Cập nhật tình trạng thành công!");
		  this.fetchDanhGia(); // Cập nhật lại danh sách sau khi cập nhật
		}
      else {
      toaster.error(response.data.message || "Không thể cập nhật tình trạng này.");
      }
    })
		.catch((error) => {
		  console.error("Lỗi khi cập nhật tình trạng:", error);
		  
		});
	},
    fetchDanhGia() {
      baseRequest
        .get("admin/danh-gia/data")
        .then((response) => {
          this.ListDanhGia = response.data;
          console.log(this.ListDanhGia);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách đánh giá:", error);
          toaster.error("Có lỗi xảy ra khi lấy danh sách đánh giá.");
        });
    },
  },
};
</script>
<style >
</style>