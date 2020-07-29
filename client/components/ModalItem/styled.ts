import styled from "styled-components";
import { theme } from "../../constants";

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  height: 100%;
  width: 70%;
  z-index: 110;
  line-height: 1.5;
`
export const DescriptionContainer = styled.div`
  height: 130px;
  overflow: hidden auto;
`
export const PosterContainer = styled.div`
  height: fit-content;
  img{
    border: solid 2px ${theme.bravo}
  }
`
