import { capitalizeString } from "./util";

test("Should capitalized string", () => {
  expect(capitalizeString("example")).toBe("Example");
});
