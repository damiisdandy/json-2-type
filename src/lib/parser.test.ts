import { ARRAY_TYPE_PREFIX } from "../constants";
import { arrayToType, objectToType, valueToType } from "./parser";

const DEPTH_1 = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
};

const DEPTH_1_WITH_ARRAY = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  randomArray: ["Ben", 13, null, '2012-10-11']
};

const DEPTH_2 = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  depth2: {
    name: "John",
    age: 30,
    married: true,
    kids: null,
    birthday: "1990-10-10",
  }
}

const DEPTH_3 = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  depth2: {
    name: "John",
    age: 30,
    married: true,
    kids: null,
    birthday: "1990-10-10",
    depth3: {
      name: "John",
      age: 30,
      married: true,
      kids: null,
      birthday: "1990-10-10",
    }
  }
}

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
})

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
      "$type$Depth2": {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
      }
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
      "$type$Depth2": {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
        depth3: "Depth3",
        "$type$Depth3": {
          name: "string",
          age: "number",
          married: "boolean",
          kids: "null",
          birthday: "date",
        }
      }
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
      randomArray: ARRAY_TYPE_PREFIX + "string,number,null,date"
    });
  });
});

describe('arrayToType - should return correct array types', () => {
  test('singular type', () => {
    expect(arrayToType("example", ["a", "b", "c"]).typeDefination).toBe(ARRAY_TYPE_PREFIX + "string")
  })
  test('multiple types', () => {
    expect(arrayToType("example", [1, "2", null, true, false, undefined]).typeDefination)
      .toBe(ARRAY_TYPE_PREFIX + "number,string,null,boolean,undefined")
  })
})