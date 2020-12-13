import styled from 'styled-components';
import { device } from '../../constants';

export const InfoTextCont = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
  background: #0e0c0ce6;
  border-radius: 30px;
  padding: 15px;
  width: 75%;
  overflow: scroll;
  @media only screen and (orientation: landscape) {
    max-height: calc(100vh - 100px);
  }
  @media ${device.tablet} {
    width: 50%;
  }
`
export const HoverInfo = styled.div`
  color: #fff;
  &:hover ${InfoTextCont} {
    display: block;
  } 
`