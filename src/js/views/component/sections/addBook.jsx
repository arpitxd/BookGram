import React from 'react';
import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
import Modal from 'basePath/views/component/common/modal';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
export default class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showMoreDetailForm: false
        };
    }
    uploadBook = (e) => {
        let collectionObj = getDataFromLocalStorage('collections');
        let collectionArr = [];
        if(collectionObj){
            collectionArr = collectionObj.value;
        } 
        const id = (new Date()).getTime();
        let path = (window.URL || window.webkitURL).createObjectURL(this.state.fileData);
        let bookObj= {};
        for(let elm of e.target.elements){
            bookObj[elm.name] = elm.value;
            if(elm.name == 'title'){
                let titleTag = elm.value.split(' ').join(',').split(','); 
                bookObj.titleTag = titleTag;
            }
            if(elm.name == 'author'){
                let authorTag = elm.value.split(' ').join(',').split(','); 
                bookObj.authorTag = authorTag;
            }
            
        }
        bookObj.rating = 0;
        bookObj.rateCount = 0;
        bookObj.download = path;
        bookObj.id = id;
        bookObj.size = this.state.fileSize;
        this.setState({
            showMoreDetailForm: false
        });
        collectionArr.push(bookObj);
        setDataToLocalStorge('collections', collectionArr);
    }
    onChangeEvent = (e) => {
        e.preventDefault();
        if (event.target.files.length == 1) {
            let fileData = event.target.files[0];
            let fileSize = event.target.files[0].size / 1024 / 1024; // convert KB to MB
            this.setState(
                {
                    fileName: event.target.files[0].name,
                    fileSize: fileSize,
                    fileData: fileData
                }
            );
        } else {
            this.setState({
                fileName: ''
            });
        }
    }
    togglePopup = () => {
        let status = !this.state.showMoreDetailForm
        this.setState({
            showMoreDetailForm: status
        });
    }
    render() {
        return (
            <React.Fragment>
                <CustomButton type="button" onClick={this.togglePopup} value="Add Book" style={{marginLeft: '50px' }}/>
                {this.state.showMoreDetailForm && (
                    <Modal modalHeader="Enter Book Details" closeCallback={this.togglePopup}>
                        <form action="javascript:void(0);" onSubmit={(e) => this.uploadBook(e)}>
                            <ul>
                                <li><CustomText type="text" name="author" placeholder="Author"/></li>
                                <li><CustomText type="text" name="description" placeholder="Description"/></li>
                            </ul>
                            <ul>
                                <li><CustomText type="text" name="title" placeholder="Title"/></li>
                                <li><CustomText type="text" name="year" placeholder="Year"/></li>
                            </ul>
                            <ul>
                                <li><input type="file" id="myFile" name="filename" onChange={e => this.onChangeEvent(e)} /></li>
                            </ul>
                            <ul>
                                <li><CustomButton type="submit" value="Upload" /></li>
                            </ul>
                        </form>
                    </Modal>
                )}
            </React.Fragment>
            
        );
    }
}