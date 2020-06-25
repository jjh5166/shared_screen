import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

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
}