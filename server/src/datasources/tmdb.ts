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
  genresReducer(genres: any) {
    return genres.reduce((arr: any, item: any) => {
      return arr.concat(item.name)
    }, [])
  }
  castCrewReducer(credits: any) {
    let directors = new Set<string>();
    let writers = new Set<string>();
    credits.crew.forEach((el: any) => {
      if (el.job === "Director") {
        directors.add(el.name)
      }
      if (el.job === "Screenplay") {
        writers.add(el.name)
      }
    });
    let cast = credits.cast.reduce((arr: any, item: any) => {
      return arr.concat({ role: item.character, name: item.name })
    }, [])
    return {
      directedBy: Array.from(directors),
      writtenBy: Array.from(writers),
      cast: cast
    }
  }
  async searchPerson(searchTerm: string) {
    const response = await this.get('/3/search/person', { query: searchTerm });
    const results = response.results
    return Array.isArray(results)
      ? results.map(person => this.personReducer(person)) : [];
  }
  async fetchFilmDetails(filmId: number) {
    const res = await this.get(`3/movie/${filmId}?append_to_response=credits`)
    return {
      id: res.id,
      genres: this.genresReducer(res.genres),
      imdbId: res.imdb_id,
      runtime: res.runtime,
      rating: res.vote_average,
      castCrew: this.castCrewReducer(res.credits)
    }
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