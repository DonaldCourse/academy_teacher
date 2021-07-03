import * as SC from "./style";
import ChatItem from "../chatItem";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import IconChatTing from "../../../../../assets/icons/IconChatTing.gif";
import audioChatTing from "../../../../../assets/audio/audioIsChatTing.mp3";
import { SocketContext } from "../../../../../context/socket/socketContext";

const ChatView = (props) => {
  const { chatContent } = useSelector((state) => state.message);
  const { isOpenChatWindow } = useSelector((state) => state.message);
  const viewRef = useRef(null);
  const [isChatTing, setChatTing] = useState(false);
  const socket = useContext(SocketContext);
  let audio = new Audio(audioChatTing);

  useEffect(() => {
    viewRef.current.scrollIntoView();
  }, [chatContent.roomId]);

  useEffect(() => {
    socket.socketChat.on("msgToClient", (data) => {
      setChatTing(false);
    });
  }, []);

  useEffect(() => {
    viewRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chatContent.content, isChatTing]);

  useEffect(() => {
    socket.socketChat.on("actionToReceiver", (data) => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth.id == data.sender) return;
      if (data.action == 1) {
        setChatTing(true);
      } else {
        setChatTing(false);
      }
    });
    return () => socket.socketChat.on("actionToReceiver");
  }, []);

  useEffect(() => {
    if (!isOpenChatWindow) return;
    if (!isChatTing) return;
    audio.currentTime = 0;
    audio.play();
  }, [isChatTing]);

  const showListChat = () => {
    if (Object.keys(chatContent.content).length == 0) return;
    const result = chatContent.content.list.map((chat) => {
      return <ChatItem content={chat} />;
    });
    return result;
  };
  return (
    <SC.Container>
      {showListChat()}
      {isChatTing ? (
        <SC.IsChatTing>
          <SC.Doc>
            <SC.Imagee src={IconChatTing} />
          </SC.Doc>
        </SC.IsChatTing>
      ) : (
        <SC.IsChatTing />
      )}
      <div ref={viewRef} />
    </SC.Container>
  );
};

export default ChatView;
