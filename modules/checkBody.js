function checkBody(body, fields) {
  let cptBody = 0;
  for (const field of fields) {
    // Vérifie si la valeur de la clef n'est pas undefinde null vide ou tableau vide
    if (
      body[field] !== undefined &&
      body[field] !== null &&
      body[field] !== "" &&
      !(Array.isArray(body[field]) && body[field].length === 0)
    ) {
      cptBody++;
    }
  }

  return cptBody === fields.length ? true : false;
}

module.exports = { checkBody };
