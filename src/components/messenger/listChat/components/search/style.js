import styled from "styled-components";
import SearchIcon from "./icon/searchIcon.png";

export const Container = styled.div`
  width: 100%;
  min-height: 52px;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  // background: #ff0;
`;

export const SearchForm = styled.form`
  border-radius: 30px;
  outline: none;
  width: 328px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fdf2f5;
`;

export const SubmitButton = styled.i`
  width: 19px;
  height: 19px;
  margin-left: 10px;
  background: url(${SearchIcon});
  border: none;
  outline: none;
`;

export const InputSearch = styled.input`
  margin-left: 10px;
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  color: #545455;
  ::placeholder {
    color: rgba(84, 84, 85, 0.65);
  }
  :focus {
    outline: none;
  }
`;
