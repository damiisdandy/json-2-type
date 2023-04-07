import fs from "fs";

/**
 * Read file
 * @param path ‘./path/to/file.json’
 * @return Promise<Record<string, any>>
 */
export const readFile = async (path: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};
