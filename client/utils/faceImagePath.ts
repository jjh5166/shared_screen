export function faceImagePath(path: string, width: number) {
  return path ? `https://image.tmdb.org/t/p/w${width}/` + path : '/blank_face.svg'
}