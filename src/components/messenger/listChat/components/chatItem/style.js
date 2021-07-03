import Modal from "react-modal";
import styled from "styled-components";

export const Container = styled.button`
  width: 340px;
  padding: 8px 6px;
  height: 72px;
  border: none;
  outline: none;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  background: none;
  border: none;
  // background: #ff0;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #f0f2f5;
  }
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  background: url(${(props) => props.avatar});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const Pain = styled.div`
  margin: 0 0 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Name = styled.span`
  font-size: 15px;
  color: #050505;
`;

export const LastMessage = styled.div`
  font-size: 13px;
  color: #65676b;
  padding: 5px;
  width: 160px;
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Timer = styled.div`
  font-size: 11px;
  color: #65676b;
  padding: 5px;
  margin-left: 20px;
`;
