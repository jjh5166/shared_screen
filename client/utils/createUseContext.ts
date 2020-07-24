import { useContext } from "react";

export default function (name: string, type: string, context: any): any {
  let fnName = `use${name}${type}`;
  return (
    function () {
      const returnValue = useContext(context)
      if (typeof returnValue === undefined) {
        throw new Error(`${fnName} must be used within a ${name}Provider`)
      }
      return returnValue
    }
  )
}