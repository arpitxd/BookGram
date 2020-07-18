import styled from 'styled-components';
import React from 'react';
//this class contain generic html div with styled css
export const Button = styled.button`
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.21);
  border-radius: 4px;
  width: auto;
  margin: 5px 10px 20px 0px;
  padding: 10px 13px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  border: 0;
  font-weight: 400;
  background-image: linear-gradient(136deg, #a296d9 0%, #7faee0 100%);
`;
export const AnchorButton = styled.span`
    border-radius: 4px;
    color: #5364c4 !important;
    border: solid 1px #d7d5d5!important;
    font-size: 14px;
    padding: 5px;
    float: right;
    text-align: center;
    cursor: pointer;
`;
export const Select = styled.select`
    background: white;
    1px solid #c2c2c2;
    border-radius: 4px;
    padding: 5px;
    height: 30px;
    margin-top: -5px;
`;
export const Label = styled.label`
    margin-right: 10px;
`;

export const LoginDiv = styled.div`
    width: 400px;
    top: 30%;
    left: 35%;
    position: fixed;
    background: white;
    border-radius: 4px;
    padding: 40px;
    box-shadow: 0 0 16px 0 rgba(135,142,172,0.2);
`;
export const BodyDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(244, 245, 245);
    overflow: hidden;
`;



const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const SearchDIV = styled.div`
    display: flex;
    flex: 0 0 50%;
    height: 60px;
    padding-top: 20px;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
    input[type='text'], button[type='button']{
        flex: 0 0 15%;
    }
    .searchbar {
        margin-left: 40px;
    }
    ul {
        flex-direction: row;
        margin: 0px;
        margin-right: 50px;
        li {
            flex-direction: row;
            margin: 10px 0px 0px 10px;
            
        }
    }

`;
export function CustomUl(props){
    return(
        <Ul>
            {props.children}
        </Ul>
    );
}
const Li = styled.li`
  padding: 4px 0;
  margin: 3px 0;
  display: flex;
  flex-direction: column;
  margin-left: -32px;
`;
export function CustomLi(props){
    return(
        <Li>
            {props.children}
        </Li>
    );
}
const ESpan = styled.span`
    color: #d0021b;
`;
    
export function ErrorSpan(props){
    return (
        <ESpan>
            {props.children}
        </ESpan>
    );

}
ErrorSpan.defaultProps = {
    children: 'Error'
}

export const Overlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 995;
    background: rgba(0, 0, 0, 0.5);
`;
  
export const ReactContainer = styled.div`
    padding: 15px 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    ul{
        width: 100%;
        color: #5364c4;
        list-style: none;
        li {
            display: inline-block;
            padding: 5px 4px;
            margin: 0 2px;
            cursor: pointer;

            &.disabled {
                box-shadow: none;
                color: #9da6ae;
                pointer-events: none;
                border: none !important;
                background: transparent !important;
                opacity: 0.5;
            }
            &.active {
                background: #5667c3;
                color: #fff !important;
            }
        }
    }
    
  `;