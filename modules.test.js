const { checkBody } = require("./modules/checkBody");
const fields = ["name", "age", "adresse", "caracteristiques"];

it("Test function checkbody", () => {
  const body = {
    name: "Ruddy",
    age: 12,
    adresse: ["5 avenue des pres", "4 rue de bruxelles"],
    caracteristiques: {
      taille: 183,
      poids: 90,
    },
  };
  const result = checkBody(body, fields);
  expect(result).toEqual(true);
});

it("Test function checkbody with empty field", () => {
  const body = {
    name: "",
    age: 12,
    adresse: ["5 avenue des pres", "4 rue de bruxelles"],
    caracteristiques: {
      taille: 183,
      poids: 90,
    },
  };
  const result = checkBody(body, fields);
  expect(result).toEqual(false);
});

it("Test function checkbody with null field", () => {
  const body = {
    name: "Ruddy",
    age: null,
    adresse: ["5 avenue des pres", "4 rue de bruxelles"],
    caracteristiques: {
      taille: 183,
      poids: 90,
    },
  };
  const result = checkBody(body, fields);
  expect(result).toEqual(false);
});

it("Test function checkbody with undefined field", () => {
  const body = {
    name: "Ruddy",
    age: undefined,
    adresse: ["5 avenue des pres", "4 rue de bruxelles"],
    caracteristiques: {
      taille: 183,
      poids: 90,
    },
  };
  const result = checkBody(body, fields);
  expect(result).toEqual(false);
});

it("Test function checkbody with empty array", () => {
  const body = {
    name: "Ruddy",
    age: 12,
    adresse: [],
    caracteristiques: {
      taille: 183,
      poids: 90,
    },
  };
  const result = checkBody(body, fields);
  expect(result).toEqual(false);
});
