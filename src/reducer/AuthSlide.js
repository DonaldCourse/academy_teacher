import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthServices from "../services/AuthServices";
export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const result = await AuthServices.getProfileTutor();
    if (result.status == 200) {
      return result.data.user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
})

const authSlide = createSlice({
  name: "authSlide",
  initialState: {
    auth: null,
  },
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        auth: action.payload
      };
    },
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.auth = action.payload
    }
  }
});

const { reducer, actions } = authSlide;
export const { setAuth } = actions;
export default reducer;
