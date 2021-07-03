import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigationtutor from "./nav_tutor";

import logo from "../assets/icons/logo.svg";
import tingtong from "../assets/icons/tingtong.svg";
import { setReponsive } from "../reducer/sidebarShowSlide";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  return (
    <CSidebar show={show} onShowChange={(val) => dispatch(setReponsive(val))}>
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <img
          style={{ height: 50 }}
          src={logo}
          className="c-sidebar-brand-full"
        ></img>
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
        <img
          style={{ height: 50 }}
          src={tingtong}
          className="c-sidebar-brand-minimized"
        ></img>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigationtutor}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
