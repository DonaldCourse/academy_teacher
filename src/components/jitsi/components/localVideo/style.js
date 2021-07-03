import styled from "styled-components";
import Webcam from "react-webcam";

export const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  overflow: hidden;
  width: 134px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  background: #000;
  z-index: 7;
  @media (min-width: 850px) {
    width: 180px;
    height: 110px;
    top: 20px;
    left: 20px;
  }
`;

export const Webcamm = styled(Webcam)`
  width: 100%;
  height: auto;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
