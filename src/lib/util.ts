import dayjs from "dayjs";
import { containsNumerical } from "../regex";
import type { TypeOf } from "./parser";

export type Nullable<T> = T | null;

/**
 * ‘example’ => ‘Example’
 * @param str
 * @returns `string`
 */
export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if value is a pure object e.g {}
 * @param obj `unknown`
 * @returns `boolean`
 */
export const isPureObject = (obj: unknown): boolean => {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};

export const isDate = (value: string): boolean => {
  return (
    !containsNumerical(value as string) && dayjs(value as string).isValid()
  );
};

/**
 * takes in two objects and merges them, if the key exists in both objects, it will be an array
 * else an array with one value
 * @param finalObject `Record<string, any>`
 * @param item `Record<string, any>`
 * @param valueParser A function you can use to parse the `item`'s value during merging
 */
export const compressObjects = (finalObject: Record<string, any>, item: Record<string, any>, valueParser?: (...args: any[]) => any): void => {
  const objectEntries = Object.entries(item);
  for (let i = 0; i < objectEntries.length; i++) {
    const [key, value] = objectEntries[i];
    if (finalObject.hasOwnProperty(key)) {
      finalObject[key].push(valueParser ? valueParser(value) : value);
    } else {
      finalObject[key] = [valueParser ? valueParser(value) : value];
    }
  }
} 