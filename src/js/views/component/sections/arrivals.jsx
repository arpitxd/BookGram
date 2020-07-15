import React from 'react';
import { connect } from 'react-redux';
import { getLatestBook} from 'basePath/state/actions/latestBooks/lastestbook-action';
import BooksView from 'basePath/views/component/common/booksView';
import AddBook from 'basePath/views/component/sections/addBook';
import Loading from 'basePath/views/component/common/loader';
class Arrivals extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data: []
        }
        
    }
    componentDidMount(){
        this.props.getLatestBook();
    }
    render() {
        const { isLoaded, data } = this.props.latestBooks;
        return(
            <React.Fragment>
                {isLoaded ? (
                    <BooksView data={data} />
                ) : (
                    <Loading />
                )}
                <AddBook />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { latestBooks: state.latestBooks };
};

function mapDispatchToProps(dispatch) {
    return {
        getLatestBook: () => {
            return dispatch(getLatestBook());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Arrivals);
