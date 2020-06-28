import { MyContext } from '../../types/MyContext'
import { Resolver, Query, Arg, Ctx } from "type-graphql";
import CreditList from '../../entity/CreditList';


@Resolver()
export class FetchCreditsResolver {

  @Query(() => CreditList)
  async fetchCredits(
    @Arg("id") id: number, @Ctx() ctx: MyContext
  ) {
    return ctx.dataSources.movieAPI.fetchCredits(id)
  }
}