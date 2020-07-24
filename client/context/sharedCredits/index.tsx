import { createContext, useReducer, ReactNode } from 'react';

import removeProperty from '../../utils/removeProperty';
import createUseContext from '../../utils/createUseContext';

const SharedStateContext = createContext<any>(null);
const SharedDispatchContext = createContext<any>(null);

type SharedState = {
  shared: number[],
  perPerson: {}
};

type SharedAction =
  | { type: "ADD"; payload: { id: number, films: Array<number> } }
  | { type: "REMOVE"; payload: number };

function setSharedProperty(perPerson: any): Array<number> {
  let values: Array<number> = Object.values(perPerson)
  if (values.length < 2) {
    return []
  }
  return values.reduce(
    (arr: any, next: any, i: number) => {
      if (i === 0) {
        return next
      } else {
        return arr.filter((x: any) => next.includes(x))
      }
    }, []
  )
};

function setSharedState(perPerson: any): SharedState {
  let newState: SharedState = {
    shared: [],
    perPerson: perPerson
  }
  newState.shared = setSharedProperty(newState.perPerson)
  return newState;
};

export function sharedReducer(state: SharedState, action: SharedAction): SharedState {
  switch (action.type) {
    case 'ADD':
      return setSharedState({
        ...state.perPerson,
        [action.payload.id]: action.payload.films
      })
    case 'REMOVE':
      return setSharedState(removeProperty(state.perPerson, action.payload))
    default:
      return state;
  }
};

const initialSharedCreditState = {
  shared: [],
  perPerson: {}
};

function SharedProvider({ children }: { children: ReactNode }) {
  const [sharedState, sharedDispatch] = useReducer(sharedReducer, initialSharedCreditState)
  return (
    <SharedStateContext.Provider value={sharedState}>
      <SharedDispatchContext.Provider value={sharedDispatch}>
        {children}
      </SharedDispatchContext.Provider>
    </SharedStateContext.Provider>
  )
}

const useSharedState = createUseContext("Shared", "State", SharedStateContext);

const useSharedDispatch = createUseContext("Shared", "Dispatch", SharedDispatchContext);

export { SharedProvider, useSharedState, useSharedDispatch };