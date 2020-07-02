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
          {person.knownFor && person.knownFor.map((film: Film, i: number) => {
            return <span key={film.id}>{film.title && i > 0 && ',  '}{film.title}</span>
          })}
        </div>
      </SuggInfo>
    </SuggCard>
  )
}

export default ({ data }: SearchPersonResults) => {
  return (
    <SuggContainer>
      {
        data.map((person: PersonData) => {
          return <SuggestedPerson key={person.id} person={person} />
        })
      }
    </SuggContainer>
  )
}