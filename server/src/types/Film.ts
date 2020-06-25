import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Film {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  releaseDate?: string;

  @Field({ nullable: true })
  posterPath?: string;
}