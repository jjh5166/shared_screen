import { Resolver, Query, Arg, Ctx, Int } from "type-graphql";

import { MyContext } from '../../types/MyContext'
import FilmDetails from "../../entity/FilmDetails";


@Resolver()
export class FetchFilmDetailsResolver {

  @Query(() => FilmDetails)
  async fetchFilmDetails(
    @Arg("id", () => Int) id: number, @Ctx() ctx: MyContext
  ) {
    return ctx.dataSources.movieAPI.fetchFilmDetails(id)
  }
}