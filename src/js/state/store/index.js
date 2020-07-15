import { createStore , applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import LatestBookReducer from 'basePath/state/reducers/latestbooks-reducer';
const allReducers = combineReducers({
	latestBooks: LatestBookReducer
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
