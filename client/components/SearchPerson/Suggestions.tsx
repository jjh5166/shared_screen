import { PersonData, SearchPersonResults, Film } from '../../interfaces';
import { SuggContainer, SuggCard, ImgSpacer, SuggImgContainer, SuggInfo, NameC } from './styled';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w92/';

const SuggestedPerson = ({ person }: any) => {

  return (
    <SuggCard>
      <ImgSpacer>
        <SuggImgContainer>
          <img src={person.imagePath ? IMAGE_BASE_URL + person.imagePath : '/blank_face.jpg'} />
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