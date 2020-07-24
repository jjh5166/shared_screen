export type PersonData = {
  id: number
  name: string
  imagePath: string
  knownAs: string
  knownFor: Film[]
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