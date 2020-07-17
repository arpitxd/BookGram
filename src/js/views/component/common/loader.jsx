import React from 'react';
import { Overlay } from 'basePath/views/component/atoms/htmlTags';
import styled from 'styled-components';
const Loader = styled.div`
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

export default function Loading(props) {

    return (
        <Overlay>
            <Loader />
        </Overlay>
    );
}