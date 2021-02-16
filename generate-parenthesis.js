const generateParenthesis = function (n) {
  const map = {
    1: ["(", ")"],
    2: ["{", "}"],
    3: ["[", "]"],
  };

  const random = function (min = 1, max = 3) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const string0 = [];
  const string1 = [];

  for (let i = 0; i < n; i++) {
    const index = map[random()];

    string0.push(index[0]);
    string1.push(index[1]);
  }

  return string0.concat(string1.reverse()).join("");
};
