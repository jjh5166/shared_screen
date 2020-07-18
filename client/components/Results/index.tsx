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

export default () => {
  const credits = useCreditsState();
  const shared = useSharedState();

  return (
    <ResContainer>
      {!!shared.shared.length &&
        shared.shared.map((film: number) => {
          return (
            <FilmCard
              key={film}
              film={credits[Object.keys(shared.perPerson)[0]][film]}
            />
          )
        })}
    </ResContainer>
  )
}
