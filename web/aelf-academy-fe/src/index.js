import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/fonts/GeneralSans-Variable.ttf';
import './assets/fonts/GeneralSans-VariableItalic.ttf';
import './assets/fonts/GeneralSans-Extralight.ttf';
import './assets/fonts/GeneralSans-ExtralightItalic.ttf';
import './assets/fonts/GeneralSans-Light.ttf';
import './assets/fonts/GeneralSans-LightItalic.ttf';
import './assets/fonts/GeneralSans-Regular.ttf';
import './assets/fonts/GeneralSans-Italic.ttf';
import './assets/fonts/GeneralSans-Medium.ttf';
import './assets/fonts/GeneralSans-MediumItalic.ttf';
import './assets/fonts/GeneralSans-Semibold.ttf';
import './assets/fonts/GeneralSans-SemiboldItalic.ttf';
import './assets/fonts/GeneralSans-Bold.ttf';
import './assets/fonts/GeneralSans-BoldItalic.ttf';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
