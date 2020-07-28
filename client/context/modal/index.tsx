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
  | { type: "CLOSE" };

const modalInitial = {
  isOpen: false,
  content: [],
  cursor: 0
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