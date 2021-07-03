import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MessageApi from "../services/messageApi";

export const GetRoomChat = createAsyncThunk(
  //Tạo và trả về room id
  "Message/getRoomChat",
  async (params, thunkAPI) => {
    const Room = await MessageApi.CreateRoom(params);
    return Room.data;
  }
);

export const GetRoomHistories = createAsyncThunk(
  "Message/getAllRoom",
  async (params, thunkApi) => {
    const listRoom = await MessageApi.GetAllRoom();
    return listRoom.data;
  }
);

export const GetContentByRoomId = createAsyncThunk(
  "Message/getContent",
  async (params, thunkApi) => {
    const content = await MessageApi.GetContentMessage(params);
    return content.data;
  }
);

const Message = createSlice({
  name: "message",
  initialState: {
    isOpen: false, // toggle chat list
    isOpenChatWindow: false, //chat box
    isChatTing: false,
    listChatTing: [], //danh sach cac doan chat dang join room
    chatContent: {
      roomId: "",
      name: "",
      receiver: "",
      avatar: "",
      content: {},
    },
    roomHistories: {}, //list chat
    notification: 0,
  },
  reducers: {
    ToggleListChat: (state) => {
      state.isOpen = !state.isOpen;
      return state;
    },
    OpenChatWindow: (state) => {
      state.isOpenChatWindow = true;
    },
    CloseChatWindow: (state) => {
      state.isOpenChatWindow = false;
      return state;
    },
    PushMessageContent: (state, action) => {
      state.chatContent.content.list.push(action.payload);
    },
    setNotificationInList: (state, action) => {
      state.notification += 1;
      return state;
    },
    resetNotificatiom: (state, action) => {
      state.notification = 0;
      return state;
    },

    //clear chatContent
    ClearChatContent: (state, action) => {
      state.listChatTing.forEach((item, index) => {
        if (item.roomId == state.chatContent.roomId) {
          state.listChatTing.splice(index, 1);
        }
      });
      if (state.listChatTing.length > 0) {
        state.chatContent.content = state.listChatTing[0].chatContent;
        state.chatContent.roomId = state.listChatTing[0].roomId;
        state.chatContent.name = state.listChatTing[0].name;
        state.chatContent.avatar = state.listChatTing[0].avatar;
        state.chatContent.receiver = state.listChatTing[0].receiver;
      } else {
        state.chatContent.content = {};
        state.chatContent.roomId = "";
      }
    },
    //set roomid now
    setRoomId: (state, action) => {
      state.chatContent.roomId = action.payload.id;
      state.chatContent.name = action.payload.name;
      state.chatContent.avatar = action.payload.avatar;
      state.chatContent.receiver = action.payload.receiver;
      return state;
    },
    //change main chat content:
    ChangeConversation: (state, action) => {
      state.listChatTing.forEach((item, index) => {
        if (item.roomId == state.chatContent.roomId) {
          state.listChatTing[index].chatContent = state.chatContent.content;
          return;
        }
      });
      state.listChatTing[action.payload].notification = 0;
      state.chatContent.content =
        state.listChatTing[action.payload].chatContent;
      state.chatContent.roomId = state.listChatTing[action.payload].roomId;
      state.chatContent.name = state.listChatTing[action.payload].name;
      state.chatContent.avatar = state.listChatTing[action.payload].avatar;
      state.chatContent.receiver = state.listChatTing[action.payload].receiver;
      return state;
    },
    //them notification
    setNotification: (state, action) => {
      state.listChatTing.forEach((item, index) => {
        if (item.roomId == action.payload.id) {
          state.listChatTing[index].chatContent.list.push(
            action.payload.content
          );
          state.listChatTing[index].notification += 1;
          return state;
        }
      });
    },
    //them 1 cuoc hoi thoai vao trang thai dang chat
    PushChatTing: (state, action) => {
      let check = false;
      state.listChatTing.forEach((item) => {
        if (action.payload.roomId == item.roomId) {
          check = true;
          return;
        }
      });
      if (check) return;
      state.listChatTing.push(action.payload);
    },
  },
  extraReducers: {
    [GetRoomChat.pending]: (state, action) => {},
    [GetRoomChat.rejected]: () => {},
    [GetRoomChat.fulfilled]: (state, action) => {
      state.roomChat = action.payload;
      return state;
    },

    [GetRoomHistories.pending]: (state, action) => {},
    [GetRoomHistories.rejected]: () => {},
    [GetRoomHistories.fulfilled]: (state, action) => {
      state.roomHistories = action.payload;
      return state;
    },

    [GetContentByRoomId.pending]: (state, action) => {},
    [GetContentByRoomId.rejected]: () => {},
    [GetContentByRoomId.fulfilled]: (state, action) => {
      state.chatContent.content = action.payload;
      state.chatContent.content.list.reverse();
      return state;
    },
  },
});

const { reducer, actions } = Message;
export const {
  ToggleListChat,
  OpenChatWindow,
  CloseChatWindow,
  UpdateListChat,
  PushChatTing,
  setRoomId,
  PushMessageContent,
  ClearChatContent,
  ChangeConversation,
  setNotification,
  setNotificationInList,
  resetNotificatiom,
} = actions;
export default reducer;
