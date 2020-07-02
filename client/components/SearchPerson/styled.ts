import styled from "styled-components";

export const PageContainer = styled.main`
  display: flex;
  justify-content: center;
`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

// Suggestions

export const SuggContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;
  outline: solid navy 2px;
  height: 380px;
`
export const ImgSpacer = styled.div`
  width: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SuggImgContainer = styled.div`
  width: 60px;
  display: flex;
`
export const SuggCard = styled.div`
  flex:1;
  display: flex;
  padding: 5px;
  cursor: pointer;
  &:hover{
    background: grey;
  }
`
export const SuggInfo = styled.div`
  flex: 1;
  padding: 3px 7px;
  display: flex;
  flex-direction: column;
`
export const NameC = styled.div`
  font-weight: bold;
`