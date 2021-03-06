import styled from "styled-components";
import { lighten } from 'polished';

import { theme, device } from "../../constants";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
  /* @media ${device.tablet}{
    width: 35%;
  } */
  input{
    text-indent: 5px;
    width: 100%;
    border-radius: 30px;
    background: ${lighten(0.1, theme.background)};
    border-color: ${theme.alpha};
    &:focus{
      box-shadow: ${theme.alpha};
      outline: ${theme.alpha};
    }
  };
`
export const PplResultsSection = styled.section`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media ${device.laptop}, (orientation: landscape) { 
    flex-direction: row;
  }
`
export const SearchWrapper = styled.div`
position: relative;
width: 70%;
display: flex;
svg{
  left: -38px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
    @media ${device.tablet}{
    width: 35%;
  }
`