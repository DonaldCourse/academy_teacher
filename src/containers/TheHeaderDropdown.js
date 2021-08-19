import React, { useContext, useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import AuthServices from "../services/AuthServices";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
// import { set } from "core-js/core/dict";

const TheHeaderDropdown = () => {
  const history = useHistory();
  const { auth, setAuth } = useAuth();
  const userProfile = useSelector(state => state.authSlide.auth);

  const handleLogout = () => {
    try {
      AuthServices.logout().then((res) => {
        if (res && res.status == 200) {
          setAuth({});
          window.localStorage.removeItem("token");
          history.push("/login");
        }
      });
    } catch (error) { }
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar src={process.env.REACT_APP_BASE_URL_CDN + userProfile?.avatar||""}></Avatar>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          onClick={() => history.push("/user-profile")}
          color="light"
          className="text-center"
        >
          <CIcon name="cil-user" className="mfe-2" />
          Account
        </CDropdownItem>
        <CDropdownItem onClick={() => handleLogout()}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
