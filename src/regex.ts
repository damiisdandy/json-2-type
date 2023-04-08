const numericalRegex = /^\d+$/;

/**
 * checks if a string contains only numerical characters.
 * @param str 
 * @returns `boolean`
 */
export const containsNumerical = (str: string): boolean => {
  return numericalRegex.test(str);
}