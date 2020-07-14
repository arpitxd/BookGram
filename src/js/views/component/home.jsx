import React from 'react';

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
            </React.Fragment>
        );
    }
}