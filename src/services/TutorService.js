import { postAPI, getAPI } from './index';

const GetAllTutor = () => {
    return getAPI('/api/admin/tutor');
}

export default {
    GetAllTutor,
};
