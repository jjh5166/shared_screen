import { createContext, useContext, useReducer } from 'react'
import { PersonData } from '../../interfaces';

const SelectedStateContext = createContext<any>(null);
const SelectedDispatchContext = createContext<any>(null);

function addItem(array: any, payload: any) {
  let newArray = array.slice()
  newArray.push(payload)
  return newArray
}
type SelectedState = [];
type SelectedAction =
  | { type: "ADD"; payload: PersonData }
  | { type: "REMOVE"; payload: string };

function selectedReducer(state: SelectedState, action: SelectedAction): SelectedState {
  switch (action.type) {
    case 'ADD':
      return addItem(state, action.payload);
    case 'REMOVE':
      return [];
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
  const creditsDispatch = useContext(SelectedDispatchContext)

  return creditsDispatch
}

export { SelectedProvider, useSelectedState, useSelectedDispatch };