import { capitalizeString, isDate, isPureObject } from "./util";
import { ARRAY_TYPE_PREFIX, TYPE_DEFINATION_PREFIX } from "../constants";


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
 * @param value `unknown`
 * @returns `TypeOf`
 */
export const valueToType = (value: unknown, key: string = ""): TypeOf => {
  switch (typeof value) {
    case "object":
      if (value === null) {
        return "null";
      } else if (Array.isArray(value)) {
        return arrayToType(key, value).typeDefination as TypeOf;
      } else {
        return objectToType(value);
      }
    case "string":
      // Typescript can't detect the conditonal when we use switch case
      if (isDate(value as string)) {
        return "date";
      } else {
        return "string";
      }
    default:
      return typeof value;
  }
}

/**
 * takes an object and returns a new object with its value types
 * @param obj `Record<string, any>`
 * @returns `Record<string, TypeOf>`
 */
export const objectToType = (
  obj: Record<string, any>
): Record<string, TypeOf> => {
  const result: Record<string, TypeOf> = {};
  const objectEntries = Object.entries(obj);
  // for loop is faster than forEach
  for (let i = 0; i < objectEntries.length; i++) {
    const [key, value] = objectEntries[i];
    if (isPureObject(value)) {
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
      result[key] = valueToType(value, key);
    }
  }
  return result;
};

type ArrayToTypeReturnType = {
  typeDefination: string;
  typeObjects: TypeOf[];
}

/**
 * types an array and returns its type or types separated by commas
 * @param key `string`
 * @param arr 
 * @returns `ArrayToTypeReturnType`
 */
export const arrayToType = (key: string, arr: unknown[]): ArrayToTypeReturnType => {
  const typeDefination: string[] = [];
  const typeObjects: TypeOf[] = [];
  // for loop is faster than reduce
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const valueType = valueToType(value);
    if (isPureObject(value)) {
      typeDefination.push(capitalizeString(key) as string);
      typeObjects.push({
        [`${TYPE_DEFINATION_PREFIX + capitalizeString(key)}`]: valueType,
      });
    } else {
      typeDefination.push(valueType as string);
    }
  }
  // remove duplicates then join with comma
  const typeDefinationString = ARRAY_TYPE_PREFIX + Array.from(new Set(typeDefination)).join(",");

  return {
    typeDefination: typeDefinationString,
    typeObjects: typeObjects,
  };
}
