import styled from "styled-components";
import Modal from "react-modal";

export const Container = styled(Modal)`
  position: absolute;
//   width: 550px;
//   height: 214px;
  overflow: auto;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: #000;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  outline: none;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;