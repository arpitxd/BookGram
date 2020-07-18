import React from 'react';
import { CustomButton, CustomText } from 'basePath/views/component/atoms/formFields';
import { ErrorSpan, CustomLi, CustomUl, SearchDIV } from 'basePath/views/component/atoms/htmlTags';
import { getEvent } from 'basePath/views/component/common/crudoperation';
import BooksView from 'basePath/views/component/common/booksView';
import 'cssPath/explore.css';
import Loading from 'basePath/views/component/common/loader';
import queryString from 'query-string';
class Explore extends React.Component {
    constructor(props) {
        super(props);
        let queryStringMap = queryString.parse(top.window.location.search);
        this.state = {
            query: queryStringMap.q || '',
            category: queryStringMap.category || 'title',
            isLoaded: false,
            data: [],
            currentPage: queryStringMap.page || 1
        };

    }
    onChange = (e) => {
        let error = '';
        this.setState({
            [e.target.name]: e.target.value,
            error: error
        });

    }
    updateCurrentPage = (currentPage) => {
        this.setState({
            currentPage: currentPage,
            isLoaded: false
        }, () => {
            this.getBookResult();
        });
    }
    getBookResult = () => {
        this.setState({
            showLoader: true
        })
        let that = this;
        let url = `http://localhost:9090/books?q=${this.state.query}&category=${this.state.category}&page=${this.state.currentPage}`;
        getEvent(url).then(res => {
            that.setState({
                isLoaded: true,
                data: res.data,
                showLoader: false
            });

        }).catch(err => {
            console.log(err);
        });
    }
    onSubmit = () => {
        if (!this.state.query) {
            this.setState({ error: 'Field is required' });
            return;
        }
        let pathName = top.window.location.pathname;
        this.setState({
            currentPage: 1
        }, this.getBookResult());
        this.props.history.push(`${pathName}?q=${this.state.query}&category=${this.state.category}`);

    }
    componentDidMount() {

        window.onscroll = function () { myFunction() };
        var searchbar = document.getElementById("id_search_div");
        var sticky = searchbar.offsetTop;
        var myFunction = function () {
            if (window.pageYOffset >= sticky) {
                searchbar.classList.add('sticky');
            } else {
                searchbar.classList.remove('sticky');
            }
        }
        this.getBookResult();

    }
    render() {

        return (
            <React.Fragment>
                {this.state.showLoader && (
                    <Loading />
                )}
                <SearchDIV onChange={this.onChange} id="id_search_div">

                    <CustomText type="text" placeholder="Search Book by Author, Year, Ttitle" name="query" className={`searchbar ${this.state.error && 'error'}`} defaultValue={this.state.query} />
                    <CustomUl>
                        <CustomLi>
                            <input type="radio" name="category" value="title" defaultChecked={this.state.category == 'title' && true} />
                            <label>Title</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="author" defaultChecked={this.state.category == 'author' && true} />
                            <label>Author</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="series" defaultChecked={this.state.category == 'series' && true} />
                            <label>Series</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="periodical" defaultChecked={this.state.category == 'periodical' && true} />
                            <label>Periodical</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="publisher" defaultChecked={this.state.category == 'publisher' && true} />
                            <label>Publisher</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="year" defaultChecked={this.state.category == 'year' && true} />
                            <label>Year</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="identifier" defaultChecked={this.state.category == 'identifier' && true} />
                            <label>Identifier</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="md5" defaultChecked={this.state.category == 'md5' && true} />
                            <label>MD5</label>
                        </CustomLi>
                        <CustomLi>
                            <input type="radio" name="category" value="extension" defaultChecked={this.state.category == 'extension' && true} />
                            <label>Extension</label>
                        </CustomLi>

                    </CustomUl>
                    <CustomButton onClick={this.onSubmit} value="Search" />
                </SearchDIV>
                {this.state.isLoaded && (
                    <BooksView 
                        data={this.state.data}
                        currentPage={this.state.currentPage}
                        query={this.state.query || 'Empty'}
                        updateCurrentPage={this.updateCurrentPage} />
                )}

            </React.Fragment>
        );
    }
}

export default Explore;
