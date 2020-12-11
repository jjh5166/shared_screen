import React, { createContext, useContext } from 'react';

import { ResContainer } from "./styled";

import { useSharedState } from '../../context/sharedCredits';
import { useCreditsState } from '../../context/credits';
import { Film } from '../../interfaces';
import { useModalDispatch } from '../../context/modal';
import { ItemCard } from '../Card';

const ResultsContext = createContext<any>(null);

const FilmCard = ({ film, itemIndex }: { film: Film, itemIndex: number }) => {
  const modalDispatch = useModalDispatch();
  const modalContent = useContext(ResultsContext)
  return (
    <ItemCard
      type={"Film"}
      content={film}
      clickHandler={() => { modalDispatch({ type: "OPEN", payload: { content: modalContent, cursor: itemIndex } }) }}
    />
  );
}

const Results = () => {
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
      {
        Object.keys(shared.perPerson).length > 1 &&
        !sharedCredits.length &&
        <p>No Results</p>
      }
    </ResContainer>
  )
}

export default Results;