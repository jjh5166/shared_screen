import styled from "styled-components";

import { theme, device } from "../../constants";

export const PplContainer = styled.div`
  outline: solid 2px ${theme.charlie};
  height: 110px;
  width: 80%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  @media ${device.tablet}, (orientation: landscape) { 
    height: 75%;
    width: 30%;
    overflow: hidden scroll;
    flex-wrap: wrap;
  }
`;