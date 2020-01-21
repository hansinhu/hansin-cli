
const appList = [
  { title: 'component', value: 'component', description: '前端组件库 项目' },
  { title: 'library', value: 'library', description: '前端组件库 项目' },
  { title: 'web', value: 'web', description: 'Web 项目' },
  { title: 'node', value: 'node', description: 'Node 项目' },
]

function validateAppType(type) {
  if (appList.some(item => item.title === type)) {
    return { valid: true }
  }

  const names = appList.map(item => item.title).join(', ')

  return {
    valid: false,
    problems: [
      `project type should be [ ${names} ]`
    ],
  }
}

module.exports = {
  appList,
  validateAppType,
}
