import React from "react";
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const Courses = React.lazy(() => import("./components/courses/Courses"));
const CreateCourse = React.lazy(() =>
  import("./components/courses/CreateCourse")
);
const CourseDetail = React.lazy(() =>
  import("./components/courses/CourseDetail")
);
const EditCourse = React.lazy(() =>
  import("./components/courses/EditCourse")
);
const Profile = React.lazy(() => import("./components/profile/profile"));

const routes = [
  { path: "/", exact: true, name: "Trang chủ" },
  { path: "/dashboard", name: "Trang chủ", component: Dashboard },
  { path: "/courses", exact: true, name: "Khoá học", component: Courses },
  {
    path: "/courses/add",
    exact: true,
    name: "Tạo khoá học",
    component: CreateCourse,
  },
  {
    path: "/courses/:courseId",
    exact: true,
    name: "Chi tiết khoá học",
    component: CourseDetail,
  },
  {
    path: "/courses/:courseId/edit",
    exact: true,
    name: "Chỉnh sửa khoá học",
    component: EditCourse,
  },
  {
    path: "/user-profile",
    exact: false,
    name: "profile",
    component: Profile,
  },
];

export default routes;
