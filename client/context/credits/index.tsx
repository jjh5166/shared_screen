import { createContext, useReducer, ReactNode } from 'react';

import removeProperty from '../../utils/removeProperty';
import { parseCreditInfo } from '../../utils/parseCreditInfo';
import createUseContext from '../../utils/createUseContext';

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
function CreditsProvider({ children }: { children: ReactNode }) {
  const [creditState, creditDispatch] = useReducer(creditsReducer, {})
  return (
    <CreditsStateContext.Provider value={creditState}>
      <CreditsDispatchContext.Provider value={creditDispatch}>
        {children}
      </CreditsDispatchContext.Provider>
    </CreditsStateContext.Provider>
  )
}

const useCreditsState = createUseContext("Credits", "State", CreditsStateContext);

const useCreditsDispatch = createUseContext("Credits", "Dispatch", CreditsDispatchContext);

export { CreditsProvider, useCreditsState, useCreditsDispatch };