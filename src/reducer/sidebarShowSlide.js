import { createSlice } from "@reduxjs/toolkit";

const sidebbarSlide = createSlice({
  name: "sidebarShow",
  initialState: {
    sidebarShow: "responsive",
  },
  reducers: {
    setReponsive: (state, action) => {
      return {
        ...state,
        sidebarShow: action.payload
      };
    },
  },
});

const { reducer, actions } = sidebbarSlide;
export const { setReponsive } = actions;
export default reducer;
