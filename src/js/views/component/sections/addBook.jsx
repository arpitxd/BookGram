import React from 'react';
import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
export default class AddBook extends React.Component {
    constructor(props){
        super(props);
    }
    uploadBook = () => {
        let collectionObj = getDataFromLocalStorage('collections');
        let collectionArr = [];
        if(collectionObj){
            collectionArr = collectionObj.value;
        } 
        const id = (new Date()).getTime();
        let path = (window.URL || window.webkitURL).createObjectURL(this.state.fileData);
        let bookObj = {
            id: id,
            author: 'arpit',
            year: '2020',
            title: 'Bio',
            tag: 'New',
            rating: null,

            download: path
        }
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
                },
                () => {
                    console.log(this.state);
                }
            );
        } else {
            this.setState({
                fileName: ''
            });
        }
    }
    render() {
        return (
            <React.Fragment>
                <form action="javascript:void(0);" onSubmit={() => this.uploadBook()}>
                    <input type="file" id="myFile" name="filename" onChange={e => this.onChangeEvent(e)} />
                    <button type="submit">Add Book</button>
                </form>
            </React.Fragment>
            
        );
    }
}