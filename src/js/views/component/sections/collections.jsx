import React from 'react';
import {setDataToLocalStorge, getDataFromLocalStorage, getUrlFromQueryMap} from 'basePath/views/component/common/utilities';
import { CustomLi, CustomUl, SearchDIV, Select, Label } from 'basePath/views/component/atoms/htmlTags';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
import BooksView from 'basePath/views/component/common/booksView';
import {SearchBooksFromCollections, SortBooks } from 'basePath/views/component/common/bookSearch';
import queryString from 'query-string';
class Collections extends React.Component {
    constructor(props){
        super(props);
        let queryStringMap = queryString.parse(top.window.location.search);
        const booksObj = getDataFromLocalStorage('collections');
        let booksArr = [];
        this.pathName = top.window.location.pathname;
        if(booksObj){
            booksArr = booksObj.value;
        }
        this.state = {
            collectionObj: {
                data: booksArr,
                pageCount: 1,
                page: 1,
                count: booksArr.length
            },
            category: queryStringMap.category || 'title',
            query: queryStringMap.q || '',
            sort: queryStringMap.sort || '',
            order: queryStringMap.order || ''

        }
        this.userName = getDataFromLocalStorage('login').value;
    }
    onSubmit = () => {
        let filteredObj = SearchBooksFromCollections(this.state.query, this.state.category);
        this.setState({
            collectionObj: filteredObj
        });
        
        this.props.history.push(`${this.pathName}?q=${this.state.query}&category=${this.state.category}`);
    }
    deleteBook = (id) => {
        let booksArr = [...this.state.collectionObj.data];
        for(let index in booksArr){
            if(booksArr[index].id == id){
                booksArr.splice(index, 1);
                break;
            }
        }
        let collectionObj = this.state.collectionObj;
        collectionObj = {
            data: booksArr,
            pageCount: 1,
            page: 1,
            count: booksArr.length
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
                page: 1,
                count: booksArr.length
            }
            setDataToLocalStorge('collections', booksArr);
            this.setState({
                collectionObj: collectionObj
            })
        } else {
            this.forceUpdate();
        }
    }
    sort = (targetName, value) => {
        let collectionObj = this.state.collectionObj;
        if(targetName == 'order'){
            collectionObj.data = collectionObj.data.reverse();
        } else {
            collectionObj = SortBooks(value, this.state.collectionObj.data);
        }
        this.setState({
            collectionObj: collectionObj
        });
    }
    submitSort = (e) => {
        let queryStringMap = queryString.parse(top.window.location.search);
        queryStringMap[e.target.name] = e.target.value;
        let url = getUrlFromQueryMap(queryStringMap);
        this.sort(e.target.name, e.target.value);
        this.props.history.push(url);
       
    }
    componentDidMount() {
        if(this.state.query){
            let filteredObj = SearchBooksFromCollections(this.state.query, this.state.category);
            this.setState({
                collectionObj: filteredObj
            });
        }
        if (this.state.sort){
            this.sort('sort', this.state.sort);
        }
        if (this.state.order){
            this.sort('order', this.state.order);
        }
    }
    render() {
        let bookObj = getDataFromLocalStorage(this.userName).value.bookObj;
        return(
            <React.Fragment>
                <SearchDIV onChange={this.onChange} value={this.state.query}>
                    
                    <CustomText type="text" placeholder="Search Book by Author, Year, Ttitle" name="query" className={`searchbar ${this.state.error && 'error'}`} defaultValue={this.state.query}/>
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
                            <Label>Sort by:</Label>
                            <Select name="sort" onChange={e => this.submitSort(e)}>
                                <option value=''>Sort By</option>
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="size"> File Size</option>
                                <option value="rating">Ratings</option>
                                <option value="tag">Tags</option>
                            </Select>
                        </CustomLi>
                        <CustomLi>
                            <Label>Order:</Label>
                            <Select name="order" onChange={e => this.submitSort(e)}>
                                <option value="1">Ascending</option>
                                <option value="2">Descending</option>
                            </Select>
                        </CustomLi>
                    </CustomUl>
                    <CustomButton onClick={this.onSubmit} value="Search" />
                </SearchDIV>
                <BooksView 
                    data={this.state.collectionObj}
                    collectionPage={true}
                    query={this.state.query}
                    deleteBook={this.deleteBook}
                    bookObj={bookObj}
                    updateStatus={this.updateStatus}
                />
            </React.Fragment>
        );
    }
}

export default Collections;