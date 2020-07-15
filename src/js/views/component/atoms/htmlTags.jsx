import styled from 'styled-components';
import React from 'react';

export const TableUl = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
export const TableLi = styled.li`
    padding: 4px 0;
    margin: 3px 0 3px 10px;
    display: flex;
    flex-direction: column;
    flex: 0 0 30%;
    border: 1px solid;
    border-radius: 5px;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const SearchDIV = styled.div`
    display: flex;
    flex: 0 0 50%;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
    input[type='text'], button[type='button']{
        margin-left: 50px;
        flex: 0 0 24%;
    }
    

    ul {
        flex-direction: row;
        margin-right: 100px;
        li {
            flex-direction: row;
            margin-left: 0px;
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


export const Table = styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;`;
     
export const TD =  styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  `;

export const  TH =  styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  `;


export const Overlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 995;
    background: rgba(0, 0, 0, 0.5);
`;
  export const Loader = styled.div`
        border: 6px solid #f3f3f3;
        border-radius: 50%;
        margin: 20% 44%;
        border-top: 6px solid #3498db;
        width: 60px;
        height: 60px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
        @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
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