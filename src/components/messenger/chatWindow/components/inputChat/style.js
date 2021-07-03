import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  background: none;
  box-sizing: border-box;
  // padding:5px;
  align-items: center;
  justify-content: center;
  // margin-top: auto;
`;

export const ChatInput = styled.input`
  width: 85%;
  background: rgb(216, 218, 220);
  height: 37px;
  border: 0.5px solid white;
  border-radius: 15px;
  outline: none;
  padding: 0 10px;
  &:focus {
    outline: none;
  }
`;

export const BtnSend = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  background: none;
  outline: none;
  border: none;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  &:focus {
    outline: none;
  }
  &:hover {
    background: rgb(216, 218, 220);
  }
`;

export const ImageSend = styled.img`
  width: 25px;
  height: 25px;
`;
