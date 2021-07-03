import * as SC from "./style";
import { useDispatch, useSelector } from "react-redux";
import MessageHeader from "./components/header";
import { useRef } from "react";
import "./style.scss";
import InputChat from "./components/inputChat";
import ChatView from "./components/chatView";

const ChatWindow = (props) => {
  const dispatch = useDispatch();
  const { isOpenChatWindow } = useSelector((state) => state.message);
  const ContainerRef = useRef(null);

  const toggleChat = (value) => {
    ContainerRef.current.classList.toggle("transform");
  };

  return (
    <>
      {isOpenChatWindow ? (
        <SC.Container className="container" ref={ContainerRef}>
          <MessageHeader toggleChat={(value) => toggleChat(value)} />
          <ChatView />
          <InputChat />
        </SC.Container>
      ) : null}
    </>
  );
};

export default ChatWindow;
