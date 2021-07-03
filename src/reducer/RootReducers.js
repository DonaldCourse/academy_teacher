import { combineReducers } from "@reduxjs/toolkit";
import message from "./messageSlide";
import sidebarShow from "./sidebarShowSlide";
import jitsi from "../components/jitsi/jitsiSlide";

const RootReducers = combineReducers({
  sidebarShow,
  message,
  jitsi,
});

export default RootReducers;
