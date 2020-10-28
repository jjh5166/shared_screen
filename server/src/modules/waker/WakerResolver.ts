import { Resolver, Query } from "type-graphql";


@Resolver()
export class WakerResolver {

  @Query(() => String)
  async wakeServer() {
    return "I'm awake!"
  }
}