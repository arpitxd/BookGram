import React from 'react';
import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
import BooksView from 'basePath/views/component/common/booksView';
class Collections extends React.Component {
    constructor(props){
        super(props);
        const booksObj = getDataFromLocalStorage('collections');
        let booksArr = [];
        if(booksObj){
            booksArr = booksObj.value;
        }
        this.state = {
            collectionObj: {
                data: booksArr,
                pageCount: 1,
                page: 1
            }
        }
    }
    deleteBook = (id) => {
        let booksArr = [...this.state.collectionObj.data];
        for(let index in booksArr){
            console.log(index);
            if(booksArr[index].id == id){
                booksArr.splice(index, 1);
                break;
            }
        }
        let collectionObj = this.state.collectionObj;
        collectionObj = {
            data: booksArr,
            pageCount: 1,
            page: 1
        }
        this.setState({
            collectionObj: collectionObj
        })
    }
    render() {
        return(
            <React.Fragment>
                <BooksView data={this.state.collectionObj} showDelete={true} deleteBook={this.deleteBook}/>
            </React.Fragment>
        );
    }
}

export default Collections;