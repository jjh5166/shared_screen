import styled from "styled-components";

import { theme, device } from "../../constants";
import { CardContainer } from "../Card/styled";

export const ResContainer = styled.div`
  height: 235px;
  width: 80%;
  padding: 10px;
  outline: solid 2px ${theme.charlie};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden scroll;
  @media ${device.tablet}, (orientation: landscape) { 
    max-height: 75%;
    width: 45%;
  }
  ${CardContainer}{
    margin: 5px;
  }
`;