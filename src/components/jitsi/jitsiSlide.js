import { createSlice } from "@reduxjs/toolkit";

const JitSi = createSlice({
  name: "jitsi",
  initialState: {
    LobbyReceiveCallStatus: false,
    InfoTutor: {},
    camStatus: true,
    micStatus: true,
    shareScreen: 0,
  },
  reducers: {
    OpenReceiveLobby: (state) => {
      state.LobbyReceiveCallStatus = true;
      return state;
    },
    CloseReceiveLobby: (state) => {
      state.LobbyReceiveCallStatus = false;
      return state;
    },
    ToggleCamera: (state) => {
      state.camStatus = !state.camStatus;
      return state;
    },
    ToggleMicro: (state) => {
      state.micStatus = !state.micStatus;
      return state;
    },
    ToggleShareScreen: (state) => {
      state.shareScreen = state.shareScreen += 1;
      return state;
    },
  },
});

const { reducer, actions } = JitSi;
export const {
  OpenReceiveLobby,
  CloseReceiveLobby,
  ToggleCamera,
  ToggleMicro,
  ToggleShareScreen,
} = actions;
export default reducer;
