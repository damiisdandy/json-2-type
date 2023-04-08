import dayjs from "dayjs";
import { containsNumerical } from "../regex";

/**
 * ‘example’ => ‘Example’
 * @param str 
 * @returns `string`
 */
export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Checks if value is a pure object e.g {}
 * @param obj `unknown`
 * @returns `boolean`
 */
export const isPureObject = (obj: unknown): boolean => {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

export const isDate = (value: string): boolean => {
  return !containsNumerical(value as string) && dayjs(value as string).isValid()
}