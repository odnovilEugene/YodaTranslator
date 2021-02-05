import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Fonts/sith.ttf'
import './Fonts/huttese.woff'
import './Fonts/mandalorian.ttf'
import './Fonts/cheunh.woff'
import './Fonts/gungan.woff'
import './Fonts/yoda.woff'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
