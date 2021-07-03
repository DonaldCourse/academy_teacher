import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  // background: #000;
  box-sizing: border-box;
  padding: 5px;
  overflow-y: scroll;
  // ::-webkit-scrollbar {
  //   display: none;
  // }
  @media (max-width: 450px) {
    width: 100vw;
    height: calc(100% - 88px);
    right: 0;
    z-index: 10;
  }
`;

export const IsChatTing = styled.div`
  width: 60px;
  height: 50px;
  padding: 10;
  box-sizing: border-box;
  margin-left: 30px;
`;

export const Doc = styled.div`
  background: rgba(190, 190, 190, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 20px;
  z-index: 10;
`;

export const Imagee = styled.img`
  width: 20px;
  z-index: -1;
`;
