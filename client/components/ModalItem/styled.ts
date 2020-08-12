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
  height: 80%;
  width: 80%;
  z-index: 110;
  line-height: 1.5;
`
export const DescriptionContainer = styled.div`
  overflow: auto;
  grid-area: desc;
`
export const PosterContainer = styled.div`
  position: relative;
  height: fit-content;
  background: black;
  grid-area: poster;
  img{
    border: solid 2px ${theme.bravo}
  }
`
export const MovieTitle = styled.div`
  font-size: 2em;
  grid-area: title;
`
export const UnderTitle = styled.div`
  grid-area: under;
`
export const ModalTop = styled.div`
  height: 64%;
  display: grid;
  grid-template-columns: 30% 5% 1fr;
  grid-template-rows: 25% 15% 60%;
  grid-template-areas: 
    "poster . title"
    "poster . under"
    "poster . desc";
`
export const ModalBottom = styled.div`
  height: 30%;
  width: 100%;
`