import { postAPI, getAPI } from "./index";

const CreateCourse = (data) => {
  return postAPI("/api/tutors/courses", data);
};

const GetAllCourse = () => {
  return getAPI("/api/tutors/courses");
};

const GetAllCourseOfTeacher = (page, limit) => {
  return getAPI(`/api/tutors/courses?page=${page}&limit=${limit}`);
};

const GetCourseDetailOfTeacher = (params) => {
  return getAPI(`/api/tutors/courses/${params}`);
};

const CreateLessonTitle = (params, data) => {
  return postAPI(`api/tutors/courses/${params}/lessons`, data);
};

const GetLessonTitle = (params) => {
  return getAPI(`api/tutors/courses/${params}/lessons`);
};

const CreateLessonSlide = (params, data) => {
  return postAPI(`api/tutors/courses/${params}/lesson-slide`, data);
};

const getLessonSlide = (params, data) => {
  return getAPI(`api/tutors/lessons/${params}/lesson-slide`);
};

const CreateLessonVideo = (params, data) => {
  return postAPI(`api/tutors/courses/${params}/lesson-video`, data);
};

const getLessonVideo = (params) => {
  return getAPI(`api/tutors/lessons/${params}/lesson-video`);
};

const ActionPublishCourse = (params, data) => {
  return postAPI(`api/tutors/courses/${params}/published`, data)
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
