import { useState } from "react";

import { ModalContainer, ModalX, ModalContent } from "./styled";
import OverlayItem from "../OverlayItem";
import { Film } from "../../interfaces";

const Modal = () => {
  const [displayed, setDisplayed] = useState(false);
  return (
    <ModalContainer displayed={displayed}>
      <ModalX onClick={() => { setDisplayed(false) }} />
      <ModalContent>
        {(film: Film) => <OverlayItem film={film} />}
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal