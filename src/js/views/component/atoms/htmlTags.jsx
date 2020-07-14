import styled from 'styled-components';
import React from 'react';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
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
