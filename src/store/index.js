import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers'

// export const store = createStore(rootReducer, 
//                                 compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export const store =  createStore(
    rootReducer, 
    undefined, 
    composeWithDevTools(
        /* logger must be the last middleware in chain to log actions */
        applyMiddleware(thunk)  
    )
);