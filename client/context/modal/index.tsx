import { createContext, ReactNode, useReducer } from 'react';

import createUseContext from '../../utils/createUseContext';
import { Film, Person } from '../../interfaces';

const ModalStateContext = createContext<any>(null);
const ModalUpdateContext = createContext<any>(null);

type ModalState = {
  isOpen: boolean,
  content: (Person | Film)[],
  cursor: number
};

type ModalAction =
  | { type: "OPEN"; payload: { content: any, cursor: number } }
  | { type: "CLOSE" }
  | { type: "SCROLL_RIGHT" }
  | { type: "SCROLL_LEFT" };

const modalInitial = {
  isOpen: false,
  content: [],
  cursor: 0
}
function handleScroll(next: number, length: number) {
  if (next < 0) {
    return length - 1
  }
  if (next > (length - 1)) {
    return 0
  }
  return next
}
function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN':
      return {
        isOpen: true,
        content: action.payload.content,
        cursor: action.payload.cursor
      }
    case 'CLOSE':
      return modalInitial
    case 'SCROLL_RIGHT':
      return {
        ...state,
        cursor: handleScroll(state.cursor + 1, state.content.length)
      }
    case 'SCROLL_LEFT':
      return {
        ...state,
        cursor: handleScroll(state.cursor - 1, state.content.length)
      }
    default:
      return state;
  }
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [content, contentDispatch] = useReducer(modalReducer, modalInitial)
  return (
    <ModalStateContext.Provider value={content}>
      <ModalUpdateContext.Provider value={contentDispatch}>
        {children}
      </ModalUpdateContext.Provider>
    </ModalStateContext.Provider>
  )
}

const useModalState = createUseContext("Modal", "State", ModalStateContext);

const useModalDispatch = createUseContext("Modal", "Dispatch", ModalUpdateContext);

export { ModalProvider, useModalState, useModalDispatch }