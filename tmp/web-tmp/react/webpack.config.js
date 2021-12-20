const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const baseWebpackConfig = require('./webpack.common')

// 监控编译内存使用情况===>
const memwatch = require('@airbnb/node-memwatch')
if (process.env.NODE_ENV === 'develop') {
  memwatch.on('stats', function (stats) {
    const used = stats.used_heap_size * 100 / stats.heap_size_limit
    let colorStr = '\x1b[42m'
    if (used > 70) {
      colorStr = '\x1b[45m'
    }
    if (used > 90) {
      colorStr = '\x1b[41m'
    }
    console.info('gc run.', colorStr, `mem used:${used.toFixed(2)}%`, '\x1b[0m')
  });
  memwatch.on('leak', function (info) {
    console.log('leak:', info)
  });
}


function resolve (...dirs) {
  return path.join(__dirname, ...dirs)
}

const entry = {};

for (let entity in baseWebpackConfig.entry) {
  entry[entity] = [
    'webpack-dev-server/client?http://127.0.0.1:8080',
    'webpack/hot/only-dev-server',
  ];
}

const _URL = process.env.URL || 'gh-test.fromfactory.club'

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {},
  devtool: 'eval',

  entry,

  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8080,
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/home/, to: '/home/index.html' },
      ],
    },

    serverSideRender: true,

    before: (app, server) => {
      app.use((req, res, next) => {
        const assets = server._stats.compilation.assets
        // const originalSend = res.send;
        // function send (body, options) {
        //   const body_parsed = body.toString('utf8')
        //   // 2. render html
        //   const body_injected = ejs.render(body_parsed, options)
        //   // 返回修改之后的内容（插入ssr内容）
        //   originalSend.call(res, body_injected)
        // }

        if (req.path === '/service-worker.js') {
          return res.sendFile(path.resolve(__dirname, 'service-worker.js'))
        }

        if (req.path === '/cart') {
          return res.end(assets['msite/index.html'].source())
        }
        return next()
      })
    },

    proxy: {
      '/mock': { // mock 数据 http://api-manage.yuceyi.com:3000
        target: `http://api-manage.yuceyi.com:3000`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/order': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/review/token': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/club-api': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/cf-member': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/cf-buy': {
        target: `http://gw.test2.clubfactory.com`,
        // target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/cf-market': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/api': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/v1': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/v2': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/theme': {
        target: `http://${_URL}`,
        changeOrigin: true,
      },
      '/cf-search': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/cf-cart': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
      '/gw/': {
        target: `http://${_URL}`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
        onProxyReq: function (proxy, req, res) {
          const cookie = req.headers.cookie
          proxy.setHeader('cookie', cookie + '; project-env=aws-usa-pc_m_recon')
        },
      },
      '/groupLotteryProviderImpl': { // gl yapi
        target: `http://api-manage.yuceyi.com:3000/mock/149`,
        changeOrigin: true,
        headers: {
          'Accept': 'application/json',
        },
      },
    },
  },

  plugins: [
    new webpack.DefinePlugin({}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ],
})
