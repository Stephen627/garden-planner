import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../src/app/reducers';

export default createStore(reducers, applyMiddleware(thunk));