import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  // background: #000;
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  padding: 8px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Name = styled.div`
  padding: 0;
  margin: 0;
  font-size: 15px;
  // color: #050505;
  margin-left: 5px;
  height: 32px;
  line-height: 32px;
`;

export const Pain = styled.div`
  margin-left: auto;
  height: 32px;
  display: flex;
  flex-direction: row;
  // background: #ff0;
  padding: 0 8px;
  align-items: center;
`;

export const Cancle = styled.img`
  width: 15px;
  height: 15px;
  filter: grayscale(0%);
  // opacity: 0.5;
`;

export const ArrowBtn = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  transform: rotate(-90deg);
  @media (max-width: 450px) {
    display: none;
  }
`;
