import HomestayDetail from "../pages/pageUser/HomestayDetail.vue";

export default [
  {
    path: "/",
    component: () => import("../layouts/LayoutUser/index.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../pages/PageUser/Home.vue"),
      },
      {
        path: "kich-hoat-email/:hash",
        name: "Active",
        component: () => import("../pages/PageUser/Active.vue"),
      },
      {
        path: "",
        redirect: { name: "Home" },
      },
      {
        path: "post",
        name: "Post",
        component: () => import("../pages/PageUser/Post.vue"),
      },
      {
        path: "homestaydetail",
        name: "HomestayDetail",
        component: () => import("../pages/pageUser/HomestayDetail.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../pages/pageUser/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("../pages/pageUser/Register.vue"),
      },
      {
        path: '/bai-viet/:id',
        name: 'ChiTietBaiViet',
        component: ()=> import("../pages/PageUser/PostDetails.vue"),
        props: true
      },
      {
        path: '/chitietdatphong/:id',
        name: 'ChiTietDatPhong',
        component: ()=> import("../pages/PageUser/ChiTietDatPhong.vue"),
        props: true
      },
      {
        path: '/thanh-toan/:id',
        name: 'ThanhToan',
        component: () => import('../pages/PageUser/ThanhToan.vue'),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../pages/pageUser/Profile.vue"), 
      },
      {
        path: "search",
        name: "Search",
        component: () => import("../pages/pageUser/SearchHomestay.vue"), 
      },
      {
        path: '/homestay/:id',
        name: 'HomestayDetail',
        component: () => import("../pages/pageUser/HomestayDetail.vue"),
        props: true,
        
      },
      {
        path: "quenmk",
        name: "QuenMatKhau",
        component: () => import("../pages/pageUser/QuenMK.vue"),
      },

      {
        path:"dat-lai-mat-khau/:hash",
        name:"resetpassword",
        component:()=>import("../pages/PageUser/ResetPassword.vue")
      },
      {
        path: "about",
        name: "About",
        component: () => import("../pages/pageUser/About.vue"),
      },
      {
        path: "bookingdetail",
        name: "BookingDetail",
        component: () => import("../pages/pageUser/BookingDetails.vue"),
      },
      {
        path:"lienhe",
        name:"LienHe",
        component:()=>import("../pages/pageUser/LienHe.vue")
      }
      
    ],
  },
];
