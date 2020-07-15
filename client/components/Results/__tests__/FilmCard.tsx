import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FilmCardContainer } from '../styled';
import { posterImagePath } from '../../../utils/posterImagePath';
import { Film } from '../../../interfaces';

const testFilm = {
  id: 1,
  title: "Resevoir Dogs",
  releaseDate: "1992-09-02",
  posterPath: "/AjTtJNumZyUDz33VtMlF1K8JPsE.jpg",
  overview: "A botched robbery indicates a police informant, and the pressure mounts in the aftermath at a warehouse. Crime begets violence as the survivors -- veteran Mr. White, newcomer Mr. Orange, psychopathic parolee Mr. Blonde, bickering weasel Mr. Pink and Nice Guy Eddie -- unravel."
}

const FilmCard = ({ film }: { film: Film }) => (
  <FilmCardContainer title={film.title}>
    <img src={posterImagePath(film.posterPath, 185)} />
  </FilmCardContainer>
)

describe('FilmCard', () => {
  test('renders FilmCard component', () => {
    render(<FilmCard film={testFilm} />);

    screen.debug();
  });
});