import styled from "styled-components";

import { theme, device } from "../../constants";

export const ResContainer = styled.div`
  height: 235px;
  width: 80%;
  padding: 10px;
  outline: solid 2px ${theme.charlie};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden scroll;
  div{
    margin: 5px;
  }
  @media ${device.tablet}, (orientation: landscape) { 
    max-height: 75%;
    width: 45%;
  }
`;