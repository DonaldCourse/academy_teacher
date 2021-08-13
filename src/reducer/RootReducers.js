import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlide from "./sidebarShowSlide";
import authSlide from './AuthSlide'

const RootReducers = combineReducers({
  sidebarSlide,
  authSlide
});

export default RootReducers;
