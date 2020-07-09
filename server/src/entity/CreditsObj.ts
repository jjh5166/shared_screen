import { ObjectType, Field } from "type-graphql";

import Film from "./Film";

@ObjectType()
export class SingleCredit {
  @Field()
  id?: number

  @Field(() => Film)
  info: Film;
}

@ObjectType()
export default class CreditsObj {
  @Field(() => [Number])
  filmIds: number[];

  @Field(() => [SingleCredit])
  credits: SingleCredit[];
}