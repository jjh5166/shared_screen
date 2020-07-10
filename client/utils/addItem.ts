export default function addItem(array: any, payload: any) {
  let newArray = array.slice()
  newArray.push(payload)
  return newArray
}