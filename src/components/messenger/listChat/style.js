import Modal from "react-modal";
import styled from "styled-components";

export const Container = styled(Modal)`
  position: absolute;
  top: 60px;
  right: 10px;
  width: 360px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 450px) {
    width: 100vw;
    height: calc(100vh - 80px);
    right: 0;
    top: 70px;
    z-index: 100000000000;
  }
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  margin: 0;
  padding: 10px 10px 0;
`;

export const ListMessage = styled.div`
  margin-top: 20px;
  width: 100%;
  // height: 250px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
