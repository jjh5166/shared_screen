import { ObjectType, Field } from "type-graphql";
import Film from './Film';

@ObjectType()
export default class CreditList {
  @Field(() => [Film])
  credits: Film[];
}