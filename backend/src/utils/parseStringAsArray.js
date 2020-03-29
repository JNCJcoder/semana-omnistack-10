module.exports = function parseStringAsArray(array) {
  if (!array) {
    return [];
  }
  return array.split(',').map(tech => tech.trim().toLowCase);
};
