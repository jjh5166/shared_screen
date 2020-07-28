import { gql } from "apollo-boost";

export const fetchCreditsQuery = gql`
  query fetchCredits($id: Int!) {
    fetchCredits(id: $id) {
	    filmIds
	    credits{
        id
        info{
          id
          title
          posterPath
          releaseDate
          overview
        }
      }
    }
  }
`;
