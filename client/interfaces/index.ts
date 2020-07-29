export type Person = {
  id: number
  name: string
  imagePath: string
  knownAs: string
  knownFor: Film[]
}

export type SearchPersonResults = {
  data: Person[];
}

export type Film = {
  id: number
  title: string
  releaseDate: string;
  posterPath: string;
  overview: string;
}