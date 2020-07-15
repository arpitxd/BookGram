import React from 'react';
import styled from 'styled-components';
import { CustomButton } from 'basePath/views/component/atoms/formFields';
import {invalidateKey} from 'basePath/views/component/common/utilities';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import {getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
const BookGramHeader = styled.div`
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(43,43,43,0.15);
    width: 100%;
    
    height: 55px;
    display: flex;
`;
const HeaderLi = styled.li`
    list-style: none;
    margin-top: -15px;
    margin-right 50px;
`;
const HeaderUl = styled.ul`
display: flex;
`;

const NavLi = styled.li`
    list-style: none;
    margin-right 50px;
    a {
        text-decoration: none;
    }
    
`;
const NavUl = styled.ul`
    display: flex;
    margin-top: 15px;
`;

const Heading = styled.div`
    flex: 0 0 10%;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-top: 10px;
`;
class Header extends React.Component {
    constructor(props){
        super(props);
    }
    logout = () => {
        invalidateKey('login');
        this.props.history.replace('/login');
    }
    render(){
        let userName = getDataFromLocalStorage('login').value;
        return (
            <div>
                <BookGramHeader>
                    <HeaderUl>
                        <HeaderLi>
                            <Heading>
                                BookGram
                            </Heading>
                        </HeaderLi>
                        <HeaderLi>
                            <NavUl>
                                <NavLi>
                                    <NavLink to="/explore">Explore</NavLink>
                                </NavLi>
                                <NavLi>
                                    <NavLink to="/arrivals">Arrivals</NavLink>
                                </NavLi>
                                <NavLi>
                                    <NavLink to="/collections">Collections</NavLink>
                                </NavLi>
                            </NavUl>
                        </HeaderLi>
                        <HeaderLi style={{marginLeft: '90%'}}>
                            <NavUl>
                                <NavLi>
                                    <div style={{width: '100px'}}><strong>Hi {userName}</strong></div>
                                </NavLi>
                                <NavLi style={{marginTop: '-15px'}}>
                                    <CustomButton onClick={this.logout} value={'Logout'} />
                                </NavLi>
                            </NavUl>
                        </HeaderLi>
                    </HeaderUl>
                </BookGramHeader>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Header);