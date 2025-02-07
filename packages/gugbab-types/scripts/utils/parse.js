function parseRawType(type) {
  switch (type.toLowerCase()) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
    case 'long':
    case 'float':
    case 'double':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object':
      return 'Record<string, unknown>';
    case 'array':
      return 'unknown[]';
    default:
      return 'never';
  }
}

module.exports = {
  parseRawType,
};
