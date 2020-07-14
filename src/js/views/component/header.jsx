import React from 'react';
import styled from 'styled-components';
import { CustomButton } from 'basePath/views/component/atoms/formFields';
import {invalidateKey} from 'basePath/views/component/common/utilities';
import { withRouter } from 'react-router';
const BookGramHeader = styled.div`
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(43,43,43,0.15);
    width: 100%;
    font-size: 1.5rem;
    font-weight: 700;
    height: 55px;
    text-align: center;
`;
class Header extends React.Component {
    constructor(props){
        super(props);
    }
    logout = () => {
        invalidateKey('login');
        this.props.history.push('/');
    }
    render(){
        
        return (
            <BookGramHeader>
                BookGram
                <CustomButton onClick={this.logout} value={'Logout'} />
            </BookGramHeader>
        );
    }
}

export default withRouter(Header);