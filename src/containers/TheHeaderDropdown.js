import React, { useContext, useEffect, useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { SocketContext } from "../context/socket/socketContext";
import CIcon from "@coreui/icons-react";
import AuthServices from "../services/AuthServices";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
// import { set } from "core-js/core/dict";

const TheHeaderDropdown = () => {
  const history = useHistory();
  const { auth, setAuth } = useAuth();
  const [tutor, setTutor] = useState({});
  const socker = useContext(SocketContext);
  const socket = socker.socketTutor;

  const alertUser = (event) => {
    socket.emit("status", { is_active: 2 });
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  });

  useEffect(async () => {
    const res = await AuthServices.getProfileTutor();
    // console.log(res.data);
    setTutor(res.data);
  }, []);

  const handleLogout = () => {
    try {
      AuthServices.logout().then((res) => {
        if (res && res.status == 201) {
          socket.emit("status", { is_active: 2 });
          setAuth({});
          window.localStorage.removeItem("token");
          history.push("/login");
        }
      });
    } catch (error) {}
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={tutor.avatar} className="c-avatar-img" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          onClick={() => history.push("/user-profile")}
          color="light"
          className="text-center"
        >
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
