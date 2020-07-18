import React from 'react';
import styled from 'styled-components';
import UserHistory from 'basePath/views/component/sections/UserHistory';
const HomeDiv = styled.div`
    text-align: center;
    top: 40%;
    position: absolute;
    left:35%;
`;
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <HomeDiv>
                    BookGram.
                    <br/>
                    For Search Book from Lib Genesis go to Explore.<br/>
                    For Latest Books from LIb Genesis go to Arrivals<br/>
                    For Search Book from Collection (from Local Storage) go to Collections<br/>

                    <UserHistory/>
                </HomeDiv>
            </React.Fragment>
        );
    }
}