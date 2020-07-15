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