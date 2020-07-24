import { createContext } from 'react';

import createUseContext from '../../utils/createUseContext';

export const SearchContext = createContext<any>(null);

export const useSearchContext = createUseContext("Search", "Term", SearchContext);