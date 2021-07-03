import * as SC from "./style";
import CancleIcon from "../../../../assets/icons/CancelCall.png";
import CloseMicIcon from "../../../../assets/icons/IconCloseMicro.png";
import CloseCamIcon from "../../../../assets/icons/IconCloseCamera.png";
import ScreenIcon from "../../../../assets/icons/IconShareScrenn.png";
import { useDispatch, useSelector } from "react-redux";
import { ToggleCamera, ToggleMicro, ToggleShareScreen } from "../../jitsiSlide";
import { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardFooter,
  CCardText,
  CModal,
} from "@coreui/react";

const ControlTheCall = (props) => {
  const dispatch = useDispatch();
  const { camStatus } = useSelector((state) => state.jitsi);
  const { micStatus } = useSelector((state) => state.jitsi);
  const [isOpen, setOpen] = useState(false);
  const { socket } = props;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const aboutMe = auth.id == props.receiverId ? "receiver" : "caller";

  const alertUser = (event) => {
    if (aboutMe == "caller") {
      socket.emit("caller", {
        event: "caller",
        room: props.roomId,
        receiver: props.receiverId,
        action: 2,
      });
      localStorage.removeItem("receiverId");
    } else {
      socket.emit("receiver", {
        event: "receiver",
        room: props.roomId,
        caller: props.callerId,
        action: 2,
      });
    }
    localStorage.removeItem("avatar");
    window.close();
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  });

  const cancleTheCall = () => {
    if (aboutMe == "caller") {
      socket.emit("caller", {
        event: "caller",
        room: props.roomId,
        receiver: props.receiverId,
        action: 2,
      });
    } else {
      socket.emit("receiver", {
        event: "receiver",
        room: props.roomId,
        caller: props.callerId,
        action: 2,
      });
    }
    localStorage.removeItem("avatar");
    window.close();
  };

  return (
    <>
      <CModal show={isOpen} closeOnBackdrop={false}>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader style={{ fontSize: "18px", textAlign: "center" }}>
                hủy cuộc gọi
              </CCardHeader>
              <CCardBody>
                <CCardText>Bạn có muốn rời cuộc hội thoại không?</CCardText>
              </CCardBody>

              <CCardFooter style={{ textAlign: "right" }}>
                <CButton
                  onClick={() => setOpen(false)}
                  size="sm"
                  color="primary"
                  style={{ marginRight: 5 }}
                >
                  Hủy
                </CButton>
                <CButton
                  type="submit"
                  onClick={cancleTheCall}
                  size="sm"
                  color="primary"
                >
                  Chấp nhận
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CModal>
      {/* ///////////////////////////////// */}
      {/* /////////////////////////////// */}
      <SC.Container>
        <SC.ShareScreen onClick={() => dispatch(ToggleShareScreen())}>
          <SC.ScrennIcon src={ScreenIcon} />
        </SC.ShareScreen>
        <SC.GroupControl>
          <SC.CloseBtn
            style={
              camStatus
                ? { background: "none" }
                : { background: "rgba(255,255,255,0.4)" }
            }
            onClick={() => dispatch(ToggleCamera())}
          >
            <SC.Icon src={CloseCamIcon} />
          </SC.CloseBtn>
          <SC.CancleButton onClick={() => setOpen(true)}>
            <SC.Icon src={CancleIcon} />
          </SC.CancleButton>
          <SC.CloseBtn
            style={
              micStatus
                ? { background: "none" }
                : { background: "rgba(255,255,255,0.4)" }
            }
            onClick={() => dispatch(ToggleMicro())}
          >
            <SC.Icon src={CloseMicIcon} />
          </SC.CloseBtn>
        </SC.GroupControl>
      </SC.Container>
    </>
  );
};

export default ControlTheCall;
