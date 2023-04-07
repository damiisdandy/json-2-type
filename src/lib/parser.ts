import dayjs from "dayjs";
import { containsNumerical } from "../regex";
import { capitalizeString } from "./util";
import { TYPE_DEFINATION_PREFIX } from "./constants";


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
 * ‘objectToType’ takes an object and returns a new object with its value types
 * @param obj ‘Record<string, any>’
 * @returns ‘Record<string, TypeOf>’
 */
export const objectToType = (
  obj: Record<string, any>
): Record<string, TypeOf> => {
  const result: Record<string, TypeOf> = {};
  Object.entries(obj).forEach(([key, value]) => {
    switch (typeof value) {
      case "object":
        if (value === null) {
          result[key] = "null";
        } else {
          if (Array.isArray(value)) {
            // TODO: handle array functionity
          } else {
            // recursively call objectToType
            result[key] = capitalizeString(key) as TypeOf;
            result[TYPE_DEFINATION_PREFIX + capitalizeString(key)] = objectToType(value);
          }
        }
        break;
      case "string":
        // check if value is a date and does not contain only numerical characters
        // "123456" can be parsed a valid date
        if (!containsNumerical(value) && dayjs(value).isValid()) {
          result[key] = "date";
        } else {
          result[key] = "string";
        }
        break;
      default:
        result[key] = typeof value;
    }
  });

  return result;
};

