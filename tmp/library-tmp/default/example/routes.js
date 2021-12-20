import React, { Suspense, lazy } from 'react';
const Home = lazy(() => import('./pages/Home'))
const Debug = lazy(() => import('./pages/Debug'))

function SusComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return <Suspense fallback={<div>Loading...</div>}>
      <WrappedComponent />
    </Suspense>
    }
  }
}

export default [
  {
    name: '首页',
    pathname: '/',
    component: SusComponent(Home),
  },
  {
    name: 'Debug开发调试页面',
    pathname: '/debug',
    inHomeMenu: true,
    component: SusComponent(Debug),
  },
]
