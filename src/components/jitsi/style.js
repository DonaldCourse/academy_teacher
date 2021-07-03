import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
  align-items: center;
  z-index: 10000000;
`;

export const Loader = styled.h5``;

export const JitSiContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #474747;
  z-zindex: 5;
`;

