import styled from "styled-components";

export const ModalContainer = styled.div<{ displayed: boolean }>`
  display: ${props => props.displayed ? "flex" : "none"};
  align-items: center;
  justify-content: space-between;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 100;
`
export const ModalContent = styled.div`
z-index: 2;
`

export const ModalX = styled.div`
cursor: pointer;
font-size: 2em;
position: absolute;
right: 0;
top: 0;
padding: 18px;
display: flex;
align-items: center;
justify-content: center;
&:before{
  content: "X"
}
`
export const ScrollArrow = styled.div<{ direction: string }>`
z-index: 2;
cursor: pointer;
  font-size: 6em;
  &:before{
    content: "${props => props.direction === "left" ? "<" : ">"}";
  }
`
