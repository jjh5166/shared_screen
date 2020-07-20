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
`;