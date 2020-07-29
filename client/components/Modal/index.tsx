

import { ModalContainer, ModalX, ModalContent, ScrollArrow } from "./styled";

import { useModalState, useModalDispatch } from "../../context/modal";
import ModalItem from "../ModalItem";

const Modal = () => {
  const { isOpen, content, cursor } = useModalState();
  const modalDispatch = useModalDispatch();
  if (!isOpen) { return null };
  return (
    <ModalContainer displayed={isOpen} onClick={() => { modalDispatch({ type: "CLOSE" }) }}>
      <ModalX onClick={() => { modalDispatch({ type: "CLOSE" }) }} />
      <ScrollArrow direction="left" onClick={(e) => {
        e.stopPropagation();
        modalDispatch({ type: "SCROLL_LEFT" })
      }} />
      <ModalContent>
        {
          !!content &&
          <ModalItem film={content[cursor]} />
        }
      </ModalContent>
      <ScrollArrow direction="right" onClick={(e) => {
        e.stopPropagation();
        modalDispatch({ type: "SCROLL_RIGHT" })
      }} />
    </ModalContainer>
  )
}

export default Modal