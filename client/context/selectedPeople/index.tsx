import { createContext, useContext, useReducer } from 'react';

import { PersonData } from '../../interfaces';
import addItem from '../../utils/addItem';
import removeItem from '../../utils/removeItem';

const SelectedStateContext = createContext<any>(null);
const SelectedDispatchContext = createContext<any>(null);

type SelectedState = [];
type SelectedAction =
  | { type: "ADD"; payload: PersonData }
  | { type: "REMOVE"; payload: string };

function selectedReducer(state: SelectedState, action: SelectedAction): SelectedState {
  switch (action.type) {
    case 'ADD':
      return addItem(state, action.payload);
    case 'REMOVE':
      return removeItem(state, action.payload);
    default:
      return state;
  }
}

function SelectedProvider({ children }: any) {
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