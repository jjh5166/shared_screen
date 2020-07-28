

import { ModalContainer, ModalX, ModalContent } from "./styled";

import { useModalState, useModalDispatch } from "../../context/modal";
import OverlayItem from "../OverlayItem";

const Modal = () => {
  const { isOpen, content, cursor } = useModalState();
  const modalDispatch = useModalDispatch();
  if (!isOpen) { return null };
  console.log("content", content)
  return (
    <ModalContainer displayed={isOpen}>
      <ModalX onClick={() => { modalDispatch({ type: "CLOSE" }) }} />
      <ModalContent>
        {
          !!content &&
          <OverlayItem film={content[cursor]} />
        }
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal