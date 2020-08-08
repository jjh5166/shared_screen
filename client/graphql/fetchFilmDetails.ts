import { gql } from "apollo-boost";

export const fetchFilmDetailsQuery = gql`
  query fetchFilmDetails($id: Int!) {
	  fetchFilmDetails(id: $id){
      id,
      imdbId,
      rating,
      genres,
      castCrew{
        directedBy,
        writtenBy
        cast{
          role,
          name
        }
      }
    }
  }
`;
