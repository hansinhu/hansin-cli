import '../assets/index.less';
import React from 'react';
import Demo from '../src/index';

export default function App() {
  return (
    <div>
      <Demo
        className='my_demo'
        onClick={() => { alert('Demo Clicked') }}
      />
    </div>
  );
}
