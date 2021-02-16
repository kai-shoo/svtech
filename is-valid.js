const isValid = function (s) {
  const stack = [];
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (char of s) {
    if (Object.keys(map).includes(char)) stack.push(char);

    console.log(stack, char);

    if (!Object.keys(map).includes(char) && map[stack.pop()] !== char)
      return false;
  }

  return stack.length ? false : true;
};
