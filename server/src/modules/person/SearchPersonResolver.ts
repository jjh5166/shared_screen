import { MyContext } from '../../types/MyContext'
import Person from '../../types/Person';
import { Resolver, Query, Arg, Ctx } from "type-graphql";

@Resolver()
export class SearchPersonResolver {

  @Query(() => [Person])
  async searchPerson(
    @Arg("searchTerm") searchTerm: string, @Ctx() ctx: MyContext
  ) {
    return ctx.dataSources.movieAPI.searchPerson(searchTerm)
  }
}