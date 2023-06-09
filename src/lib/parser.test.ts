import {
  ARRAY_TYPE_PREFIX,
  DEPTH_1,
  DEPTH_1_WITH_AN_OBJECT_IN_ARRAY,
  DEPTH_1_WITH_ARRAY,
  DEPTH_1_WITH_EMPTY_ARRAY,
  DEPTH_1_WITH_MULTIPLE_OBJECTS_IN_ARRAY,
  DEPTH_1_WITH_ONLY_MULTIPLE_OBJECTS_IN_ARRAY,
  DEPTH_1_WITH_TWO_NESTED_ARRAYS_AND_AN_OBJECT,
  DEPTH_2,
  DEPTH_3,
  DEPTH_4_WITH_ARRAYS,
  NESTED_ARRAY_WITH_OBJECT,
  TYPE_DEFINATION_PREFIX,
} from "../constants";
import { arrayToType, objectToType, valueToType } from "./parser";

describe("valueToType - should return correct types", () => {
  test("string", () => {
    const result = valueToType("John");
    expect(result).toBe("string");
  });

  test("number", () => {
    const result = valueToType(30);
    expect(result).toBe("number");
  });

  test("boolean", () => {
    const result = valueToType(true);
    expect(result).toBe("boolean");
  });

  test("null", () => {
    const result = valueToType(null);
    expect(result).toBe("null");
  });

  test("date", () => {
    const result = valueToType("1990-10-10");
    expect(result).toBe("date");
  });
});

describe("objectToType - should return objects with correct types", () => {
  test("depth 1", () => {
    const result = objectToType(DEPTH_1);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
    });
  });

  test("depth 2", () => {
    const result = objectToType(DEPTH_2);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      depth2: "Depth2",
      [TYPE_DEFINATION_PREFIX + "Depth2"]: {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
      },
    });
  });

  test("depth 3", () => {
    const result = objectToType(DEPTH_3);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      depth2: "Depth2",
      [TYPE_DEFINATION_PREFIX + "Depth2"]: {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
        depth3: "Depth3",
        [TYPE_DEFINATION_PREFIX + "Depth3"]: {
          name: "string",
          age: "number",
          married: "boolean",
          kids: "null",
          birthday: "date",
        },
      },
    });
  });

  test("depth 1 with array", () => {
    const result = objectToType(DEPTH_1_WITH_ARRAY);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      randomArray: ARRAY_TYPE_PREFIX + "(date,null,number,string)",
    });
  });

  test("depth 1 with an empty array", () => {
    const result = objectToType(DEPTH_1_WITH_EMPTY_ARRAY);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      randomArray: ARRAY_TYPE_PREFIX + "(unknown)",
    });
  });

  test("depth 1 with an object in array", () => {
    const result = objectToType(DEPTH_1_WITH_AN_OBJECT_IN_ARRAY);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      randomArray: ARRAY_TYPE_PREFIX + "(RandomArray,null,number,string)",
      [TYPE_DEFINATION_PREFIX + "RandomArray"]: {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
      },
    });
  });

  test("depth 1 with multiple objects in array", () => {
    const result = objectToType(DEPTH_1_WITH_MULTIPLE_OBJECTS_IN_ARRAY);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      randomArray: ARRAY_TYPE_PREFIX + "(RandomArray,null,number,string)",
      [TYPE_DEFINATION_PREFIX + "RandomArray"]: {
        name: "string",
        age: "number",
        married: "boolean,undefined",
        kids: "null,undefined",
        birthday: "date,number",
        isFruit: "boolean,undefined",
      },
    });
  });

  test("depth 1 with only multiple objects in array", () => {
    const result = objectToType(DEPTH_1_WITH_ONLY_MULTIPLE_OBJECTS_IN_ARRAY);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      randomArray: ARRAY_TYPE_PREFIX + "(RandomArray)",
      [TYPE_DEFINATION_PREFIX + "RandomArray"]: {
        name: "string",
        age: "number",
        married: "boolean,undefined",
        kids: "null,undefined",
        birthday: "date,number",
        isFruit: "boolean,undefined",
      },
    });
  });

  test("depth 4 with arrays", () => {
    const result = objectToType(DEPTH_4_WITH_ARRAYS);
    expect(result).toEqual({
      name: "string",
      age: "number",
      married: "boolean",
      kids: "null",
      birthday: "date",
      depth2: "Depth2",
      $type$Depth2: {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
        randomArray: ARRAY_TYPE_PREFIX + "(RandomArray)",
        $type$RandomArray: {
          name: "string",
          age: "number",
          married: "boolean",
          kids: "null",
          birthday: "date",
          depth2: "Depth2,undefined",
          $type$Depth2: {
            name: "string",
            age: "number",
            married: "boolean",
            kids: "null",
            birthday: "date",
          },
        },
        depth3: "Depth3",
        $type$Depth3: {
          name: "string",
          age: "number",
          married: "boolean",
          kids: "null",
          birthday: "date",
          depth4: "Depth4",
          $type$Depth4: {
            name: "string",
            age: "number",
            married: "boolean",
            kids: "null",
            birthday: "date",
            randomArray1: ARRAY_TYPE_PREFIX + "(date,null,number,string)",
          },
        },
      },
    });
  });

  test("depth 1 with an array of nested arrays and an object", () => {
    expect(objectToType(DEPTH_1_WITH_TWO_NESTED_ARRAYS_AND_AN_OBJECT)).toEqual({
      name: "string",
      nestedArray: `${ARRAY_TYPE_PREFIX}(${ARRAY_TYPE_PREFIX}(NestedArrayType1),${ARRAY_TYPE_PREFIX}(NestedArrayType2),NestedArray)`,
      [TYPE_DEFINATION_PREFIX + "NestedArray"]: {
        [TYPE_DEFINATION_PREFIX + "C"]: {
          d: "string",
        },
        c: "C",
      },
      [TYPE_DEFINATION_PREFIX + "NestedArrayType1"]: {
        a: "string",
      },
      [TYPE_DEFINATION_PREFIX + "NestedArrayType2"]: {
        b: "string",
      },
    });
  });
});

describe("arrayToType - should return correct array types", () => {
  test("singular type", () => {
    expect(arrayToType("example", ["a", "b", "c"]).typeDefination).toBe(
      ARRAY_TYPE_PREFIX + "(string)"
    );
  });
  test("multiple types", () => {
    expect(
      arrayToType("example", [1, "2", null, true, false, undefined])
        .typeDefination
    ).toBe(ARRAY_TYPE_PREFIX + "(boolean,null,number,string,undefined)");
  });
  test("empty array", () => {
    expect(arrayToType("example", []).typeDefination).toBe(
      ARRAY_TYPE_PREFIX + "(unknown)"
    );
  });
  test("nested array", () => {
    expect(
      arrayToType("example", [null, 2, "a", [null, 2, "a"]]).typeDefination
    ).toBe(
      `${ARRAY_TYPE_PREFIX}(${ARRAY_TYPE_PREFIX}(null,number,string),null,number,string)`
    );
  });
  test("nested array with object", () => {
    const result = arrayToType("example", NESTED_ARRAY_WITH_OBJECT);
    expect(result.typeDefination).toBe(
      `${ARRAY_TYPE_PREFIX}(${ARRAY_TYPE_PREFIX}(ExampleType${NESTED_ARRAY_WITH_OBJECT.length},null,number,string),null,number,string)`
    );
    expect(result.typeObject).toEqual(
      expect.objectContaining({
        [`$type$ExampleType${NESTED_ARRAY_WITH_OBJECT.length}`]: {
          a: "string",
        },
      })
    );
  });
});
