import { ObjectType, Field, ID } from "type-graphql";
import { ActorCredit } from './ActorCredit';

@ObjectType()
export class CastCrew {
  @Field(() => ID)
  id?: number;

  @Field(() => [String])
  directedBy?: string[]

  @Field(() => [String])
  writtenBy: string[]

  @Field(() => [ActorCredit])
  cast: ActorCredit[]
}