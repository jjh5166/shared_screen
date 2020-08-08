import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ActorCredit {
  @Field()
  role: string;
  @Field()
  name: string
};