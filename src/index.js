import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* React-Redux ka <Provider> component aapke app ko Redux store se connect karta hai. */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
