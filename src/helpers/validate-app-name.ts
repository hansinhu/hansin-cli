import validateNpmName from 'validate-npm-package-name'
import fs from 'fs'
import path from 'path'

function validateAppName(name: string) {
  const nameValidation = validateNpmName(name)
  let exist = false;
  try {
    fs.accessSync(path.resolve(name))
    exist = true;
  } catch (err) {

  }
  if (nameValidation.validForNewPackages && !exist) {
    return { valid: true, problems: [] }
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ].concat(exist ? ['This directory already exists.'] : []),
  }
}

export {
  validateAppName
}
