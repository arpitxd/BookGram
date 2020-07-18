import React from 'react'
import styled from 'styled-components';
import { ErrorSpan, ReactContainer, AnchorButton, Select, Label } from 'basePath/views/component/atoms/htmlTags';
import AddBook from 'basePath/views/component/sections/addBook';
import ReactPaginate from 'react-paginate';
const BooksUl = styled.ul`
    list-style: none !important;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const BooksLi = styled.li`
    margin: 3px 0 3px 10px;
    display: flex;
    flex-direction: column;
    flex: 0 0 30%;
    background: #fff;
    box-shadow: 0 0 16px 0 rgba(135,142,172,0.2);
    padding: 10px;
    position: relative;
    font-size: 14px;
    color: #6d7883;
    line-height: 20px;

    a {
        display: contents;
        text-decoration: none;
    }
`;

const BooksButton = styled.button`
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.21);
    border-radius: 4px;
    width: auto;
    margin: 10px;
    padding: 6px 10px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    border: 0;
    font-weight: 400;
    background-image: linear-gradient(136deg, #a296d9 0%, #7faee0 100%);
`;

const BookHeading = styled.h3`
    font-size: 17px;
    color: #303e4b;
    font-family: "PT Sans",sans-serif;
    font-weight: 600;
    padding: 0 0 5px 0;
    word-break: break-word;
    font-style: normal;
    margin: 0;
`;

const InnerBookUl = styled.ul`
    margin: 20px 40px 0px -20px;
    font-family: "PT Sans",sans-serif;
    list-style: none !important;
    display:flex;
`;
const InnerBookLi = styled.li`
    width: 40%;
    margin-right: 10px;
`;
const BookCountDiv = styled.div`
    width: 100%;
    height: 45px;
    background-color: #f4f5f5;
    padding-top: 20px;
    padding-left: 50px;
`;
export default function BooksView(props){
    let bookObj = props.data;
    let pageCount = bookObj && bookObj.pageCount;
    const handlePageClick = dataPaginate => {
        const selectedPage = dataPaginate.selected + 1;
        let currentPage = 0;
        if(selectedPage !== 1){
            currentPage = selectedPage - 1;
        }
        props.updateCurrentPage(currentPage);
    };
    return (
        <React.Fragment>
            <BookCountDiv>
                <strong>
                    {bookObj.count} books found for {props.query}
                </strong>
                {!props.collectionPage && (
                    <AddBook />
                )}
            </BookCountDiv>
            {bookObj && bookObj.data.length > 0 ? (
                <React.Fragment>

                <BooksUl>
                    {bookObj.data.map((res, index) => (
                        <BooksLi key={`${res.title}_${index}`}>
                            <InnerBookUl>
                                <li>
                                    <BookHeading>{res.title}</BookHeading>
                                    <span>Author: {res.author}</span>
                                </li>
                                <li>
                                    <React.Fragment>
                                        <ul style={{display: 'flex', listStyle: 'none',position: 'absolute', right: '136px'}}>
                                            <li><Label>Rating:</Label></li>
                                            <li><strong>{res.rating || 0}</strong></li>
                                        </ul>
                                    </React.Fragment>
                                </li>
                            </InnerBookUl>
                            <InnerBookUl>
                                <InnerBookLi>
                                    <em>Year: {res.year}</em>
                                </InnerBookLi>
                                <InnerBookLi>
                                    <AnchorButton> 
                                        <a href={res.download}>Download</a>
                                    </AnchorButton>
                                </InnerBookLi>
                            </InnerBookUl>
                            {props.collectionPage && (
                                <React.Fragment>
                                    <InnerBookUl>
                                        <InnerBookLi>
                                            <em>
                                                <Label>Tag :</Label><strong>{props.bookObj.readingStatus[res.id] == 1 ? 'Reading' : props.bookObj.readingStatus[res.id] == 2 ? 'Read' : 'New'}</strong>
                                            </em>
                                        </InnerBookLi>
                                        {props.bookObj.readingStatus[res.id] == 2? (
                                            <InnerBookLi>
                                                {props.bookObj.ratings[res.id] ? (
                                                    <React.Fragment>
                                                        <ul style={{display: 'flex', listStyle: 'none', marginBottom: '10px', position: 'absolute', right: '108px'}}>
                                                            <li><Label>Your Rating:</Label></li>
                                                            <li style={{marginRight: '30px'}}><strong>{props.bookObj.ratings[res.id]}</strong></li>
                                                        </ul>
                                                    </React.Fragment>
                                                ) :(
                                                    <React.Fragment>
                                                        <ul style={{display: 'flex', listStyle: 'none', marginLeft: '-6px', marginBottom: '10px'}}>
                                                            <li>
                                                            <Label>Give Rating: </Label>
                                                            </li>
                                                            <li>
                                                                <Select name="ratings" onChange={(e) => props.updateStatus(e, res.id)} value=''>
                                                                    <option value=''>Select</option>
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>
                                                                    <option value={3}>3</option>
                                                                    <option value={4}>4</option>
                                                                    <option value={5}>5</option>
                                                                </Select>
                                                            </li>
                                                        </ul>
                                                    </React.Fragment>
                                                )}
                                            </InnerBookLi>
                                        ) : (
                                            <InnerBookLi>
                                                <ul style={{display: 'flex', listStyle: 'none', marginLeft: '-45px', marginBottom: '10px'}}>
                                                    <li><Label>Reading Status: </Label></li>
                                                    <li>
                                                        <Select name="readingStatus" onChange={(e) => props.updateStatus(e, res.id)} defaultValue={props.bookObj.readingStatus[res.id]}>
                                                            <option value={0}>Select</option>
                                                            <option value={1}>Reading</option>
                                                            <option value={2}>Read</option>
                                                        </Select>
                                                    </li>
                                                </ul>
                                            </InnerBookLi>
                                        )}
                                    </InnerBookUl>
                                    <BooksButton type="button" onClick={() =>props.deleteBook(res.id)}>Delete</BooksButton>
                                </React.Fragment>
                            )}
                        </BooksLi>
                    )
                    )}
                </BooksUl>
                {pageCount > 1 && 
                    <ReactContainer>
                        <ReactPaginate
                            previousLabel={'< Previous'}
                            nextLabel={'Next >'}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            forcePage={props.currentPage}
                            previousLinkClassName={'previous_page'}
                            nextLinkClassName={'next_page'}
                            disabledClassName={'disabled'}
                            activeClassName={'active'}
                        />
                    </ReactContainer>
                }
                </React.Fragment>
            ) : (
                <div style={{margin: '10% 45%'}}>
                <ErrorSpan>No Content Found</ErrorSpan>
                </div>
            )}
            
        </React.Fragment>
    );
}