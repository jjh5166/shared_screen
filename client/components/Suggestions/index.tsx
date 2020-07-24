import { useApolloClient } from '@apollo/react-hooks';

import { PersonData, Film } from '../../interfaces';
import { faceImagePath } from '../../utils/faceImagePath';
import { useSelectedDispatch, useSelectedState } from '../../context/selectedPeople';
import { fetchCreditsQuery } from '../../graphql/fetchCredits';
import { useCreditsDispatch } from '../../context/credits';
import { SuggContainer, SuggCard, ImgSpacer, SuggImgContainer, SuggInfo, NameC } from './styled';
import { useSharedDispatch } from '../../context/sharedCredits';
import { Query } from 'react-apollo';
import { searchPersonQuery } from '../../graphql/searchPerson';
import { Fragment, useEffect } from 'react';

const SuggestedPerson = ({ person }: any) => {
  const selectedDispatch = useSelectedDispatch();
  const client = useApolloClient();
  const creditsDispatch = useCreditsDispatch();
  const sharedDispatch = useSharedDispatch();
  const selectedPeople = useSelectedState();
  const clickHandler = async (person: PersonData) => {
    await selectedDispatch({ type: 'ADD', payload: person })
    await client.query({
      query: fetchCreditsQuery,
      variables: { id: Number(person.id) }
    }).then(res => {
      creditsDispatch({
        type: 'ADD',
        payload: { id: person.id, info: res.data.fetchCredits.credits }
      })
      sharedDispatch({
        type: 'ADD',
        payload: { id: person.id, films: res.data.fetchCredits.filmIds }
      })
    }).catch(err => console.log(err))
  }
  return (
    <SuggCard
      tabIndex="0"
      onClick={async () => {
        if (!selectedPeople[person.id]) {
          clickHandler(person);
        }
      }}>
      <ImgSpacer>
        <SuggImgContainer>
          <img src={faceImagePath(person.imagePath, 92)} />
        </SuggImgContainer>
      </ImgSpacer>
      <SuggInfo>
        <NameC><span>{person.name}</span></NameC>
        <div>
          {person.knownAs && <span>{person.knownAs}, </span>}
          {person.knownFor && person.knownFor.map((film: Film, i: number, array: Array<Film>) => (
            film.title && <span key={film.id}>{i > 0 && array[i - 1].title && ',  '}{film.title}</span>
          ))}
        </div>
      </SuggInfo>
    </SuggCard>
  )
}

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