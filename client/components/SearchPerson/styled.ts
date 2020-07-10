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
// Suggestions

export const SuggContainer = styled.div<{ displayed: boolean }>`
  position: absolute;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;
  outline: solid navy 2px;
  max-height: 380px;
  display: ${props => props.displayed ? 'block' : 'none'};
  background: #fff;
  z-index: 2;
`
export const ImgSpacer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SuggImgContainer = styled.div`
  display: flex;
  height: 80px;
  width: 60px;
  img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    display: block;
    margin: 0 auto;
  }
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