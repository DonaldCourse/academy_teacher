import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SC from "./style";
import ControlTheCall from "./components/control";
import io from "socket.io-client";
import LocalVideo from "./components/localVideo";
import { SOCKET_URL } from "../../contants";
import { useRouteMatch } from "react-router-dom";
import {
  CCard,
  CCardFooter,
  CCardBody,
  CCardHeader,
  CButton,
  CCardText,
} from "@coreui/react";

const socket = io(`${SOCKET_URL}/video-call`, {
  // transports: ["websocket", "polling", "flashsocket"],
  query: {
    token: localStorage.getItem("token"),
  },
});

export const CallVideo = (props) => {
  const dispatch = useDispatch();
  const [api, setApi] = useState();
  const { camStatus } = useSelector((state) => state.jitsi);
  const { micStatus } = useSelector((state) => state.jitsi);
  const { shareScreen } = useSelector((state) => state.jitsi);
  const [close, setClose] = useState(false);
  const [request_cancle, setRequest_cancle] = useState(false);
  const localAvatar = localStorage.getItem("avatar");
  const match = useRouteMatch();
  const { roomId } = match.params;

  const startConference = () => {
    try {
      const domain = "stream.tingtong.xyz";
      const options = {
        roomName: roomId,
        // displayName: "thang",
        parentNode: document.getElementById("jitsi-container"),
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND: "#000", //good
          // FILM_STRIP_MAX_HEIGHT: 288, //good
          HIDE_INVITE_MORE_HEADER: true, //good
          // LOCAL_THUMBNAIL_RATIO: 16 / 9, //good
          // DEFAULT_LOCAL_DISPLAY_NAME: "thang dep trai",
          filmStripOnly: false,
        },
        configOverwrite: {
          startWithAudioMuted: false, //good
          prejoinPageEnabled: false, //good
          toolbarButtons: [],
        },
      };
      const confferent = new window.JitsiMeetExternalAPI(domain, options);
      setApi(confferent);
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  };

  useEffect(async () => {
    if (window.JitsiMeetExternalAPI) {
      await startConference();
    } else alert("Jitsi Meet API script not loaded");
  }, []);

  useEffect(() => {
    if (!api) return;
    const supAPI = api;
    supAPI.executeCommand("toggleFilmStrip");
    supAPI.executeCommand("toggleLobby", true);
    if (!camStatus) supAPI.executeCommand("toggleVideo");
    if (!micStatus) supAPI.executeCommand("toggleAudio");
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const supAPI = api;
    supAPI.executeCommand("avatarUrl", localAvatar);
  }, [api]);

  //TOGGLE VIDEO
  useEffect(() => {
    if (!api) return;
    const supAPI = api;
    supAPI.executeCommand("toggleVideo");
  }, [camStatus]);

  // TOGGLE AUDIO
  useEffect(() => {
    if (!api) return;
    const supAPI = api;
    supAPI.executeCommand("toggleAudio");
  }, [micStatus]);

  //TOGGLE SHARESCREEN
  useEffect(() => {
    if (!api) return;
    if (shareScreen == 0) return;
    const supAPI = api;
    supAPI.executeCommand("toggleShareScreen");
  }, [shareScreen]);

  const CancleTheCall = (value) => {
    setRequest_cancle(value);
  };

  useEffect(() => {
    socket.on("sendToReceiver", (data) => {
      setClose(true);
      // window.close();
    });
  }, []);

  return (
    <>
      {close ? (
        <SC.Container
          style={{
            backgroundImage: `url(${localAvatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            // opacity:0.7
          }}
        >
          <CCard>
            <CCardHeader style={{ fontSize: "18px", textAlign: "center" }}>
              Kết thúc
            </CCardHeader>
            <CCardBody>
              <CCardText>Cuộc gọi của bạn đã kết thúc!</CCardText>
            </CCardBody>

            <CCardFooter style={{ textAlign: "right" }}>
              <CButton
                type="submit"
                onClick={() => window.close()}
                size="sm"
                color="primary"
              >
                Đóng
              </CButton>
            </CCardFooter>
          </CCard>
        </SC.Container>
      ) : (
        <SC.Container>
          {request_cancle ? (
            ""
          ) : (
            <>
              <LocalVideo />
              <ControlTheCall
                socket={socket}
                roomId={props.match.params.roomId}
                callerId={props.match.params.callerId}
                receiverId={props.match.params.receiverId}
              />
              <SC.JitSiContainer id="jitsi-container" />
            </>
          )}
        </SC.Container>
      )}
    </>
  );
};

export default CallVideo;
