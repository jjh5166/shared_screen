import { gql } from "apollo-boost";

export const searchPersonQuery = gql`
  query searchPerson($searchTerm: String!) {
    searchPerson(searchTerm: $searchTerm) {
      name
      id
      imagePath
      knownAs
      knownFor{
        id
        title
        releaseDate
        posterPath
      }
    }
  }
`;