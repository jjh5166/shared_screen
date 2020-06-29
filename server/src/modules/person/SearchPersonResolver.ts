import { MyContext } from '../../types/MyContext'
import Person from '../../entity/Person';
import { Resolver, Query, Arg, Ctx } from "type-graphql";

@Resolver()
export class SearchPersonResolver {

  @Query(() => [Person])
  async searchPerson(
    @Arg("searchTerm") searchTerm: string, @Ctx() ctx: MyContext
  ) {
    if (searchTerm.length < 3) {
      return null
    }
    return ctx.dataSources.movieAPI.searchPerson(searchTerm)
  }
}