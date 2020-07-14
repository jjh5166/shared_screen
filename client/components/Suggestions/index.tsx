import { useApolloClient } from '@apollo/react-hooks';

import { PersonData, SearchPersonResults, Film } from '../../interfaces';
import { faceImagePath } from '../../utils/faceImagePath';
import { useSelectedDispatch } from '../../context/selectedPeople';
import { fetchCreditsQuery } from '../../graphql/fetchCredits';
import { useCreditsDispatch } from '../../context/credits';
import { SuggContainer, SuggCard, ImgSpacer, SuggImgContainer, SuggInfo, NameC } from './styled';
import { useSharedDispatch } from '../../context/sharedCredits';

const SuggestedPerson = ({ person }: any) => {
  const selectedDispatch = useSelectedDispatch()
  const client = useApolloClient()
  const creditsDispatch = useCreditsDispatch()
  const sharedDispatch = useSharedDispatch()
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
    <SuggCard>
      <ImgSpacer>
        <SuggImgContainer>
          <img src={faceImagePath(person.imagePath, 92)} />
        </SuggImgContainer>
      </ImgSpacer>
      <SuggInfo
        onClick={async () => {
          clickHandler(person)
        }}
      >
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
type SuggestionsProps = SearchPersonResults & { displayed: boolean }

export default ({ data, displayed }: SuggestionsProps) => {
  return (
    <SuggContainer displayed={displayed}>
      {
        data.map((person: PersonData) => {
          return <SuggestedPerson key={person.id} person={person} />
        })
      }
    </SuggContainer>
  )
}