import { CastCrew } from './CastCrew';
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class FilmDetails {
  @Field(() => ID)
  id?: number;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field({ nullable: true })
  imdbId?: string;

  @Field({ nullable: true })
  runtime?: number;

  @Field({ nullable: true })
  rating?: number;

  @Field(() => CastCrew, { nullable: true })
  castCrew?: CastCrew;
}