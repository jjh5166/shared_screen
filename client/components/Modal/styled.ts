import styled from "styled-components";

export const ModalContainer = styled.div<{ displayed: boolean }>`
  display: ${props => props.displayed ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 100;
`
export const ModalContent = styled.div``

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