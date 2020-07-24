import { useApolloClient } from '@apollo/react-hooks';

import { PersonData, Film } from '../../interfaces';
import { SuggCard, ImgSpacer, SuggImgContainer, SuggInfo, NameC } from './styled';
import { faceImagePath } from '../../utils/faceImagePath';
import { useSelectedDispatch, useSelectedState } from '../../context/selectedPeople';
import { useSharedDispatch } from '../../context/sharedCredits';
import { fetchCreditsQuery } from '../../graphql/fetchCredits';
import { useCreditsDispatch } from '../../context/credits';
import { useSearchContext } from '../../context/search';

const SuggestedPerson = ({ person }: { person: PersonData }) => {
  const selectedDispatch = useSelectedDispatch();
  const client = useApolloClient();
  const creditsDispatch = useCreditsDispatch();
  const sharedDispatch = useSharedDispatch();
  const selectedPeople = useSelectedState();
  const { handleSelection } = useSearchContext();
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
          handleSelection();
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

export default SuggestedPerson;