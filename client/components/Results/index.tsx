import React from 'react';

import { ResContainer, FilmCardContainer } from "./styled"
import { useSharedState } from '../../context/sharedCredits';
import { useCreditsState } from '../../context/credits';
import { posterImagePath } from '../../utils/posterImagePath';
import { Film } from '../../interfaces';

const FilmCard = ({ film }: { film: Film }) => (
  <FilmCardContainer title={film.title}>
    <img src={posterImagePath(film.posterPath, 185)} />
  </FilmCardContainer>
)

const ResultsContainer = React.memo(function ResultsContainer() {
  const credits = useCreditsState();
  const sharedFilmIds = useSharedState();
  return (
    <ResContainer>
      {!!sharedFilmIds.shared.length &&
        sharedFilmIds.shared.map((film: number) => {
          return (
            <FilmCard
              key={film}
              film={credits[Object.keys(credits)[0]][film]}
            />
          )
        })}
    </ResContainer>
  )
})

export default ResultsContainer
