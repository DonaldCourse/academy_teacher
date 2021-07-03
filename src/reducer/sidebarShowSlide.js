import { createSlice } from "@reduxjs/toolkit";

const sidebbarShow = createSlice({
  name: "sidebarShow",
  initialState: {
    sidebarShow: "responsive",
  },
  reducers: {
    setReponsive: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = sidebbarShow;
export const { setReponsive } = actions;
export default reducer;
