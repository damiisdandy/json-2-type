import { objectToType } from "./parser";

const DEPTH_1 = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
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
      depth2: {
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
      depth2: {
        name: "string",
        age: "number",
        married: "boolean",
        kids: "null",
        birthday: "date",
        depth3: {
          name: "string",
          age: "number",
          married: "boolean",
          kids: "null",
          birthday: "date",
        }
      }
    });
  });
});
