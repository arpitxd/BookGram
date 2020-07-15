import React from 'react';
import { Overlay, Loader } from 'basePath/views/component/atoms/htmlTags';
export default function Loading(props) {

    return (
        <Overlay>
            <Loader />
        </Overlay>
    );
}