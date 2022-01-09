// Importing dependencies
import React from 'react';
import ReactDom from 'react-dom';

// CSS
import './index.css';

import App from './app';

function Index() {
  return <App />;
}

ReactDom.render(<Index />, document.getElementById('root'));
