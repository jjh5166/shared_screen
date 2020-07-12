import { createContext, useContext, useReducer } from 'react';

import removeProperty from '../../utils/removeProperty';
import { parseCreditInfo } from '../../utils/parseCreditInfo';

const CreditsStateContext = createContext<any>(null);
const CreditsDispatchContext = createContext<any>(null);

type CreditState = {};
type CreditAction =
  | { type: "ADD"; payload: { id: number, info: any } }
  | { type: "REMOVE"; payload: number };

function creditsReducer(state: CreditState, action: CreditAction): CreditState {
  switch (action.type) {
    case 'ADD':
      return { ...state, [action.payload.id]: parseCreditInfo(action.payload.info) };
    case 'REMOVE':
      return removeProperty(state, action.payload);
    default:
      return state;
  }
}
function CreditsProvider({ children }: any) {
  const [creditState, creditDispatch] = useReducer(creditsReducer, {})
  return (
    <CreditsStateContext.Provider value={creditState}>
      <CreditsDispatchContext.Provider value={creditDispatch}>
        {children}
      </CreditsDispatchContext.Provider>
    </CreditsStateContext.Provider>
  )
}

function useCreditsState() {
  const creditsState = useContext(CreditsStateContext)
  if (typeof creditsState === undefined) {
    throw new Error('useCreditsState must be used within a CreditsProvider')
  }
  return creditsState
}

function useCreditsDispatch() {
  const creditsDispatch = useContext(CreditsDispatchContext)
  if (typeof creditsDispatch === undefined) {
    throw new Error('creditsDispatch must be used within a CreditsProvider')
  }
  return creditsDispatch
}

export { CreditsProvider, useCreditsState, useCreditsDispatch };