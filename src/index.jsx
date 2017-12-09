import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';

import './styles/index.scss';

import App from './components/App.jsx';

const store = Store;
const rootElement = document.getElementById('root');

const Root = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

render(<Root/>, rootElement);

if (module.hot) {
  module.hot.accept();
}
