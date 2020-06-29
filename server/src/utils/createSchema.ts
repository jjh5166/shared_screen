import { FetchCreditsResolver } from '../modules/person/FetchCreditsResolver';
import { SearchPersonResolver } from '../modules/person/SearchPersonResolver';
import { buildSchema } from "type-graphql";

export const createSchema = () => buildSchema({
  resolvers: [SearchPersonResolver, FetchCreditsResolver],
});