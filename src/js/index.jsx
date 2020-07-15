import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'basePath/state/store/index';

import Routes from 'basePath/routes/routes.js';
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('ReactContainer')
);
