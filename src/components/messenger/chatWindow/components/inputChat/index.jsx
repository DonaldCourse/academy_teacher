import * as SC from "./style";
import SendIcon from "../../../../../assets/icons/SendIcon.png";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PushMessageContent,
  setNotification,
} from "../../../../../reducer/messageSlide";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../../../../context/socket/socketContext";

const InputChat = (props) => {
  const dispatch = useDispatch();
  const [vale, setValue] = useState("");
  const { chatContent } = useSelector((state) => state.message);
  const { listChatTing } = useSelector((state) => state.message);
  const [message, setMessage] = useState({});
  const socket = useContext(SocketContext);
  console.log(socket.socketChat);
  const { handleSubmit } = useForm();
  const [isChatTing, setChatTing] = useState(false);

  useEffect(() => {
    socket.socketChat.on("msgToClient", (data) => {
      setMessage(data);
    });
  }, []);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (chatContent.roomId == "") return;
    if (message.senderId == auth.id) return;
    if (message.roomId == chatContent.roomId) {
      const chatt = {
        senderId: message.senderId,
        mesContent: message.mesContent,
      };
      dispatch(PushMessageContent(chatt));
      return;
    } else {
      listChatTing.forEach((item) => {
        if (item.roomId == message.roomId) {
          const chatt = {
            senderId: message.senderId,
            mesContent: message.mesContent,
          };
          const payload = { id: item.roomId, content: chatt };
          dispatch(setNotification(payload));
          return;
        }
      });
    }
  }, [message]);

  const onChange = (event) => {
    setValue(event.target.value);
    if (event.target.value != "") {
      if (isChatTing) return;
      socket.socketChat.emit("actionSender", {
        room: chatContent.roomId,
        receiver: [chatContent.receiver],
        action: 1,
      });
      setChatTing(true);
    } else {
      console.log(socket.socketChat);
      socket.socketChat.emit("actionSender", {
        room: chatContent.roomId,
        receiver: [chatContent.receiver],
        action: 2,
      });
      setChatTing(false);
    }
  };

  const onSubmit = () => {
    setChatTing(false);
    if (!vale) return;
    const auth = JSON.parse(localStorage.getItem("auth"));
    const chatt = {
      senderId: auth.id,
      mesContent: vale,
    };
    dispatch(PushMessageContent(chatt));
    //send message
    socket.socketChat.emit("msgToServer", {
      event: "msgToServer",
      room: chatContent.roomId,
      mes_content: vale,
      mes_type: 1,
      receiver: [chatContent.receiver],
    });
    setValue("");
  };

  return (
    <SC.Container onSubmit={handleSubmit(onSubmit)}>
      <SC.ChatInput value={vale} onChange={onChange} placeholder="Aa" />
      <SC.BtnSend>
        <SC.ImageSend src={SendIcon} />
      </SC.BtnSend>
    </SC.Container>
  );
};

export default InputChat;
