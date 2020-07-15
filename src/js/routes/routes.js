import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'basePath/views/component/home';
import NotFound from 'basePath/views/component/notFound';
import {isLoginValid} from 'basePath/views/component/common/utilities';
import Login from 'basePath/views/component/login';

import Arrivals from 'basePath/views/component/sections/arrivals';
import Explore from 'basePath/views/component/sections/explore';
import Collections from 'basePath/views/component/sections/collections';
const isValid = isLoginValid();
const routes = (
    <Router basename="/">
        {!isValid && window.top.location.pathname != '/login' &&  <Redirect to='/login' />}
        {isValid && window.top.location.pathname == '/login' &&  <Redirect to='/' />}
        <Switch>
            <Route exact path="/" render={props => <Home {...props} />}/>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/arrivals" render={props => <Arrivals {...props} />} />
            <Route exact path="/explore" render={props => <Explore {...props} />} />
            <Route exact path="/collections" render={props => <Collections {...props} />} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

function Routes() {
    return routes;
}

export default Routes;
