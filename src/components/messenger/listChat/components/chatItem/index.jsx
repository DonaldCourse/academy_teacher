import { useDispatch, useSelector } from "react-redux";
import {
  GetContentByRoomId,
  OpenChatWindow,
  PushChatTing,
  ToggleListChat,
  setRoomId,
} from "../../../../../reducer/messageSlide";
import * as SC from "./style";
import { unwrapResult } from "@reduxjs/toolkit";
import { useContext } from "react";
import DefaultAvatar from "../../../../../assets/icons/defaultAvatar.png";
import { SocketContext } from "../../../../../context/socket/socketContext";

const ChatItem = (props) => {
  const { isOpenChatWindow } = useSelector((state) => state.message);
  const { chatContent } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  //check time
  const timer = () => {
    const now = new Date();
    const lastMessage = new Date(props.info.updated_at);
    let result = (now - lastMessage) / 60000;
    if (result > 60 && result < 24 * 60) {
      let time;
      result = Math.floor(result / 60);
      time = result + " Giờ";
      return time;
    } else if (result > 24 * 60) {
      let time;
      result = Math.floor(result / 60 / 24);
      time = result + " Ngày";
      return time;
    } else if (result < 1) {
      let time = "Bây giờ";
      return time;
    } else {
      let time;
      result = Math.floor(result);
      time = result + " Phút";
      return time;
    }
  };

  const toggleChatWindow = async () => {
    if (isOpenChatWindow && chatContent.roomId == props.info.room_id) {
      dispatch(ToggleListChat());
      return;
    }
    dispatch(OpenChatWindow());
    dispatch(ToggleListChat());
    const content = await dispatch(GetContentByRoomId(props.info.room_id)); // get all mesages in conversation
    const userChatTing = {
      id: props.info.room_id,
      name: props.info.username,
      avatar: props.info.avatar,
      receiver: props.info.receiver_id,
    };
    dispatch(setRoomId(userChatTing));
    socket.socketChat.emit("joinRoom", {
      event: "joinRoom",
      room: props.info.room_id,
    }); // emit event join rôm

    //Save to list chatTing
    dispatch(
      PushChatTing({
        roomId: props.info.room_id,
        chatContent: unwrapResult(content),
        avatar: props.info.avatar,
        name: props.info.username,
        receiver: props.info.receiver_id,
        notification: 0,
      })
    );
  };
  const auth = JSON.parse(localStorage.getItem("auth"));
  return (
    <SC.Container onClick={toggleChatWindow}>
      <SC.Avatar avatar={props.info.avatar || DefaultAvatar} />
      <SC.Pain>
        <SC.Name>{props.info.username}</SC.Name>
        <SC.LastMessage>
          {props.info.sender_id == auth.id
            ? "Bạn: "
            : props.info.username + ": "}
          {props.info.mes_content}
        </SC.LastMessage>
      </SC.Pain>
      <SC.Timer>{timer()}</SC.Timer>
    </SC.Container>
  );
};

export default ChatItem;
