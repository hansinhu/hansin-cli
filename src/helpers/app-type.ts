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
    otherArgs: [
      {
        type: 'select',
        name: 'frame',
        message: '选择框架:',
        choices: [
          { title: 'react', value: 'react', description: '选用React' },
          { title: 'vue', value: 'vue', description: '选用Vue' },
        ],
      },
      {
        type: 'select',
        name: 'packageType',
        message: '构建类型:',
        choices: [
          { title: 'Lerna', value: 'lerna', description: '选用Lerna' },
          { title: 'Storybook', value: 'storybook', description: '选用storybook' },
        ],
      },
    ],
  },
  { title: 'library', value: 'library', description: '前端类库 项目', otherArgs: [] },
  {
    title: 'web',
    value: 'web',
    description: 'Web 项目',
    otherArgs: [{
      type: 'select',
      name: 'frame',
      message: 'choose your front-end frame:',
      choices: [
        { title: 'react', value: 'react', description: '选用React' },
        { title: 'vue', value: 'vue', description: '选用Vue' },
      ],
    }],
  },
  { title: 'node', value: 'node', description: 'Node 项目', otherArgs: [] },
  { title: 'cli', value: 'cli', description: 'CLI 项目', otherArgs: [] },
]

function validateAppType(type: string) {
  if (appTypeList.some((item) => item.title === type)) {
    return { valid: true, problems: [] }
  }

  const names = appTypeList.map((item) => item.title).join(', ')

  return {
    valid: false,
    problems: [
      `project type should be [ ${names} ]`,
    ],
  }
}

function getTmplGitUrl(type: IAppType, opts: Record<string, string>) {
  switch (type) {
    case IAppType.cli:
      return {
        tmplName: 'tmpl_node-cli',
        gitUrl: 'https://github.com/hansinhu/tmpl_node-cli.git',
      }
    case IAppType.component:
      if (opts.packageType === 'lerna') {
        return {
          tmplName: 'tmpl_lerna-storybook',
          gitUrl: 'https://github.com/hansinhu/tmpl_lerna-storybook.git',
        }
      } else {
        throw new Error('暂不支持此构建类型！！')
        // return {
        //   tmplName: 'tmpl_node-cli',
        //   gitUrl: 'https://github.com/hansinhu/tmpl_node-cli.git',
        // }
      }
    default:
      throw new Error('模板未找到！！')
  }
}

export {
  appTypeList,
  validateAppType,
  getTmplGitUrl,
}
