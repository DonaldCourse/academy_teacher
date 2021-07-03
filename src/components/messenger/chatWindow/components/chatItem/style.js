import styled from "styled-components";

export const ContainerLeft = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  background: #fff;
  box-sizing: border-box;
  padding-bottom: 5px;
`;

export const ContainerRight = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row-reverse;
  box-sizing: border-box;
  padding-bottom: 5px;
  margin-left: auto;
`;

export const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-top: auto;
  // margin-bottom: -3px;
`;

export const ChatItemLeft = styled.div`
  word-break: break-word;
  margin-left: 5px;
  max-width: 100%;
  border-radius: 20px 20px 20px 0;
  padding: 10px;
  font-size: 15px;
  display: flex;
  background: rgba(190, 190, 190, 0.5);
  color: #333333;
`;

export const ChatItemRight = styled.div`
  word-break: break-word;
  margin-right: 10px;
  max-width: 100%;
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  display: flex;
  background: #6990A6;
  color: #fff;
`;
