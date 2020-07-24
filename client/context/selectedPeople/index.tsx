import { createContext, useReducer, ReactNode } from 'react';

import { PersonData } from '../../interfaces';
import removeProperty from '../../utils/removeProperty';
import createUseContext from '../../utils/createUseContext';

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

const useSelectedState = createUseContext("Selected", "State", SelectedStateContext);

const useSelectedDispatch = createUseContext("Selected", "Dispatch", SelectedDispatchContext);

export { SelectedProvider, useSelectedState, useSelectedDispatch };