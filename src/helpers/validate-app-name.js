const validateNpmName = require('validate-npm-package-name')
const fs = require('fs')
const path = require('path')

function validateAppName(name) {
  const nameValidation = validateNpmName(name)
  let exist = false;
  try {
    fs.accessSync(path.resolve(name))
    exist = true;
  } catch (err) {

  }
  if (nameValidation.validForNewPackages && !exist) {
    return { valid: true }
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ].concat(exist ? ['This directory already exists.'] : []),
  }
}

module.exports = validateAppName
