import { postAPI, getAPI } from "./index";

const CreateCourse = (data) => {
  return postAPI("/api/teacher/courses", data);
};

const GetAllCourse = () => {
  return getAPI("/api/teacher/courses");
};

const GetAllCourseOfTeacher = (page, limit) => {
  return getAPI(`/api/teacher/courses?page=${page}&limit=${limit}`);
};

const GetCourseDetailOfTeacher = (params) => {
  return getAPI(`/api/teacher/courses/${params}`);
};

const CreateLessonTitle = (params, data) => {
  return postAPI(`api/teacher/courses/${params}/lessons`, data);
};

const GetLessonTitle = (params) => {
  return getAPI(`api/teacher/courses/${params}/lessons`);
};

const CreateLessonSlide = (params, data) => {
  return postAPI(`api/teacher/courses/${params}/lesson-slide`, data);
};

const getLessonSlide = (params, data) => {
  return getAPI(`api/teacher/lessons/${params}/lesson-slide`);
};

const CreateLessonVideo = (params, data) => {
  return postAPI(`api/teacher/courses/${params}/lesson-video`, data);
};

const getLessonVideo = (params) => {
  return getAPI(`api/teacher/lessons/${params}/lesson-video`);
};

const ActionPublishCourse = (params, data) => {
  return postAPI(`api/teacher/courses/${params}`, data)
}

export default {
  CreateCourse,
  GetAllCourseOfTeacher,
  GetCourseDetailOfTeacher,
  CreateLessonTitle,
  CreateLessonSlide,
  CreateLessonVideo,
  GetLessonTitle,
  getLessonSlide,
  getLessonVideo,
  ActionPublishCourse
};
