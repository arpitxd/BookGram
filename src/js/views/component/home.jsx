import React from 'react';

import Header from 'basePath/views/component/header';
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                BookGram.
                <br/>
                For Search Book from Lib Genesis go to Explore.<br/>
                For Latest Books from LIb Genesis go to Arrivals<br/>
                For Search Book from Collection (from Local Storage) go to Collections<br/>
                
            </React.Fragment>
        );
    }
}