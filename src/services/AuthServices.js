import { postAPI, getAPI, delAPI, postAPIConfig, putAPI } from "./index";

const target = "/api/auth/login";

const login = (data) => {
  return postAPI(target, data);
};

const logout = () => {
  return postAPI("/api/auth/logout", {});
};

const validateUser = () => {
  return getAPI("/api/auth/validate-user", {});
};

const registerTutor = (body) => {
  return postAPI("/api/auth/tutor/register", body);
};

const UpdateProfileTutor = (body) => {
  return putAPI("/api/teacher/profile", body);
};

const getProfileTutor = (body) => {
  return getAPI("/api/teacher/profile", body);
};

export default {
  login,
  logout,
  validateUser,
  registerTutor,
  UpdateProfileTutor,
  getProfileTutor,
};
