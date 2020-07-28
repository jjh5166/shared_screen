import { createContext, ReactNode, useReducer } from 'react';

import createUseContext from '../../utils/createUseContext';

const ModalStateContext = createContext<any>(null);
const ModalUpdateContext = createContext<any>(null);

type ModalState = {
  isOpen: boolean,
  content: any[] //films or people
};

type ModalAction =
  | { type: "OPEN"; payload: { content: any } }
  | { type: "CLOSE" };

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN':
      return {
        isOpen: true,
        content: action.payload.content
      }
    case 'CLOSE':
      return {
        isOpen: false,
        content: []
      }
    default:
      return state;
  }
}
const modalInitial = {
  isOpen: false,
  content: []
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