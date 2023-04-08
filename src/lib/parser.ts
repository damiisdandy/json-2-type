import {
  capitalizeString,
  compressObjects,
  isDate,
  isPureObject,
} from "./util";
import type { Nullable } from "./util";
import { ARRAY_TYPE_PREFIX, TYPE_DEFINATION_PREFIX } from "../constants";

type ArrayToTypeReturnType = {
  typeDefination: string;
  typeObject: TypeOf;
};

export type TypeOf =
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
  | Record<string, any>
  | ArrayToTypeReturnType;

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
        return arrayToType(key, value);
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
};

/**
 * takes an object and returns a new object with its value types
 * @param obj `Record<string, any>`
 * @returns `Record<string, TypeOf>`
 */
export const objectToType = (
  obj: Record<string, any> | Array<any>
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
      result[TYPE_DEFINATION_PREFIX + capitalizeString(key)] =
        objectToType(value);
    } else {
      const valueToTypeResult = valueToType(value, key);
      if (typeof valueToTypeResult !== "string") {
        result[key] = valueToTypeResult.typeDefination;
        if (valueToTypeResult.typeDefination.startsWith(ARRAY_TYPE_PREFIX)) {
          // also append the type object if its not empty
          const arrayTypePrefixName = Object.keys(
            valueToTypeResult.typeObject
          )[0];
          if (
            Object.keys(valueToTypeResult.typeObject[arrayTypePrefixName])
              .length > 0
          ) {
            Object.assign(result, valueToTypeResult.typeObject);
          }
        }
      } else {
        result[key] = valueToTypeResult;
      }
    }
  }
  return result;
};

/**
 * types an array and returns its type or types separated by commas
 * @param key `string`
 * @param arr
 * @returns `ArrayToTypeReturnType`
 */
export const arrayToType = (
  key: string,
  arr: unknown[]
): ArrayToTypeReturnType => {
  const typeName = TYPE_DEFINATION_PREFIX + capitalizeString(key);

  if (arr.length === 0) {
    return {
      typeDefination: ARRAY_TYPE_PREFIX + "(unknown)",
      typeObject: {
        [typeName]: {},
      },
    };
  }
  const typeDefination: string[] = [];
  const typeObjectPure: Record<string, (string | Record<string, any>)[]> = {};
  // for loop is faster than reduce
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const valueType = valueToType(value);
    if (isPureObject(value)) {
      // push its genereated type e.g Example
      typeDefination.push(capitalizeString(key) as string);
      // merge all objects into one with the key as an arrays of its types
      compressObjects(typeObjectPure, value as Object, valueToType);
    } else if (Array.isArray(value)) {
      const arrayToTypeResult = arrayToType(key, value);
      typeDefination.push(arrayToTypeResult.typeDefination);
      // TODO handle nested arrays and its type definations
    } else {
      typeDefination.push(valueType as string);
    }
  }
  // remove duplicates then join with comma
  const typeDefinationString = `${ARRAY_TYPE_PREFIX}(${Array.from(new Set(typeDefination)).sort().join(",")})`;

  // convert typeObjectPure to TypeOf
  const typeObject: TypeOf = {};
  const typeObjectPureEntries = Object.entries(typeObjectPure);
  for (let i = 0; i < typeObjectPureEntries.length; i++) {
    const [key, values] = typeObjectPureEntries[i];
    const nonObjectTypeValues = values.filter(
      (value) => typeof value === "string"
    ) as string[];
    const objectTypeValues = values.filter(
      (value) => typeof value === "object"
    ) as Record<string, any>;

    const finalValues: string[] = [...nonObjectTypeValues];
    // check if some values are optional e.g example?: string
    // meaning they do not exists in all objects within the array
    if (arr.filter(isPureObject).length > 1 && values.length === 1) {
      finalValues.push("undefined");
    }
    for (let j = 0; j < objectTypeValues.length; j++) {
      const objectKey = capitalizeString(key);
      finalValues.push(objectKey);
      const objectType = objectTypeValues[j];
      typeObject[TYPE_DEFINATION_PREFIX + objectKey] = objectType;
    }

    typeObject[key] = Array.from(new Set(finalValues))
      .sort()
      .join(",") as TypeOf;
  }

  return {
    typeDefination: typeDefinationString,
    typeObject: {
      [typeName]: typeObject,
    },
  };
};
