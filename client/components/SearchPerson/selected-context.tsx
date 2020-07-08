import { createContext, useState, useContext } from 'react'
import { PersonData } from '../../interfaces';

const SelectedStateContext = createContext<any>(null);
export const SelectedUpdaterContext = createContext<any>(null);

function SelectedProvider({ children }: any) {
  const [selectedPeople, updateSelectedPpl] = useState<PersonData[]>([]);
  return (
    <SelectedStateContext.Provider value={selectedPeople}>
      <SelectedUpdaterContext.Provider value={updateSelectedPpl}>
        {children}
      </SelectedUpdaterContext.Provider>
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

export { SelectedProvider, useSelectedState };