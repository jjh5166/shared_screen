import { ObjectType, Field, ID } from "type-graphql";
import Film from "./Film";

@ObjectType()
export default class Person {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  imagePath?: string;

  @Field(() => [Film])
  credits: Film[];

  @Field(() => [Film])
  knownFor: Film[];
}