export type PersonData = {
  id: number
  name: string
  imagePath: string
  knownFor: {
    id: number
    title: string
    releaseData: string
    posterPath: string
  }
}

export type SearchPersonResults = {
  data: PersonData[];
}

export type Film = {
  id: number
  title: string
  releaseDate: string;
  posterPath: string;
  overview: string;
}