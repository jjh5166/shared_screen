

import { ModalContainer, ModalX, ModalContent, ScrollArrow } from "./styled";

import { useModalState, useModalDispatch } from "../../context/modal";
import ModalItem from "../ModalItem";
import { useEffect } from "react";

const Modal = () => {
  const { isOpen, content, cursor } = useModalState();
  const modalDispatch = useModalDispatch();

  const onKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      modalDispatch({ type: "CLOSE" });
    }
    if (e.key === 'ArrowLeft') {
      modalDispatch({ type: "SCROLL_LEFT" })
    }
    if (e.key === 'ArrowRight') {
      modalDispatch({ type: "SCROLL_RIGHT" })
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen])

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