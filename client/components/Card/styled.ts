import styled from "styled-components";
import { transparentize } from 'polished';

import { theme } from '../../constants';

export const CloseX = styled.div`
position: absolute;
right: 0;
top: 0;
padding: 2px;
height: 15px;
width: 15px;
display: flex;
align-items: center;
justify-content: center;
&:before{
  content: "X"
}
`

export const CardOverlay = styled.div<{ text: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background-color: ${transparentize(.5, theme.alpha)};
  &::after{
    content: "${props => props.text}";
    text-align: center;
  }
`
export const CardContainer = styled.div`
  cursor: pointer;
  display: flex;
  height: 110px;
  width: 73px;
  position: relative;
  margin: 5px;
  color: ${theme.charlie};
  &:hover{
    ${CardOverlay}{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    outline: solid ${theme.bravo} 2px;
    ${CloseX} {
      display: flex;
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