import { readFile } from "./file";

test("readFile - should return Javascript object", async () => {
  const result = await readFile("./mocks/read-file.json");
  expect(result).toEqual({
    text: "Hello world",
    age: 1,
  });
});
