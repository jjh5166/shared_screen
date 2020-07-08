import { useState, createContext, /*useEffect,*/ useLayoutEffect, useRef } from "react"
import { useQuery } from "@apollo/react-hooks";
import { DebounceInput } from 'react-debounce-input';

import { searchPersonQuery } from "../../graphql/searchPerson";
import Suggestions from "./Suggestions";
import PeopleContainer from "../PeopleContainer";
import Results from "../Results";
import { SearchContainer, PplResultsSection } from './styled'
import { SelectedProvider } from "./selected-context";

export const SearchContext = createContext<any>(null);

export default () => {
  const [searchTerm, updateSearch] = useState("");
  const { data } = useQuery(
    searchPersonQuery,
    { variables: { searchTerm: searchTerm } },
  );
  const node = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true);
  const handleClickOutside = (e: any) => {
    if (node.current && node.current.contains(e.target)) {
      setOpen(true);
      return;
    }
    setOpen(false);
  };

  useLayoutEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  // console response
  // useEffect(() => {
  //   console.log(data)
  //   return () => {
  //     // cleanup
  //   }
  // }, [data])
  return (
    <SelectedProvider>
      <SearchContainer ref={node}>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          onChange={async (e) => {
            updateSearch(e.target.value)
          }} />
        {searchTerm.length !== 0 && data && <Suggestions data={data.searchPerson} displayed={open} />}
      </SearchContainer>
      <PplResultsSection>
        <PeopleContainer />
        <Results />
      </PplResultsSection>
    </SelectedProvider>
  )
}