//Reducer for character information Initialize State
import { put, takeLatest } from "redux-saga/effects";
import {
  filterByCondition,
  getTransactionByDaterange,
} from "../services/function.service";
export const actionTypes = {
  GetTransactions: "[GetTransactions] Action",
  GetTransactionsSuccess: "[GetTransactionsSuccess] Action",
  SetLoadingFlag: "[SetLoadingFlag] Action",
  SetFilteredTransactions: "[SetFilteredTransactions] Action",
  FilterTransactions: "[FilterTransactions] Action",
  GetTransaction: "[GetTransaction] Action",
};

const initialState = {
  transactions: [],
  loading: false,
  filteredTransactions: [],
  transaction: null,
};

//Define Actions
export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetTransactionsSuccess: {
      const { transactions } = action.payload;
      return { ...state, transactions };
    }
    case actionTypes.SetLoadingFlag: {
      const { isLoading } = action.payload;
      return { ...state, isLoading };
    }
    case actionTypes.SetFilteredTransactions: {
      const { filteredTransactions } = action.payload;
      return { ...state, filteredTransactions };
    }
    case actionTypes.FilterTransactions: {
      const { condition } = action.payload;
      let transactions = state.transactions.slice();

      transactions = getTransactionByDaterange(
        transactions,
        condition.dateRange
      );
      transactions = filterByCondition(transactions, condition.filters);

      const filteredTransactions = transactions.sort((a, b) => {
        if (condition.sort === "amount") {
          if (condition.sortDirection === "asc")
            return a[condition.sort] - b[condition.sort];
          else return b[condition.sort] - a[condition.sort];
        } else {
          if (condition.sortDirection === "asc") {
            if (a[condition.sort] < b[condition.sort]) {
              return -1;
            }
            if (b[condition.sort] < a[condition.sort]) {
              return 1;
            }
            return 0;
          } else {
            if (a[condition.sort] > b[condition.sort]) {
              return -1;
            }
            if (b[condition.sort] > a[condition.sort]) {
              return 1;
            }
            return 0;
          }
        }
      });
      return { ...state, filteredTransactions };
    }
    case actionTypes.GetTransaction: {
      let transaction;
      state.transactions.map((item, index, array) => {
        if (item.id.toString() === action.payload.id) transaction = item;
        return array;
      });

      return { ...state, transaction };
    }
    default:
      return state;
  }
};

export const actions = {
  getTransactions: () => ({ type: actionTypes.GetTransactions, payload: {} }),
  getTransactionsSuccess: (transactions) => ({
    type: actionTypes.GetTransactionsSuccess,
    payload: { transactions },
  }),
  setLoadingFlag: (isLoading) => ({
    type: actionTypes.SetLoadingFlag,
    payload: { isLoading },
  }),
  setFilteredTransactions: (filteredTransactions) => ({
    type: actionTypes.SetFilteredTransactions,
    payload: { filteredTransactions },
  }),
  filterTransactions: (condition) => ({
    type: actionTypes.FilterTransactions,
    payload: { condition },
  }),
  getTransaction: (id) => ({
    type: actionTypes.GetTransaction,
    payload: { id },
  }),
};

const getTransactionFromJson = () => {
  return require("../data.json");
};

export function* saga() {
  yield takeLatest(
    actionTypes.GetTransactions,
    function* getTransactionsRequested(action) {
      yield put(actions.setLoadingFlag(true));
      const data = yield getTransactionFromJson();
      yield put(actions.getTransactionsSuccess(data.payment_transactions));
      yield put(actions.setFilteredTransactions(data.payment_transactions));
      yield put(actions.setLoadingFlag(false));
    }
  );
}
