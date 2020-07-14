import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'basePath/views/component/home';
import NotFound from 'basePath/views/component/notFound';
import {isLoginValid} from 'basePath/views/component/common/utilities';
import Login from 'basePath/views/component/login';
const isValid = isLoginValid();
const routes = (
    <Router basename="/">
        <Switch>
            <Route exact path="/" render={props => (isValid ? <Home {...props} /> : <Login />)}/>
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

function Routes() {
    return routes;
}

export default Routes;
