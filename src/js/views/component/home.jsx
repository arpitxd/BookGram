import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from 'basePath/views/component/header';
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Header props={this.props}/>
                Welcome User!
                <ul>
                    <li>
                        <NavLink to="/collections">Collections</NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore">Explore</NavLink>
                    </li>
                    <li>
                        <NavLink to="/arrivals">Arrivals</NavLink>
                    </li>
                </ul>

            </React.Fragment>
        );
    }
}