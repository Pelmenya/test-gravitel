import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { ClientContext } from 'graphql-hooks'
import { Provider as ReduxProvider } from 'react-redux';

import '@ya.praktikum/react-developer-burger-ui-components';
import './index.css';
import { graphQLCLientHooks } from './graphql-clients/graphql-client-hooks';
import { store } from './services/redux/store';
//import { Provider as ReduxProvider } from 'react-redux';
//import { store } from './services/redux/store';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <ClientContext.Provider value={graphQLCLientHooks}>
          <App />
        </ClientContext.Provider>
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
