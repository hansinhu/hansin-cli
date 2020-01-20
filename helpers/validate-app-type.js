
function validateAppType(type) {
  if (['node', 'web'].includes(type)) {
    return { valid: true }
  }

  return {
    valid: false,
    problems: [
      'project type should be web or node'
    ],
  }
}

module.exports = validateAppType
