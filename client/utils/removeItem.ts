export default function removeItem(array: any, payload: any) {
  return array.filter((item: any) => item !== payload)
}