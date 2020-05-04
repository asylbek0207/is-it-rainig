import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Main from "./components/Main/Main";

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

serviceWorker.unregister();
