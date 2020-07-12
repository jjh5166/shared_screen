export default function removeProperty(original: any, property: any) {
  let { [property]: _, ...newObj } = original;
  return newObj
}