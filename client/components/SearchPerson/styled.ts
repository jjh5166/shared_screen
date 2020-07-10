import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  position: relative;
  align-items: center;
  input{
    width: 100%;
  }
`
export const PplResultsSection = styled.section`
  outline: solid red 2px;
  min-height: 60%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`