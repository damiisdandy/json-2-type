export const TYPE_DEFINATION_PREFIX = '$type$';
export const ARRAY_TYPE_PREFIX = '$array$';

// MOCKS
export const DEPTH_1 = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
};

export const PARTIAL_DEPTH_1 = {
  name: "Bob",
  age: 30,
  isFruit: true,
  birthday: 1990
}

export const DEPTH_1_WITH_ARRAY = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  randomArray: ["Ben", 13, null, '2012-10-11']
};

export const DEPTH_1_WITH_TWO_NESTED_ARRAYS_AND_AN_OBJECT = {
  name: "john",
  nestedArray: [
    [{
      a: "string"
    }],
    [{
      b: "string"
    }],
    {
      c: {
        d: "string"
      }
    }]
}

export const DEPTH_1_WITH_EMPTY_ARRAY = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  randomArray: []
};

export const DEPTH_1_WITH_AN_OBJECT_IN_ARRAY = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  randomArray: ["Ben", 13, null, DEPTH_1]
};

export const DEPTH_1_WITH_MULTIPLE_OBJECTS_IN_ARRAY = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  randomArray: ["Ben", 13, null, DEPTH_1, PARTIAL_DEPTH_1]
};

export const DEPTH_1_WITH_ONLY_MULTIPLE_OBJECTS_IN_ARRAY = {
  name: "John",
  age: 30,
  married: true,
  kids: null,
  birthday: "1990-10-10",
  randomArray: [DEPTH_1, PARTIAL_DEPTH_1]
};

export const DEPTH_2 = {
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

export const DEPTH_3 = {
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

export const DEPTH_4_WITH_ARRAYS = {
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
    randomArray: [DEPTH_1, DEPTH_2],
    depth3: {
      name: "John",
      age: 30,
      married: true,
      kids: null,
      birthday: "1990-10-10",
      depth4: {
        name: "John",
        age: 30,
        married: true,
        kids: null,
        birthday: "1990-10-10",
        randomArray1: ["Ben", 13, null, '2012-10-11']
      }
    }
  }
}

export const NESTED_ARRAY_WITH_OBJECT = [
  null,
  2,
  "a",
  [
    null,
    2,
    "a",
    {
      a: "example",
    },
  ],
]