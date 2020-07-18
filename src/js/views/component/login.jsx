import React from 'react';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
import { CustomUl, CustomLi, ErrorSpan, LoginDiv, BodyDiv } from 'basePath/views/component/atoms/htmlTags';
import {setDataToLocalStorge, getDataFromLocalStorage, UserDetailObject} from 'basePath/views/component/common/utilities';
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
        this.setState(formData); //updating username nd password field  value in state
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
        //Call method on LOgin Form Submission
        let status = false;
        this.validation(() => { //check basic JAvascript Validation 
            if(this.userDetails[this.state.formData.username] == this.state.formData.password){
                status = true;
                setDataToLocalStorge('login', this.state.formData.username); //set login details in Local Storage
                let userDetailObj = getDataFromLocalStorage(this.state.formData.username); //
                if(!userDetailObj) {
                    setDataToLocalStorge(this.state.formData.username, UserDetailObject); //setting user detail object which store user related information
                } else {
                    userDetailObj.value.loginCounter = userDetailObj.value.loginCounter+1; //updating login Count for User history
                    setDataToLocalStorge(this.state.formData.username, userDetailObj.value);
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
