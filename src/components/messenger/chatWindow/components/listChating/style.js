import styled from "styled-components";
import DefaultAvatar from "../../../../../assets/icons/defaultAvatar.png";
export const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 0;
  width: 80px;
  height: 450px;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  box-sizing: border-box;
  transition: 0.5s;
  z-index: 1;
  @media (max-width: 450px) {
    flex-direction: row-reverse;
    top: 0;
    right: 0;
    width: 100vw;
    height: 80px;
    z-index: 10;
    padding-right: 10px;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const Item = styled.div`
  width: 60px;
  height: 60px;
  padding: 6px;
`;

export const BtnAvatar = styled.button`
  position: relative;
  background: url(${DefaultAvatar});
  background-size: cover;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

export const Image = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
`;

export const Noti = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  padding: 0 5px;
  height: 19px;
  line-height: 19px;
  border-radius: 50%;
  background: #f00;
  color: #fff;
`;
