import styled from "styled-components";

import { theme, device } from "../../constants";

export const PplContainer = styled.div`
  outline: solid 2px ${theme.charlie};
  height: 20vh;
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  overflow: auto hidden;
  @media (orientation: landscape), ${device.laptop} {
    overflow: hidden scroll;
    align-items: unset;
    flex-wrap: wrap;
  }
  @media (orientation: landscape) {
    width: 30%;
    height: 50vh;
  }
  @media ${device.laptop}{
    height: 355px;
  }
`;