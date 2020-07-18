import styled from 'styled-components';
import React from 'react';
import { Button } from 'basePath/views/component/atoms/htmlTags';


// this class will give generic form fields
export function CustomButton(props){
    return (
        <Button type={props.type} onClick={props.onClick} {...props}>{props.value}</Button>
    );
}
CustomButton.defaultProps= {
  type: 'button'
}
const Input = styled.input`
border: 1px solid #e7e7e7;
padding: 10px 35px 10px 10px;
border-radius: 5px;
color: #000;
flex: auto;
height: 20px;
cursor: text;
font-size: 14px;
font-weight: 300;
background: transparent;

&:active,
&.error,
&:focus {
  border:1px solid #d0021b;
  text-align: left;
}
`;
export function CustomText(props) {
 
  return (
    <Input {...props}/>
  );
}
CustomText.defaultProps = {
  type: 'text',
  id: 'id_custom_text',
  placeholder: '',
  error: false
}