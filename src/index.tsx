import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    {/* Передача данных через дерево */}
    <Provider store={store}>
      {/* Добавляем маршрутизацию */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
