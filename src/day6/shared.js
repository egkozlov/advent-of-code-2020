const { splitTextToArray } = require("../shared.js");

export const getUniqueAnswersCount = (answers) => {
  return answers
    .join("")
    .split("")
    .reduce((res, answer) => {
      if (!res.includes(answer)) {
        res.push(answer);
      }

      return res;
    }, []).length;
};

export const getAnswersGroups = (data) => {
  const inputData = splitTextToArray(data);
  let groups = [];
  let group = [];

  inputData.forEach((a) => {
    if (a === "") {
      groups.push(group);
      group = [];
    } else {
      group.push(a);
    }
  });
  groups.push(group);

  return groups;
};

export const getEqualAnswersCount = (answers) => {
  const answer = answers[0];
  return answer
    .split("")
    .filter((letter) => answers.every((a) => a.split("").includes(letter)))
    .length;
};
