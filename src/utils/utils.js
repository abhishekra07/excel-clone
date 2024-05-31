export const generateJSONData = (rows, alphabet, cellValues) => {
  let csvHeaders = [];
  const jsonData = [];
  const keys = {};

  alphabet.forEach((letter, index) => {
    const cellValue = cellValues[`${index}${1}`] || "";
    if (cellValue !== "" || cellValue !== undefined) {
      keys[letter] = toCamelCase(cellValue);
      csvHeaders.push({ label: cellValue, key: toCamelCase(cellValue) });
    }
  });
  console.log("keys ", keys);
  console.log("csvHeaders ", csvHeaders);

  // Iterate over rows (excluding the first row which is headers)
  for (let i = 2; i <= rows.length; i++) {
    const rowData = {};

    alphabet.forEach((letter, index) => {
      const cellValue = cellValues[`${index}${i}`] || "";
      rowData[keys[letter]] = cellValue;
    });

    jsonData.push(rowData);
  }

  return { json: jsonData, csv: csvHeaders };
};

/**
 * Helper function to convert string to camel case with lowercase first letter
 * @param {*} str
 * @returns
 */
const toCamelCase = (str) => {
  return str
    .replace(/\s(.)/g, function (match, group1) {
      return group1.toUpperCase();
    })
    .replace(/^\w/, (c) => c.toLowerCase());
};
