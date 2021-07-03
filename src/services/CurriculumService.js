import { postAPI, getAPI } from './index';

const GetCurriculumsTutor = () => {
  return getAPI('/api/teacher/categories');
}

export default {
    GetCurriculumsTutor,
};
