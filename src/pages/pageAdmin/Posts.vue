<template>
  <div class="container pt-3">
    <div class="card border-primary border-top border-3 border-0">
      <div class="card-header d-flex justify-content-between">
        <h5 class="m-2 pt-2">Quản lý bài viết</h5>
        <button
          class="btn btn-success radius-10 text-nowrap"
          data-bs-toggle="modal"
          data-bs-target="#exampleScrollableModal"
        >
          <i class="bx bxs-plus-square"></i> Thêm
        </button>
      </div>
      <div class="position-relative mt-2">
        <input
          type="text"
          class="form-control ps-5 radius-30"
          v-model="tuKhoaTimKiem"
          placeholder="Tìm bài viết"
        />
        <span class="position-absolute top-50 product-show translate-middle-y">
          <i class="bx bx-search"></i>
        </span>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table mb-0 table-bordered table-hover">
            <thead class="bg-primary text-white text-center">
              <tr class="align-middle">
                <th>ID#</th>
                <th>Ảnh</th>
                <th>Tiêu đề</th>
                <th>Ngày đăng</th>
                <th>Tình trạng</th>
                <th>Chi Tiết</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(baiViet, index) in danhSachLoc" :key="index">
                <tr class="align-middle">
                  <td>
                    <div class="ms-2">
                      <h6 class="mb-0 font-14">{{ baiViet.id }}</h6>
                    </div>
                  </td>
                  <td>
                    <img
                      :src="baiViet.image || 'https://via.placeholder.com/50'"
                      alt="Ảnh bài viết"
                      style="width: 50px; height: 50px; object-fit: cover"
                    />
                  </td>
                  <td>{{ baiViet.tieu_de }}</td>
                  <td>{{ dinhDangNgay(baiViet.ngay_tao) }}</td>
                  <td>
                    <span
                      v-if="baiViet.tinh_trang == 1"
                      class="badge rounded-pill text-success bg-light-success p-2"
                    >
                      <i class="bx bxs-circle me-1"></i>
                      Công khai
                    </span>
                    <span
                      v-else
                      class="badge rounded-pill text-danger bg-light-danger p-2"
                    >
                      <i class="bx bxs-circle me-1"></i>
                      Nháp
                    </span>
                  </td>
                  <td>
                    <a
                      class=""
                      @click="xemChiTiet(baiViet)"
                      data-bs-toggle="modal"
                      data-bs-target="#chiTietModal"
                    >
                      Xem chi tiết
                    </a>
                  </td>
                  <td>
                    <div class="d-flex order-actions">
                      <button
                        @click="suaBaiViet(baiViet)"
                        data-bs-toggle="modal"
                        data-bs-target="#suaScrollableModal"
                        class="btn text-warning"
                      >
                        <i class="bx bxs-edit"></i>
                      </button>
                      <button
                        class="btn text-danger"
                        @click="Object.assign(baiVietXoa, baiViet)"
                        data-bs-toggle="modal"
                        data-bs-target="#xoaModal"
                      >
                        <i class="bx bxs-trash"></i>
                      </button>
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
  <!-- Modal Xóa -->
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
            Xóa bài viết
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
                  Bạn có chắc chắn muốn xóa bài viết
                  <b>{{ baiVietXoa.tieu_de }}</b> này không?
                </div>
                <div class="text-white">
                  <b>Lưu ý:</b> Điều này không thể hoàn tác!!
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
            @click="xoaBaiViet()"
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Thêm bài viết -->
  <div
    class="modal fade"
    id="exampleScrollableModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary text-center">
          <h5 class="modal-title text-white">Thêm bài viết mới</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <div class="row">
              <div class="col-md-6">
                <label class="mt-2">Tiêu đề</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="baiVietMoi.tieu_de"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div class="col-md-6">
                <label class="mt-2">URL ảnh chính</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="baiVietMoi.image"
                  placeholder="Nhập URL ảnh"
                />
                <img
                  v-if="baiVietMoi.image"
                  :src="baiVietMoi.image"
                  alt="Preview"
                  style="
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    margin-top: 10px;
                  "
                />
              </div>
            </div>
            <label class="mt-2">Nội dung</label>
            <div id="newPostEditor" class="editor-container"></div>
            <label class="mt-2">Tình trạng</label>
            <select
              class="form-select"
              v-model="baiVietMoi.tinh_trang"
              aria-label="Default select example"
            >
              <option value="" disabled>Chọn tình trạng</option>
              <option value="1">Công khai</option>
              <option value="0">Nháp</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Thoát
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="themBaiViet"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Sửa bài viết -->
  <div
    class="modal fade"
    id="suaScrollableModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sửa thông tin bài viết</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <label class="mt-2">Tiêu đề</label>
            <input
              type="text"
              class="form-control"
              v-model="baiVietChon.tieu_de"
              placeholder="Nhập tiêu đề bài viết"
            />
            <label class="mt-2">URL ảnh chính</label>
            <input
              type="text"
              class="form-control"
              v-model="baiVietChon.image"
              placeholder="Nhập URL ảnh"
            />
            <img
              v-if="baiVietChon.image"
              :src="baiVietChon.image"
              alt="Preview"
              style="
                width: 100px;
                height: 100px;
                object-fit: cover;
                margin-top: 10px;
              "
            />
            <label class="mt-2">Nội dung</label>
            <div id="editPostEditor" class="editor-container"></div>
            <label class="mt-2">Tình trạng</label>
            <select
              class="form-select"
              v-model="baiVietChon.tinh_trang"
              aria-label="Default select example"
            >
              <option value="" disabled>Chọn tình trạng</option>
              <option value="1">Công khai</option>
              <option value="0">Nháp</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Thoát
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="luuBaiViet"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Xem chi tiết bài viết -->
  <div class="modal fade" id="chiTietModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chi tiết bài viết</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="baiVietChiTiet">
            <div class="row">
              <div class="col-lg-6">
                <h6>Tiêu đề: {{ baiVietChiTiet.tieu_de }}</h6>
                <p>
                  <strong>Ngày tạo:</strong>
                  {{ dinhDangNgay(baiVietChiTiet.ngay_tao) }}
                </p>
                <p>
                  <strong>Tình trạng:</strong>
                  {{ baiVietChiTiet.tinh_trang === 1 ? "Công khai" : "Nháp" }}
                </p>
                <p>
                  <strong>Người đăng:</strong>
                  {{ baiVietChiTiet.id_nguoi_dang ?? "N/A" }}
                </p>
              </div>
              <div class="col-lg-6">
                <div v-if="baiVietChiTiet.image">
                  <p><strong>Ảnh chính:</strong></p>
                  <img
                    :src="baiVietChiTiet.image"
                    alt="Ảnh bài viết"
                    style="width: 100px; height: 100px; object-fit: cover"
                  />
                </div>
              </div>
            </div>
            <hr />
            <h6>Nội dung:</h6>
            <div
              v-html="baiVietChiTiet.noi_dung"
              class="noi-dung-chi-tiet"
            ></div>
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
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import baseRequest from "../../core/baseRequest";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  position: "bottom-right",
  duration: 3000,
});

Quill.register("modules/imageResize", ImageResize);

export default {
  name: "QuanLyBaiViet",
  data() {
    return {
      tuKhoaTimKiem: "",
      trinhSoanThaoMoi: null,
      trinhSoanThaoSua: null,
      danhSachBaiViet: [],
      baiVietXoa: {},
      baiVietChon: {
        id: null,
        tieu_de: "",
        noi_dung: "",
        ngay_tao: "",
        tinh_trang: "",
        id_nguoi_dang: "",
        image: "",
      },
      baiVietMoi: {
        tieu_de: "",
        noi_dung: "",
        tinh_trang: "",
        image: "",
      },
      baiVietChiTiet: null,
      urlBackend: "http://127.0.0.1:8000",
    };
  },
  computed: {
    danhSachLoc() {
      if (!this.tuKhoaTimKiem) {
        return this.danhSachBaiViet;
      }
      const tuKhoa = this.tuKhoaTimKiem.toLowerCase();
      return this.danhSachBaiViet.filter((baiViet) => {
        const noiDungVanBan = this.loaiBoHtml(baiViet.noi_dung).toLowerCase();
        return (
          baiViet.tieu_de.toLowerCase().includes(tuKhoa) ||
          noiDungVanBan.includes(tuKhoa)
        );
      });
    },
  },
  methods: {
    khoiTaoTrinhSoanThao() {
      this.trinhSoanThaoMoi = new Quill("#newPostEditor", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize"],
          },
        },
      });
      this.trinhSoanThaoSua = new Quill("#editPostEditor", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize"],
          },
        },
      });
      this.trinhSoanThaoMoi.on("text-change", () => {
        this.baiVietMoi.noi_dung = this.trinhSoanThaoMoi.root.innerHTML;
      });
      this.trinhSoanThaoSua.on("text-change", () => {
        this.baiVietChon.noi_dung = this.trinhSoanThaoSua.root.innerHTML;
      });
      this.themXuLyAnh(this.trinhSoanThaoMoi);
      this.themXuLyAnh(this.trinhSoanThaoSua);
    },
    themXuLyAnh(quill) {
      const thanhCongCu = quill.getModule("toolbar");
      thanhCongCu.addHandler("image", () => {
        const url = prompt("Nhập URL ảnh:");
        if (url) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", url);
          const [blot] = quill.getLine(range.index);
          if (blot && blot.domNode) {
            blot.domNode.classList.add("img-fluid");
          }
        }
      });
    },
    themLopImgFluid(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const elements = doc.querySelectorAll("*");
      elements.forEach((el) => {
        if (el.tagName !== "IMG" && el.classList.contains("img-fluid")) {
          el.classList.remove("img-fluid"); // Xóa img-fluid khỏi các thẻ không phải img
        }
        if (el.tagName === "IMG") {
          el.removeAttribute("style"); // Xóa inline styles
          el.classList.remove("img-fluid");
          el.classList.add("img-fluid");
          el.setAttribute("loading", "lazy");
        }
      });
      return doc.body.innerHTML;
    },
    layDanhSachBaiViet() {
      baseRequest
        .get("bai_viets/lay-danh-sach")
        .then((response) => {
          this.danhSachBaiViet = response.data.map((baiViet) => ({
            ...baiViet,
            noi_dung: this.themLopImgFluid(baiViet.noi_dung),
          }));
        })
        .catch((error) => {
          toaster.error(
            "Lỗi khi tải danh sách bài viết: " +
              (error.message || "Lỗi không xác định")
          );
          console.error("Lỗi tải danh sách bài viết:", error);
        });
    },
    async themBaiViet() {
      if (
        !this.baiVietMoi.tieu_de ||
        !this.baiVietMoi.noi_dung ||
        !this.baiVietMoi.tinh_trang
      ) {
        toaster.error("Vui lòng nhập đầy đủ tiêu đề, nội dung và tình trạng!");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("tieu_de", this.baiVietMoi.tieu_de);
        formData.append("noi_dung", this.baiVietMoi.noi_dung);
        formData.append("tinh_trang", this.baiVietMoi.tinh_trang);
        if (this.baiVietMoi.image) {
          formData.append("image", this.baiVietMoi.image);
        }

        const response = await baseRequest.post(
          "/admin/bai_viets/them-moi",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.data.status === false) {
          toaster.error(response.data.message);
          return;
        }
        this.danhSachBaiViet.push({
          ...response.data.du_lieu,
          noi_dung: this.themLopImgFluid(response.data.du_lieu.noi_dung),
          ngay_tao: response.data.du_lieu.ngay_tao,
        });
        this.baiVietMoi = {
          tieu_de: "",
          noi_dung: "",
          tinh_trang: "",
          image: "",
        };
        this.trinhSoanThaoMoi.setContents([]);
        this.layDanhSachBaiViet();
        toaster.success("Thêm bài viết thành công!");
      } catch (error) {
        const thongBao =
          error.response?.data?.thong_bao ||
          error.message ||
          "Lỗi không xác định";
        const loi = error.response?.data?.loi
          ? Object.values(error.response.data.loi).flat().join(", ")
          : "";
        toaster.error(
          `Thêm bài viết thất bại: ${thongBao}${loi ? " - " + loi : ""}`
        );
        console.error("Lỗi khi thêm bài viết:", error);
      }
    },
    suaBaiViet(baiViet) {
      this.baiVietChon = {
        ...baiViet,
        noi_dung: this.themLopImgFluid(baiViet.noi_dung),
        image: baiViet.image || "",
      };
      this.$nextTick(() => {
        this.trinhSoanThaoSua.setContents([]);
        this.trinhSoanThaoSua.clipboard.dangerouslyPasteHTML(
          this.baiVietChon.noi_dung || ""
        );
      });
    },
    async luuBaiViet() {
      if (
        !this.baiVietChon.tieu_de ||
        !this.baiVietChon.noi_dung ||
        !this.baiVietChon.tinh_trang
      ) {
        toaster.error("Vui lòng nhập đầy đủ tiêu đề, nội dung và tình trạng!");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("id", this.baiVietChon.id);
        formData.append("tieu_de", this.baiVietChon.tieu_de);
        formData.append("noi_dung", this.baiVietChon.noi_dung);
        formData.append("tinh_trang", this.baiVietChon.tinh_trang);
        if (this.baiVietChon.image) {
          formData.append("image", this.baiVietChon.image);
        }

        const response = await baseRequest.post(
          "/admin/bai_viets/cap-nhat",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const index = this.danhSachBaiViet.findIndex(
          (p) => p.id === this.baiVietChon.id
        );
        if (index !== -1) {
          this.danhSachBaiViet.splice(index, 1, {
            ...response.data.du_lieu,
            noi_dung: this.themLopImgFluid(response.data.du_lieu.noi_dung),
          });
        }
        this.baiVietChon = {
          id: null,
          tieu_de: "",
          noi_dung: "",
          ngay_tao: "",
          tinh_trang: "",
          id_nguoi_dang: "",
          image: "",
        };
        this.trinhSoanThaoSua.setContents([]);
        this.layDanhSachBaiViet();
        toaster.success("Cập nhật bài viết thành công!");
      } catch (error) {
        const thongBao =
          error.response?.data?.thong_bao ||
          error.message ||
          "Lỗi không xác định";
        const loi = error.response?.data?.loi
          ? Object.values(error.response.data.loi).flat().join(", ")
          : "";
        toaster.error(
          `Cập nhật bài viết thất bại: ${thongBao}${loi ? " - " + loi : ""}`
        );
        console.error("Lỗi khi cập nhật bài viết:", error);
      }
    },
    xoaBaiViet() {
      baseRequest
        .post("/admin/bai_viets/xoa", this.baiVietXoa)
        .then(() => {
          this.danhSachBaiViet = this.danhSachBaiViet.filter(
            (baiViet) => baiViet.id !== this.baiVietXoa.id
          );
          toaster.success("Xóa bài viết thành công!");
        })
        .catch((error) => {
          toaster.error(
            "Lỗi khi xóa bài viết: " + (error.message || "Lỗi không xác định")
          );
          console.error("Lỗi xóa bài viết:", error);
        });
    },
    xemChiTiet(baiViet) {
      console.log('Nội dung HTML:', baiViet.noi_dung); // In để kiểm tra
      this.baiVietChiTiet = {
        ...baiViet,
        noi_dung: this.themLopImgFluid(baiViet.noi_dung),
      };
    },
    loaiBoHtml(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    },
    dinhDangNgay(ngay) {
      const d = new Date(ngay);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
    },
  },
  mounted() {
    this.khoiTaoTrinhSoanThao();
    this.layDanhSachBaiViet();
    this.$nextTick(() => {
      const images = document.querySelectorAll('.noi-dung-chi-tiet img');
      images.forEach(img => {
        img.addEventListener('error', () => {
          img.src = 'https://via.placeholder.com/100';
          img.alt = 'Hình ảnh không tải được';
          img.classList.add('img-fluid');
        });
      });
    });
  },
};
</script>

<style scoped>
.noi-dung-chi-tiet {
  max-width: 100%;
}
.noi-dung-chi-tiet img {
  display: block;
}
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
.editor-container {
  min-height: 300px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
.editor-container .ql-editor {
  min-height: 250px;
}
.modal-fullscreen .modal-content {
  height: 100vh;
}
.modal-fullscreen .modal-body {
  padding: 2rem;
}
.modal-fullscreen .form-control,
.modal-fullscreen .form-select {
  max-width: 100%;
}
</style>