import { objectToType } from "./parser";

const DEPTH_1 = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
};

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
});
