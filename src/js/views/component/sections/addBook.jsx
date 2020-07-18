import React from 'react';
import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
import Modal from 'basePath/views/component/common/modal';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';


//this class is using for add book
export default class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showMoreDetailForm: false
        };
    }
    uploadBook = (e) => { //uploading booking in local storage
        let collectionObj = getDataFromLocalStorage('collections');
        let collectionArr = [];
        if(collectionObj){
            collectionArr = collectionObj.value;
        } 
        const id = (new Date()).getTime();
        let path = (window.URL || window.webkitURL).createObjectURL(this.state.fileData); //file download path
        let bookObj= {};
        for(let elm of e.target.elements){
            bookObj[elm.name] = elm.value;
            if(elm.name == 'title'){
                let titleTag = elm.value.split(' ').join(',').split(','); 
                bookObj.titleTag = titleTag; //creating titile tags array for searching
            }
            if(elm.name == 'author'){
                let authorTag = elm.value.split(' ').join(',').split(','); 
                bookObj.authorTag = authorTag; //creating author tags for searching
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
        this.updateUserHistory();
    }
    updateUserHistory = () => { //udating user uploading history after two login
        const userName = getDataFromLocalStorage('login').value;
        let userDetailObj = getDataFromLocalStorage(userName);
        if(userDetailObj.value.loginCounter > 2){
            let key = (new Date()).getTime();
            let userHistory = {
                [key]: `Book ${this.state.fileName} uploaded at ${new Date()}`
            };
            userDetailObj.value.lastHistory = userHistory;
            setDataToLocalStorge(userName, userDetailObj.value);
        }
    }
    onChangeEvent = (e) => { //updating file data into state
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
    togglePopup = () => { //toggling add book form
        let status = !this.state.showMoreDetailForm
        this.setState({
            showMoreDetailForm: status
        });
    }
    render() {
        return (
            <React.Fragment>
                <CustomButton type="button" onClick={this.togglePopup} value="Add Book" style={{marginRight: '7.5%',marginTop: '-0.5%', float: 'right' }}/>
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