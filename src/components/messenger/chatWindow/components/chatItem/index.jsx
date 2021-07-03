import { useSelector } from "react-redux";
import * as SC from "./style";
import DefaultAvatar from "../../../../../assets/icons/defaultAvatar.png"

const ChatItem = (props) => {
  const { chatContent } = useSelector((state) => state.message);
  const auth = JSON.parse(localStorage.getItem("auth"));
  return (
    <>
      {props.content.senderId == auth.id ? (
        <SC.ContainerRight>
          <SC.ChatItemRight>{props.content.mesContent}</SC.ChatItemRight>
        </SC.ContainerRight>
      ) : (
        <SC.ContainerLeft>
          <SC.Avatar src={chatContent.avatar || DefaultAvatar} />
          <SC.ChatItemLeft>{props.content.mesContent}</SC.ChatItemLeft>
        </SC.ContainerLeft>
      )}
    </>
  );
};

export default ChatItem;
