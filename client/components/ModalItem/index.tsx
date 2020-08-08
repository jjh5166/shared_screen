
import { useQuery } from "@apollo/react-hooks";

import { Film } from "../../interfaces";
import { posterImagePath } from "../../utils/posterImagePath";
import { NoImageOverlay } from "../Card/styled";
import { fetchFilmDetailsQuery } from "../../graphql/fetchFilmDetails";
import { PosterContainer, ModalContentContainer, DescriptionContainer, ModalTop, MovieTitle, UnderTitle } from "./styled";


export default ({ film }: { film: Film }) => {
  const { data } = useQuery(fetchFilmDetailsQuery, {
    variables: { id: film.id },
  });

  return (
    <ModalContentContainer onClick={(e) => { e.stopPropagation(); }}>
      <ModalTop>
        <PosterContainer>
          <img src={posterImagePath(film.posterPath, 185)} />
          {!film.posterPath && <NoImageOverlay text={film.title} />}
        </PosterContainer>
        <MovieTitle>{`${film.title} (${film.releaseDate.slice(0, 4)})`}</MovieTitle>
        <UnderTitle>{!!data.fetchFilmDetails.genres && data.fetchFilmDetails.genres}</UnderTitle>
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
    <div>
      <span>Directed By: {castCrew.directedBy}</span><br />
      <span>Written By: {castCrew.writtenBy}</span><br />
      <span>Cast: {castCrew.cast}</span><br />
    </div>
  )
}