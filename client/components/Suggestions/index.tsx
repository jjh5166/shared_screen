import { Fragment, useEffect } from 'react';
import { Query } from 'react-apollo';

import { PersonData } from '../../interfaces';
import { SuggContainer } from './styled';
import { searchPersonQuery } from '../../graphql/searchPerson';
import SuggestedPerson from './SuggestedPerson';
import { useSearchContext, SearchContextValues } from '../../context/search';

export default () => {
  const { searchTerm, isOpen, hideSuggestions }: SearchContextValues = useSearchContext();

  const onKeyDown = (e: any) => {
    if ([38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    let active = document.activeElement as HTMLElement;
    if (e.key === 'Escape') {
      hideSuggestions();
    }
    if (e.key === 'ArrowDown' && active.nextSibling) {
      let next = active.nextSibling as HTMLElement
      next.focus();
    }
    if (e.key === 'ArrowUp' && active.previousSibling) {
      let last = active.previousSibling as HTMLElement
      last.focus();
    }
    if (e.key === 'Enter') {
      active.click();
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen])
  return (
    <Query
      query={searchPersonQuery}
      variables={{ searchTerm: searchTerm }}
    >
      {({ data }: { data: any }) => {
        return (
          <Fragment>
            {!!data &&
              !!data.searchPerson.length &&
              <SuggContainer displayed={isOpen}>
                {
                  data.searchPerson.map((person: PersonData) => {
                    return <SuggestedPerson key={person.id} person={person} />
                  })
                }
              </SuggContainer>}
          </Fragment>
        )
      }}
    </Query>
  )
}