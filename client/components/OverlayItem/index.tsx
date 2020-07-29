import { Film } from "../../interfaces";
import { posterImagePath } from "../../utils/posterImagePath";
import { PosterContainer, ModalContentContainer } from "./styled";


export default ({ film }: { film: Film }) => {

  return (
    <ModalContentContainer onClick={(e) => { e.stopPropagation(); }}>
      <PosterContainer>
        <img src={posterImagePath(film.posterPath, 500)} />
      </PosterContainer>
      <div>{film.overview}</div>
    </ModalContentContainer>
  )
}