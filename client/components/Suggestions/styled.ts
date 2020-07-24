import styled from "styled-components";
import { lighten } from "polished";

import { theme } from '../../constants';

export const SuggContainer = styled.ul<{ displayed: boolean }>`
  width: 100%;
  position: absolute;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;
  outline: solid ${theme.alpha} 2px;
  max-height: 380px;
  display: ${props => props.displayed ? 'block' : 'none'};
  background: ${lighten(0.1, theme.background)};
  z-index: 2;
  padding: 0;
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
export const SuggCard = styled.li<{ tabIndex: any }>`
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