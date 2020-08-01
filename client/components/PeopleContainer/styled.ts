import styled from "styled-components";

import { theme, device } from "../../constants";

export const PplContainer = styled.div`
  outline: solid 2px ${theme.charlie};
  height: 110px;
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  @media (orientation: landscape) {
    flex-wrap: wrap;
    overflow: hidden scroll;
    width: 30%;
    height: 75%;
  }
  @media ${device.laptop}{
    height: 355px;
    overflow: hidden scroll;
    flex-wrap: wrap;
  }
`;