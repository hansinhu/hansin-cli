export enum IAppType {
  component = 'component',
  library = 'library',
  web = 'web',
  node = 'node',
  cli = 'cli',
}


const appTypeList = [
  {
    title: 'component',
    value: 'component',
    description: '前端组件库 项目',
    choices: [{
      type: 'select',
      name: 'frame',
      message: 'choose your front-end frame:',
      choices: [
        {title: 'react', value: 'react', description: '选用React'},
        {title: 'vue', value: 'vue', description: '选用Vue'},
      ],
    }],
  },
  { title: 'library', value: 'library', description: '前端类库 项目', choices: [] },
  {
    title: 'web',
    value: 'web',
    description: 'Web 项目',
    choices: [{
      type: 'select',
      name: 'frame',
      message: 'choose your front-end frame:',
      choices: [
        {title: 'react', value: 'react', description: '选用React'},
        {title: 'vue', value: 'vue', description: '选用Vue'},
      ],
    },{
      type: 'select',
      name: 'frame2',
      message: 'choose your front-end frame:',
      choices: [
        {title: 'react', value: 'react', description: '选用React'},
        {title: 'vue', value: 'vue', description: '选用Vue'},
      ],
    }],
  },
  { title: 'node', value: 'node', description: 'Node 项目', choices: [] },
  { title: 'cli', value: 'cli', description: 'CLI 项目', choices: [] },
]

function validateAppType(type: string) {
  if (appTypeList.some(item => item.title === type)) {
    return { valid: true, problems: [] }
  }

  const names = appTypeList.map(item => item.title).join(', ')

  return {
    valid: false,
    problems: [
      `project type should be [ ${names} ]`
    ],
  }
}

export {
  appTypeList,
  validateAppType,
}
