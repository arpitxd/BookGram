import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
import { Overlay } from 'basePath/views/component/atoms/htmlTags';
const ModalWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 990;
    box-sizing: border-box;
`;
const ModalContent = styled.div`
    z-index: 999;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    width: 520px;
    transform: translate(-50%, -50%);
    background: #fff;
    position: absolute;
    border-radius: 4px;
    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        margin-left: -42px;

        li {
            margin: 3px 0 3px 10px;
            display: flex;
            flex-direction: column;
            flex: 0 0 30%;
        }
    }
`;

const ModalTitlebar = styled.div`
    color: #333;
    font: 18px Roboto,Arial,Times,serif;
    margin: 0;
    padding: 16px 10px 16px 5%;
    font-weight: 400;
    overflow: visible;
    white-space: normal;
    line-height: 25px;
    position: relative;
    border: none;
    background: #f4f5f5;
    color: #303e4b;
    border-radius: 4px 4px 0 0;

    a {
        cursor: pointer;
        position: absolute;
        right: 10px;
        width: 20px;
    }
`;
const ModalChildren = styled.div`
    float: left;
    width: 90%!important;
    padding: 0 5%!important;
    margin-top: 10px;
    margin-bottom: 30px;
`;

//this class is generic Modal just need to send HEder, close function, save function and modal content
export default function Modal(props) {
    const {
        modalHeader,
        closeCallback,
        children,
    } = props;
    return (
        <React.Fragment>
            <ModalWrapper>
                <Overlay />
                <ModalContent>
                    <ModalTitlebar>
                        <span>{modalHeader}</span>
                        {closeCallback && (
                            <a className="close" onClick={closeCallback}>
                                &#x2715;
                            </a>
                        )}
                    </ModalTitlebar>
                    <ModalChildren>
                        {children}
                    </ModalChildren>
                </ModalContent>
            </ModalWrapper>
        </React.Fragment>
    );
}
Modal.propTypes = {
    closeCallback: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    children: PropTypes.element,
    cancelButtonId: PropTypes.string,
    modalHeader: PropTypes.string,
};
Modal.defaultProps = {
    closeCallback: false,
    children: <div></div>,
    cancelButtonId: '',
    modalHeader: '',
};
