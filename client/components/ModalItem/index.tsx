
import { useQuery } from "@apollo/react-hooks";

import { Film } from "../../interfaces";
import { posterImagePath } from "../../utils/posterImagePath";
import { NoImageOverlay } from "../Card/styled";
import { fetchFilmDetailsQuery } from "../../graphql/fetchFilmDetails";
import {
  PosterContainer, ModalContentContainer, DescriptionContainer, ModalTop,
  MovieTitle, UnderTitle, TapeContainer, CastCredit, ModalBottom
} from "./styled";


export default ({ film }: { film: Film }) => {
  const { data } = useQuery(fetchFilmDetailsQuery, {
    variables: { id: film.id },
  });
  console.log(data)
  const TitleAndRelease: string = film.title + (!!film.releaseDate ? ` (${film.releaseDate.slice(0, 4)})` : "");

  return (
    <ModalContentContainer onClick={(e) => { e.stopPropagation(); }}>
      <ModalTop>
        <PosterContainer>
          <img src={posterImagePath(film.posterPath, 185)} />
          {!film.posterPath && <NoImageOverlay text={film.title} />}
        </PosterContainer>
        <MovieTitle>{TitleAndRelease}</MovieTitle>
        <UnderTitle>{data && !!data.fetchFilmDetails.genres && data.fetchFilmDetails.genres.join(", ")}</UnderTitle>
        <DescriptionContainer>{film.overview}</DescriptionContainer>
      </ModalTop>
      {
        data &&
        !!data.fetchFilmDetails &&
        <MoreFilmDetails details={data.fetchFilmDetails} />
      }
    </ModalContentContainer>
  )
};

const MoreFilmDetails = ({ details }: any) => {
  const { castCrew } = details;
  return (
    <ModalBottom>
      <span>Directed By:{!!castCrew.directedBy.length ? ` ${castCrew.directedBy.join(", ")}` : "  (uncredited)"}</span><br />
      <span>Written By:{!!castCrew.writtenBy.length ? ` ${castCrew.writtenBy.join(", ")}` : "  (uncredited)"}</span><br />
      {!!castCrew.cast && <CastTape cast={castCrew.cast} />}
    </ModalBottom>
  )
}
const CastTape = ({ cast }: any) => {
  return (
    <TapeContainer>
      {
        cast.map((member: any, i: number) => (
          <CastCredit key={member.role + i}>
            <div>{member.role}</div>
            <div>{member.name}</div>
          </CastCredit>
        )
        )}
    </TapeContainer>
  )
}