import { combineReducers } from "@reduxjs/toolkit";
import sidebarShow from "./sidebarShowSlide";
import authSlide from './AuthSlide'

const RootReducers = combineReducers({
  sidebarShow,
  authSlide
});

export default RootReducers;
