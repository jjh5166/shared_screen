import { buildSchema } from "type-graphql";

import { FetchCreditsResolver } from '../modules/person/FetchCreditsResolver';
import { SearchPersonResolver } from '../modules/person/SearchPersonResolver';
import { FetchFilmDetailsResolver } from '../modules/film/FetchFilmDetailsResolver';

export const createSchema = () => buildSchema({
  resolvers: [SearchPersonResolver, FetchCreditsResolver, FetchFilmDetailsResolver],
});