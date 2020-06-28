import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import CreditList from '../entity/CreditList';

export default class MovieAPI extends RESTDataSource {

  baseURL = 'https://api.themoviedb.org/';

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${process.env.TMDb_Token}`);
  }

  filmReducer(film: any) {
    return {
      id: film.id,
      title: film.title,
      releaseDate: film.release_date,
      posterPath: film.poster_path,
      overview: film.overview
    }
  }

  personReducer(person: any) {
    return {
      id: person.id || 0,
      name: person.name,
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

  async fetchCredits(personId: number): Promise<CreditList> {
    const res = await this.get(`/3/person/${personId}/movie_credits`);
    const credits: any = { credits: [] }
    if (Array.isArray(res.cast)) {
      res.cast.forEach((cred: any) => {
        credits.credits.push({
          id: cred.id,
          title: cred.title,
          posterPath: cred.poster_path,
          overview: cred.overview,
        })
      })
    }
    return credits;
  }
}