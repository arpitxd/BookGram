import React from 'react'
import { TableUl, TableLi, ErrorSpan, ReactContainer } from 'basePath/views/component/atoms/htmlTags';
import ReactPaginate from 'react-paginate';
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
            {bookObj && bookObj.data.length > 0 ? (
                <React.Fragment>

                <TableUl>
                    {bookObj.data.map((res, index) => (
                        <TableLi key={`${res.title}_${index}`}>
                            <em>Book: {res.title} from Author: {res.author}</em>
                            <em>Year: {res.year}</em>
                            <a href={res.download}>Download</a>
                            {props.collectionPage && (
                                <React.Fragment> 
                                        <em>
                                            Tag :<strong>{props.bookObj.readingStatus[res.id] == 1 ? 'Reading' : props.bookObj.readingStatus[res.id] == 2 ? 'Read' : 'New'}</strong>
                                        </em>
                                        {props.bookObj.readingStatus[res.id] == 2? (
                                            <React.Fragment>
                                                {props.bookObj.ratings[res.id] ? (
                                                    <React.Fragment>
                                                        <ul style={{display: 'flex', listStyle: 'none', marginLeft: '-40px', marginBottom: '10px'}}>
                                                            <li>Your Rating:</li>
                                                            <li style={{marginRight: '30px'}}><strong>{props.bookObj.ratings[res.id]}</strong></li>
                                                            <li>Overall Rating:</li>
                                                            <li><strong>{res.rating || 0}</strong></li>
                                                        </ul>
                                                    </React.Fragment>
                                                ) :(
                                                    <React.Fragment>
                                                        <ul style={{display: 'flex', listStyle: 'none', marginLeft: '-40px', marginBottom: '10px'}}>
                                                            <li>
                                                                Give Rating: 
                                                            </li>
                                                            <li>
                                                                <select name="ratings" onChange={(e) => props.updateStatus(e, res.id)} value=''>
                                                                    <option value=''>select</option>
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>
                                                                    <option value={3}>3</option>
                                                                    <option value={4}>4</option>
                                                                    <option value={5}>5</option>
                                                                </select>
                                                            </li>
                                                        </ul>
                                                        
                                                        
                                                    </React.Fragment>
                                                )}
                                                
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <ul style={{display: 'flex', listStyle: 'none', marginLeft: '-40px', marginBottom: '10px'}}>
                                                    <li>Reading Status: </li>
                                                    <li>
                                                        <select name="readingStatus" onChange={(e) => props.updateStatus(e, res.id)} defaultValue={props.bookObj.readingStatus[res.id]}>
                                                            <option value={0}>Select</option>
                                                            <option value={1}>Reading</option>
                                                            <option value={2}>Read</option>
                                                        </select>
                                                    </li>
                                                </ul>
                                                
                                                
                                            </React.Fragment>
                                        )}
                                    <button type="button" onClick={() =>props.deleteBook(res.id)}>Delete</button>
                                </React.Fragment>
                            )}
                        </TableLi>
                    )
                    )}
                </TableUl>
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
                <ErrorSpan>No Content Found</ErrorSpan>
            )}
            
        </React.Fragment>
    );
}