import { DEPTH_1_WITH_AN_OBJECT_IN_ARRAY, DEPTH_1_WITH_ARRAY, DEPTH_1_WITH_MULTIPLE_OBJECTS_IN_ARRAY, DEPTH_4_WITH_ARRAYS } from "./constants";
import { readFile } from "./lib/file";
import { arrayToType, objectToType } from "./lib/parser";

// example test files based on depth
const DEPTH_1 = './mocks/depth-1.json';
const DEPTH_2 = './mocks/depth-2.json';


function main() {
  (async () => {
    // const data = await readFile(DEPTH_2);
    const data = {
      name: "john",
      nestedArray: ["name", 12, 23, ["name", 12, 13]]
    }
    console.log(objectToType(data))
  })()
}

main();

