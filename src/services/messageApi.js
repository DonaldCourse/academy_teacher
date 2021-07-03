import { postAPI, getAPI } from "./index";
const MessageApi = {
  CreateRoom: (params) => {
    const url = "/api/rooms";
    return postAPI(url, params);
  },
  GetAllRoom: () => {
    const url = "/api/room-histories";
    return getAPI(url);
  },
  GetContentMessage: (params) => {
    const url = `/api/messages?roomID=${params}`;
    return getAPI(url);
  },
};

export default MessageApi;
