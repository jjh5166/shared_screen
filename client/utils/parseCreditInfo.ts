export function parseCreditInfo(arr: Array<any>) {
  return arr.reduce(
    (ob: any, item: any) => {
      let des: Array<any> = Object.values(item)
      return { ...ob, [des[0]]: { ...des[1], id: parseInt(des[1].id) } }
    }, {}
  )
}