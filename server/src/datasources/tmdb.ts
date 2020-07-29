import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

import CreditsObj, { SingleCredit } from '../entity/CreditsObj';

const knownAsMap: Record<string, string | object> = {
  Acting: "Actor",
  Writing: "Writer",
  Directing: "Director"
}

export default class MovieAPI extends RESTDataSource {

  baseURL = 'https://api.themoviedb.org/';

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${process.env.TMDb_Token}`);
  }

  filmReducer(film: any) {
    return {
      id: film.id,
      title: film.title || film.name,
      releaseDate: film.release_date || film.first_air_date,
      posterPath: film.poster_path,
      overview: film.overview
    }
  }

  personReducer(person: any) {
    return {
      id: person.id || 0,
      name: person.name,
      knownAs: knownAsMap[person.known_for_department],
      knownFor: person.known_for.map((film: any) => this.filmReducer(film)) || [],
      imagePath: person.profile_path
    };
  }

  async searchPerson(searchTerm: string) {
    const response = await this.get('/3/search/person', { query: searchTerm });
    const results = response.results
    return Array.isArray(results)
      ? results.map(person => this.personReducer(person)) : [];
  }

  async fetchCredits(personId: number) {
    const res = await this.get(`/3/person/${personId}/movie_credits`);
    const wroteOrDirected = ["Writing", "Directing"];
    const filmIds = new Set<number>();
    const credits = new Set<SingleCredit>();

    if (Array.isArray(res.cast)) {
      res.cast.forEach((cred: any) => {
        filmIds.add(cred.id);
        credits.add({ id: cred.id, info: this.filmReducer(cred) })
      })
    }
    if (Array.isArray(res.crew)) {
      res.crew.forEach((cred: any) => {
        if (wroteOrDirected.includes(cred.department)) {
          filmIds.add(cred.id);
          credits.add({ id: cred.id, info: this.filmReducer(cred) })
        }
      })
    }

    const creditsObj: CreditsObj = {
      filmIds: Array.from(filmIds),
      credits: Array.from(credits)
    }
    return creditsObj;
  }
}