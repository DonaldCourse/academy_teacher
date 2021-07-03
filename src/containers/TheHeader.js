import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CBadge,
  CLink,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";
import { ToggleListChat, resetNotificatiom } from "../reducer/messageSlide";
import { setReponsive } from "../reducer/sidebarShowSlide";
import ListChat from "../components/messenger/listChat";
// import listChatting from "../components/messenger/chatWindow/components/listChating";
import ChatWindow from "../components/messenger/chatWindow";
import ListChatTing from "../components/messenger/chatWindow/components/listChating";
import ReceiveCallLobby from "../components/jitsi/components/receiveCallLobby";
import tingtong from '../assets/icons/tingtong_text.png'

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const { notification } = useSelector((state) => state.message);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(setReponsive(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(setReponsive(val));
  };

  return (
    <>
      <ListChat />
      <ChatWindow />
      <ListChatTing />
      <ReceiveCallLobby />
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <img style={{ "height": 50 }} src={tingtong} className="c-sidebar-brand-minimized"></img>
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          {/* <TheHeaderDropdownNotif />
          <TheHeaderDropdownTasks /> */}
          <div
            style={{
              width: 32,
              height: 32,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CIcon
              onClick={() => {
                dispatch(ToggleListChat());
                dispatch(resetNotificatiom());
              }}
              name="cil-envelope-open"
            />
            {notification > 0 ? (
              <CBadge
                style={{ position: "absolute", top: 0, right: 0 }}
                shape="pill"
                color="danger"
              >
                {notification}
              </CBadge>
            ) : (
              ""
            )}
          </div>
          <TheHeaderDropdown />
        </CHeaderNav>

        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={routes}
          />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink
              className="c-subheader-nav-link"
              aria-current="page"
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />
              &nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />
              &nbsp;Settings
            </CLink>
          </div>
        </CSubheader>
      </CHeader>
    </>
  );
};

export default TheHeader;
