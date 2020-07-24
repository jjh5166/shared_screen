import { createContext } from 'react';

import createUseContext from '../../utils/createUseContext';

export type SearchContextValues = {
  searchTerm: string,
  isOpen: boolean,
  handleSelection: () => void,
  hideSuggestions: () => void,
}
export const SearchContext = createContext<any>(null);

export const useSearchContext = createUseContext("Search", "Term", SearchContext);