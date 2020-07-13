import { useState, createContext, useEffect, useRef } from "react"
import { useQuery } from "@apollo/react-hooks";
import { DebounceInput } from 'react-debounce-input';

import { searchPersonQuery } from "../../graphql/searchPerson";
import Suggestions from "../Suggestions";
import PeopleContainer from "../PeopleContainer";
import Results from "../Results";
import { SearchContainer, PplResultsSection } from './styled'
import { SelectedProvider } from "../../context/selectedPeople";
import { CreditsProvider } from "../../context/credits";
import Compose from "../../utils/compose";
import { SharedProvider } from "../../context/sharedCredits";

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // console.log(data);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <Compose components={[SharedProvider, CreditsProvider, SelectedProvider]}>
      <SearchContainer ref={node}>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          onChange={async (e) => {
            updateSearch(e.target.value)
          }} />
        {!!searchTerm.length && data && <Suggestions data={data.searchPerson} displayed={open} />}
      </SearchContainer>
      <PplResultsSection>
        <PeopleContainer />
        <Results />
      </PplResultsSection>
    </Compose>
  )
}