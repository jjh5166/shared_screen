import { createContext, useContext, useReducer, ReactNode } from 'react';

import { PersonData } from '../../interfaces';
import removeProperty from '../../utils/removeProperty';

const SelectedStateContext = createContext<any>(null);
const SelectedDispatchContext = createContext<any>(null);

type SelectedAction =
  | { type: "ADD"; payload: PersonData }
  | { type: "REMOVE"; payload: string };

function selectedReducer(state: {}, action: SelectedAction): {} {
  switch (action.type) {
    case 'ADD':
      return { ...state, [action.payload.id]: action.payload };
    case 'REMOVE':
      return removeProperty(state, action.payload);
    default:
      return state;
  }
}

function SelectedProvider({ children }: { children: ReactNode }) {
  const [selectedState, selectedDispatch] = useReducer(selectedReducer, [])
  return (
    <SelectedStateContext.Provider value={selectedState}>
      <SelectedDispatchContext.Provider value={selectedDispatch}>
        {children}
      </SelectedDispatchContext.Provider>
    </SelectedStateContext.Provider>
  )
}

function useSelectedState() {
  const selectedState = useContext(SelectedStateContext)
  if (typeof selectedState === undefined) {
    throw new Error('useSelectedState must be used within a SelectedProvider')
  }
  return selectedState
}

function useSelectedDispatch() {
  const selectedDispatch = useContext(SelectedDispatchContext)
  if (typeof selectedDispatch === undefined) {
    throw new Error('selectedDispatch must be used within a SelectedProvider')
  }
  return selectedDispatch
}

export { SelectedProvider, useSelectedState, useSelectedDispatch };