import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  z-index: 11;
`;

export const GroupControl = styled.div`
  height: 47px;
  width: 300px;
  display: felx;
  flex-direction: row;
  justify-content: space-between;
`;

export const CancleButton = styled.button`
  width: 47px;
  height: 47px;
  border: none;
  border-radius: 50%;
  background: #ec3f31;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    outline: none;
  }
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

export const CloseBtn = styled.button`
  width: 47px;
  height: 47px;
  border: none;
  border-radius: 50%;
  border: 0.5px solid rgba(255, 255, 255, 0.7);
  background: none;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    outline: none;
  }
  &:hover {
    border: 2px solid #fff;
  }
`;

export const ShareScreen = styled.button`
  position: absolute;
  bottom: 20px;
  left: 15px;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    outline: none;
  }
  &:hover {
    background: #fff;
  }
`;

export const ScrennIcon = styled.img`
  width: 15px;
  height: 15px;
`;
