import { Film } from "../../interfaces";
import { posterImagePath } from "../../utils/posterImagePath";
import { PosterContainer } from "./styled";


export default ({ film }: { film: Film }) => {

  return (
    <PosterContainer>
      <img src={posterImagePath(film.posterPath, 500)} />
    </PosterContainer>
  )
}