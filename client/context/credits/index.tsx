import { createContext, useContext, useReducer } from 'react'

const CreditsStateContext = createContext<any>(null);
const CreditsDispatchContext = createContext<any>(null);

type CreditState = {};
type CreditAction =
  | { type: "ADD"; payload: { id: number, info: any } }
  | { type: "REMOVE"; payload: string };

function creditsReducer(state: CreditState, action: CreditAction): CreditState {
  switch (action.type) {
    case 'ADD':
      return { ...state, [action.payload.id]: action.payload.info };
    case 'REMOVE':
      return { ...state };
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