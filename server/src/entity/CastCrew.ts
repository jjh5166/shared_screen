import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class CastCrew {
  @Field(() => ID)
  id?: number;

  @Field(() => [String])
  directedBy?: string[]

  @Field(() => [String])
  writtenBy: string[]

  @Field(() => [String])
  cast: string[]
}