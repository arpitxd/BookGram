import React from 'react';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
import { CustomUl, CustomLi, ErrorSpan, LoginDiv, BodyDiv } from 'basePath/views/component/atoms/htmlTags';
import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userDetails = {
            reader1: 'reader1',
            reader2: 'reader2' 
        }
        this.state = {
            error: {
                username: '',
                password: '',
                isValid: false
            },
            formData: {
                username: '',
                password: ''
            }
        }
    }
    handleChange = (e) => {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value.trim();
        this.setState(formData);
    }
    
    validation = (cb) => {
        let error = {
            username: '',
            password: '' ,
            isValid: true
        }
        if (!Boolean(this.state.formData.username)){
            error.username = 'Username is required';
            error.status = false;
        }
        if(!Boolean(this.state.formData.password)){
            error.password = 'Password is required';
            error.status = false;
        } 
        this.setState({error: error}, () => {
            if(this.state.error.isValid){
                cb();
            }
        });
    }
    submit = () => {
        
        let status = false;
        this.validation(() => {
            if(this.userDetails[this.state.formData.username] == this.state.formData.password){
                status = true;
                setDataToLocalStorge('login', this.state.formData.username);
                let userDetailObj = getDataFromLocalStorage(this.state.formData.username);
                if(!userDetailObj) {
                    let userObj = {
                        bookObj: {
                            readingStatus: {},
                            ratings: {}
                        }
                    }
                    setDataToLocalStorge(this.state.formData.username, userObj);
                }
                this.props.history.push('/');
            } else {
                let error = {
                    username: 'Username or password is incorrect',
                    password: '' ,
                    isValid: false
                }
                this.setState({
                    error: error
                });
            }
        });
    }
    render() {
        return (
            <BodyDiv>
                <LoginDiv>
                    <span style={{marginLeft: '40%'}}>
                        <strong>BookGram</strong>
                    </span>
                    <form action="javascript:void(0);" onSubmit={() => this.submit()}>
                    <CustomUl>
                        <CustomLi>
                            <CustomText type="text" id="id_user_name" placeholder={'Username'} onChange={this.handleChange} name="username" error={this.state.error.username && true} />
                            {this.state.error.username && <ErrorSpan>{this.state.error.username}</ErrorSpan>}
                        </CustomLi>
                        <CustomLi>
                            <CustomText type="password" id="id_password" placeholder={'Password'} onChange={this.handleChange} name="password" error={this.state.error.password && true}/>
                            {this.state.error.password && <ErrorSpan>{this.state.error.password}</ErrorSpan>}    
                        </CustomLi>
                        <CustomLi><CustomButton type="submit" value="Login" /></CustomLi>
                    </CustomUl>
                    </form>
                </LoginDiv>
            </BodyDiv>
        );
    }
}
