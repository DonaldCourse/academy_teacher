import { postAPI, getAPI } from './index';

const GetCurriculumsTutor = () => {
  return getAPI('/api/tutors/curriculums');
}

export default {
    GetCurriculumsTutor,
};
