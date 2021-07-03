import styled from "styled-components";
import Modal from "react-modal";

export const Container = styled(Modal)`
  position: absolute;
  width: 550px;
  height: 214px;
  overflow: auto;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  outline: none;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 450px) {
    width: 90%;
    height: auto;
  }
`;

export const GroupTitle = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Pain = styled.div`
  display: flex;
  flex-direction: row;
  width: 516px;
  // background: #ff0;
  align-items: center;
  @media (max-width: 450px) {
    width: 90%;
  }
`;

export const Title = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 20px;
`;

export const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  background: #e4e6eb;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const Cancle = styled.img`
  width: 16px;
  height: 16px;
`;

export const MainGroup = styled.div`
  width: 100%;
  height: 84px;
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  @media (max-width: 450px) {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 150px;
  }
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const GroupNoti = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  margin-left: 10px;
  @media (max-width: 450px) {
    margin: 0;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;

export const SubTitle = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 17px;
  margin-bottom: 5px;
  height: 22px;
`;

export const Timer = styled.span`
  font-size: 13px;
  color: #656768;
`;

export const BtnGroup = styled.div`
  position: relative;
  width: 100%;
  height: 68px;
  @media (max-width: 450px) {
  
    height: 100px;
  }
`;

export const SubPain = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  height: 44px;
  display: flex;
  flex-direction: row;
`;

export const CancleTheCall = styled.button`
  height: 44px;
  padding: 4px 16px;
  background: #fff;
  color: #1877f2;
  font-size: 15px;
  margin-right: 10px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const AcceptTheCall = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 4px 16px;
  background: #1877f2;
  color: #fff;
  border-radius: 10px;
  font-size: 15px;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const Camera = styled.img`
  width: 20px;
  height: 25px;
  margin-right: 5px;
`;
