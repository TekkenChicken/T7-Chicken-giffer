import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';

import App from './components/App.js';


const store = Store;
const rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>, rootElement 
)