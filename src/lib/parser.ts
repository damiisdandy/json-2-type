import dayjs from "dayjs";
import { containsNumerical } from "../regex";

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
  | "date";

/**
 * ‘objectToType’ takes an object and returns a new object with its value types
 * @param obj ‘Record<string, any>’
 * @returns ‘Record<string, TypeOf>’
 */
export const objectToType = (
  obj: Record<string, any>
): Record<string, TypeOf> => {
  const result: Record<string, TypeOf> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string") {
      // check if value is a date and does not contain only numerical characters
      // "123456" can be parsed a valid date
      if (!containsNumerical(value) && dayjs(value).isValid()) {
        result[key] = "date";
      } else {
        result[key] = "string";
      }
    } else {
      // typeof null === 'object' so we need to check for null first
      result[key] = value === null ? "null" : typeof value;
    }
  });

  return result;
};
