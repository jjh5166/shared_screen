import { Film } from "../../interfaces";
import { posterImagePath } from "../../utils/posterImagePath";
import { PosterContainer, ModalContentContainer, DescriptionContainer } from "./styled";


export default ({ film }: { film: Film }) => {

  return (
    <ModalContentContainer onClick={(e) => { e.stopPropagation(); }}>
      <PosterContainer>
        <img src={posterImagePath(film.posterPath, 342)} />
      </PosterContainer>
      <DescriptionContainer>{film.overview}</DescriptionContainer>
    </ModalContentContainer>
  )
}