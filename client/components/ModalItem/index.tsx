import { Film } from "../../interfaces";
import { posterImagePath } from "../../utils/posterImagePath";
import { PosterContainer, ModalContentContainer, DescriptionContainer } from "./styled";
import { NoImageOverlay } from "../Card/styled";


export default ({ film }: { film: Film }) => {

  return (
    <ModalContentContainer onClick={(e) => { e.stopPropagation(); }}>
      <PosterContainer>
        <img src={posterImagePath(film.posterPath, 342)} />
        {!film.posterPath && <NoImageOverlay text={film.title} />}
      </PosterContainer>
      <DescriptionContainer>{film.overview}</DescriptionContainer>
    </ModalContentContainer>
  )
}