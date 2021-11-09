import * as transactionRedux from './transactionRedux';
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects'

//Combine all the sub reducers
export const rootReducer = combineReducers({
    transactions: transactionRedux.transactionReducer,
})

export const rootSage = function* rootSaga() {
    yield all([
        transactionRedux.saga()
    ])
}
