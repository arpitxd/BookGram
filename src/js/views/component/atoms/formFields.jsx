import styled from 'styled-components';
import React from 'react';
const Button = styled.button`
  cursor: pointer;
  background: blue;
  font-size: 16px;
  border-radius: 5px;
  color: white;
  border: 2px solid blue;
  flex: auto;
  height: 44px;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
`;

export function CustomButton(props){
    return (
        <Button type="button" onClick={props.onClick}>{props.value}</Button>
    );
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
&:error,
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