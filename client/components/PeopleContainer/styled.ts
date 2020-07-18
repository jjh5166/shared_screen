import styled from "styled-components";
import { theme } from '../../constants';

export const PplContainer = styled.div`
  outline: solid 2px ${theme.charlie};
  height: 75%;
  width: 30%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden scroll;
`

// PersonCard
export const CloseX = styled.div`
color: ${theme.bravo};
background: gray;
position: absolute;
right: 0;
top: 0;
padding: 2px;
border-radius: 30px;
height: 15px;
width: 15px;
display: flex;
align-items: center;
justify-content: center;
display: none;
&:before{
  content: "X"
}
`
export const PCardContainer = styled.div`
  display: flex;
  height: 110px;
  width: 73px;
  position: relative;
  margin: 5px;
  &:hover{
    outline: solid ${theme.delta} 2px;
  ${CloseX} {
    display: block;
  }
  }
  img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    display: block;
    margin: 0 auto;
  }
`