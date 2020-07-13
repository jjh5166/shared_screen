import { createContext, useContext, useReducer } from 'react';
import removeProperty from '../../utils/removeProperty';

const SharedStateContext = createContext<any>(null);
const SharedDispatchContext = createContext<any>(null);

type SharedState = {
  shared: number[],
  perPerson: {}
};
type SharedAction =
  | { type: "ADD"; payload: { id: number, films: Array<number> } }
  | { type: "REMOVE"; payload: number };


function setSharedProperty(perPerson: any): Array<any> {
  let values: Array<number> = Object.values(perPerson)
  if (values.length < 2) {
    return []
  }
  return values.reduce(
    (arr: any, next: any) => {
      if (arr.length === 0) {
        return next
      } else {
        return arr.filter((x: any) => next.includes(x))
      }
    }, []
  )
}
function setSharedState(state: any, action: any): SharedState {
  let newState: SharedState = {
    shared: [],
    perPerson: {
      ...state.perPerson,
      [action.payload.id]: action.payload.films
    }
  }
  newState.shared = setSharedProperty(newState.perPerson)
  return newState;
}
function sharedReducer(state: SharedState, action: SharedAction): SharedState {
  switch (action.type) {
    case 'ADD':
      return setSharedState(state, action)
    case 'REMOVE':
      return {
        ...state,
        perPerson: removeProperty(state.perPerson, action.payload)
      };
    default:
      return state;
  }
}
const initialSharedCreditState = {
  shared: [],
  perPerson: {}
};
function SharedProvider({ children }: any) {
  const [sharedState, sharedDispatch] = useReducer(sharedReducer, initialSharedCreditState)
  return (
    <SharedStateContext.Provider value={sharedState}>
      <SharedDispatchContext.Provider value={sharedDispatch}>
        {children}
      </SharedDispatchContext.Provider>
    </SharedStateContext.Provider>
  )
}

function useSharedState() {
  const sharedState = useContext(SharedStateContext)
  if (typeof sharedState === undefined) {
    throw new Error('useSelectedState must be used within a SelectedProvider')
  }
  return sharedState
}

function useSharedDispatch() {
  const sharedDispatch = useContext(SharedDispatchContext)
  if (typeof sharedDispatch === undefined) {
    throw new Error('sharedDispatch must be used within a SelectedProvider')
  }
  return sharedDispatch
}

export { SharedProvider, useSharedState, useSharedDispatch };