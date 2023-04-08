import dayjs from "dayjs";
import { containsNumerical } from "../regex";
import { capitalizeString } from "./util";
import { TYPE_DEFINATION_PREFIX } from "../constants";


type TypeOf =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function"
  | "null"
  | "date"
  | Record<string, any>;

/**
 * should return the type of the value in string format
 * @param value ‘unknown’
 * @returns ‘TypeOf’
 */
export const valueToType = (value: unknown): TypeOf => {
  switch (typeof value) {
    case "object":
      if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        // TODO: handle array functionality
      } else {
        return objectToType(value);
        // TODO: handle object functionality
      }
    case "string":
      // Typescript can't detect the conditonal when we use switch case
      if (!containsNumerical(value as string) && dayjs(value as string).isValid()) {
        return "date";
      } else {
        return "string";
      }
    default:
      return typeof value;
  }
}

/**
 * ‘objectToType’ takes an object and returns a new object with its value types
 * @param obj ‘Record<string, any>’
 * @returns ‘Record<string, TypeOf>’
 */
export const objectToType = (
  obj: Record<string, any>
): Record<string, TypeOf> => {
  const result: Record<string, TypeOf> = {};
  const objectEntries = Object.entries(obj);
  // for loop is faster than forEach
  for (let i = 0; i < objectEntries.length; i++) {
    const [key, value] = objectEntries[i];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // the below line returns:
      //  {
      //    example: "Example",
      //    "$type$Example": {
      //      ...
      //    }
      //  }
      result[key] = capitalizeString(key) as TypeOf;
      result[TYPE_DEFINATION_PREFIX + capitalizeString(key)] = objectToType(value);
    } else {
      result[key] = valueToType(value);
    }
  }
  return result;
};
