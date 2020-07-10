import { Resolver, Query, Arg, Ctx, Int } from "type-graphql";

import { MyContext } from '../../types/MyContext'
import CreditsObj from '../../entity/CreditsObj';

@Resolver()
export class FetchCreditsResolver {

  @Query(() => CreditsObj)
  async fetchCredits(
    @Arg("id", () => Int) id: number, @Ctx() ctx: MyContext
  ) {
    return ctx.dataSources.movieAPI.fetchCredits(id)
  }
}