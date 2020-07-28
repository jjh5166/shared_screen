import React, { createContext, useContext } from 'react';

import { ResContainer } from "./styled";
import { ItemCard } from '../Card';
import { useSharedState } from '../../context/sharedCredits';
import { useCreditsState } from '../../context/credits';
import { posterImagePath } from '../../utils/posterImagePath';
import { Film } from '../../interfaces';
import { useModalDispatch } from '../../context/modal';

const ResultsContext = createContext<any>(null);

const FilmCard = ({ film, itemIndex }: { film: Film, itemIndex: number }) => {
  const modalDispatch = useModalDispatch();
  const modalContent = useContext(ResultsContext)
  return (
    <ItemCard
      name={film.title}
      imgPath={posterImagePath(film.posterPath, 185)}
      clickHandler={() => { modalDispatch({ type: "OPEN", payload: { content: modalContent, cursor: itemIndex } }) }}
    />
  );
}

export default () => {
  const credits = useCreditsState();
  const shared = useSharedState();
  const sharedCredits: Array<Film> = [];
  if (!!shared.shared.length) {
    shared.shared.forEach((cred: number) => {
      sharedCredits.push(credits[Object.keys(shared.perPerson)[0]][cred])
    });
  }

  return (
    <ResContainer>
      <ResultsContext.Provider value={sharedCredits}>
        {sharedCredits.map((credit: Film, i: number) => {
          return (
            <FilmCard
              key={credit.id}
              film={credit}
              itemIndex={i}
            />
          )
        })}
      </ResultsContext.Provider>
    </ResContainer>
  )
}