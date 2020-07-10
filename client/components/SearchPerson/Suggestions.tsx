import { PersonData, SearchPersonResults, Film } from '../../interfaces';
import { SuggContainer, SuggCard, ImgSpacer, SuggImgContainer, SuggInfo, NameC } from './styled';
import { useContext } from 'react';
import { faceImagePath } from '../../utils/faceImagePath';
import { useSelectedState, SelectedUpdaterContext } from './selected-context';
import { useApolloClient } from '@apollo/react-hooks';
import { fetchCreditsQuery } from '../../graphql/fetchCredits';

const SuggestedPerson = ({ person }: any) => {
  const setSelected = useContext(SelectedUpdaterContext)
  const selectedPeople = useSelectedState()
  const client = useApolloClient()
  const clickHandler = (person: PersonData) => {
    setSelected([...selectedPeople, person])
    client.query({ query: fetchCreditsQuery, variables: { id: Number(person.id) } }).then(res => {
      console.log(res);
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