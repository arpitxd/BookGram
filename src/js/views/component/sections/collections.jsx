import React from 'react';
import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
import { CustomLi, CustomUl, SearchDIV } from 'basePath/views/component/atoms/htmlTags';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
import BooksView from 'basePath/views/component/common/booksView';
import {SearchBooksFromCollections, SortBooks } from 'basePath/views/component/common/bookSearch';
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
            },
            category: 'title',
            query: ''

        }
        this.userName = getDataFromLocalStorage('login').value;
    }
    onSubmit = () => {
        let filteredObj = SearchBooksFromCollections(this.state.query, this.state.category);
        this.setState({
            collectionObj: filteredObj
        })
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
        setDataToLocalStorge('collections', booksArr);
        this.setState({
            collectionObj: collectionObj
        })
    }
    onChange = (e) => {
        let error = '';
        this.setState({
            [e.target.name]: e.target.value,
            error: error
        });
    }
    updateStatus = (e, id) => {
        let userDetailObj = getDataFromLocalStorage(this.userName).value;
        let bookObj = userDetailObj.bookObj;
        let newUpdateObject = bookObj[e.target.name] || {};
        newUpdateObject[id] = e.target.value;
        bookObj[e.target.name] = newUpdateObject;
        userDetailObj.bookObj = bookObj;
        setDataToLocalStorge(this.userName, userDetailObj);
        if(e.target.name == 'ratings'){
            let booksArr = [...this.state.collectionObj.data];
            for(let index in booksArr){
                if(booksArr[index].id == id){
                    let rateCount = booksArr[index].rateCount;
                    let totalRating = booksArr[index].rating * rateCount;
                    totalRating += parseInt(e.target.value);
                    rateCount += 1;
                    totalRating = totalRating/rateCount;
                    booksArr[index].rateCount = rateCount;
                    booksArr[index].rating = totalRating;
                    break;
                }
            }
            let collectionObj = this.state.collectionObj;
            collectionObj = {
                data: booksArr,
                pageCount: 1,
                page: 1
            }
            setDataToLocalStorge('collections', booksArr);
            this.setState({
                collectionObj: collectionObj
            })
        } else {
            this.forceUpdate();
        }
    }
    sort = (e) => {
        let collectionObj = this.state.collectionObj;
        if(e.target.name == 'order'){
            collectionObj.data = collectionObj.data.reverse();
        } else {
            collectionObj = SortBooks(e.target.value);
        }
        this.setState({
            collectionObj: collectionObj
        });
    }

    render() {
        let bookObj = getDataFromLocalStorage(this.userName).value.bookObj;
        return(
            <React.Fragment>
                <SearchDIV onChange={this.onChange}>
                    
                    <CustomText type="text" placeholder="Search Book by Author, Year, Ttitle" name="query" className={`searchbar ${this.state.error && 'error'}`}/>
                    <CustomUl>
                        <CustomLi>
                            <input type="radio" name="category" value="title" defaultChecked={this.state.category == 'title' && true}/>
                            <label>Title</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="author" defaultChecked={this.state.category == 'author' && true}/>
                            <label>Author</label>
                        </CustomLi>
                    </CustomUl>
                    <CustomUl>
                        <CustomLi>
                            <label>Sort by:</label>
                            <select name="sort" onChange={e => this.sort(e)} style={{height: '20px'}}>
                                <option value=''>Sort By</option>
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="size"> File Size</option>
                                <option value="rating">Ratings</option>
                                <option value="tag">Tags</option>
                            </select>
                        </CustomLi>
                        <CustomLi>
                            <label>Order:</label>
                            <select name="order" onChange={e => this.sort(e)} style={{height: '20px'}}>
                                <option value="1">Ascending</option>
                                <option value="2">Descending</option>
                            </select>
                        </CustomLi>
                    </CustomUl>
                    <CustomButton onClick={this.onSubmit} value="Search" />
                </SearchDIV>
                <BooksView data={this.state.collectionObj} collectionPage={true} deleteBook={this.deleteBook} bookObj={bookObj} updateStatus={this.updateStatus}/>
            </React.Fragment>
        );
    }
}

export default Collections;