import styled from "styled-components";
import { theme } from '../../constants';

export const ResContainer = styled.div`
  height: 75%;
  width: 45%;
  padding: 10px;
  outline: solid 2px ${theme.charlie};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden scroll;
`;