import { Fragment, useEffect } from 'react';
import { Query } from 'react-apollo';

import { PersonData } from '../../interfaces';
import { SuggContainer } from './styled';
import { searchPersonQuery } from '../../graphql/searchPerson';
import SuggestedPerson from './SuggestedPerson';

type SuggestionsProps = { searchTerm: string, displayed: boolean };

export default ({ searchTerm, displayed }: SuggestionsProps) => {

  const onKeyDown = (e: any) => {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    let active = document.activeElement as HTMLElement;
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
    if (displayed) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [displayed])
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
              <SuggContainer displayed={displayed}>
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