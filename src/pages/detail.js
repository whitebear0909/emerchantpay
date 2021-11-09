import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import * as transactions from "../redux/transactionRedux";
import {
  Container, Row, Col
} from "react-bootstrap";
import { vAmount } from "../services/function.service";

const Detail = (props) => {
  const dispatch = useDispatch();

  const {
    getTransaction,
    transaction,
  } = props;

  let { id } = useParams();   

  useEffect(() => {
    dispatch(getTransaction(id));
  }, [dispatch, getTransaction, id]);

  return (
    <Container>
      <div className="mt-2 text-start">
        <Link to="/home"><img alt="back" src="/assets/img/back-arrow.png" width="50px"/></Link>
      </div>
      {
        transaction && (
          <Row className="mt-5 justify-content-center">
            <Col xs={6} className="bg-dark text-white p-3">
              <Row>
                <Col xs={6} className="transaction-item-bottom">
                  <img alt="transaction" src="/assets/img/transaction.jpg" width="120px"/>
                  <div className="mt-2"><label>Card holder: </label> {transaction.card_holder}</div>
                  <div><label>Card number: </label> {transaction.card_number}</div>
                  <div><label>Amount: </label> {vAmount(transaction.amount, transaction.currency)}</div>
                </Col>
                <Col xs={6} className="text-start transaction-item-right">
                  <div className="mt-1"><label>Inique id: </label> {transaction.unique_id}</div>
                  <div className="mt-1"><label>Status: </label> {transaction.status}</div>
                  <div className="mt-1"><label>Merchant name: </label> {transaction.merchant_name}</div>
                  <div className="mt-1"><label>Terminal name: </label> {transaction.terminal_name}</div>
                  <div className="mt-1"><label>Type: </label> {transaction.type}</div>
                  <div className="mt-1"><label>Error Class: </label> {transaction.error_class}</div>
                  <div className="mt-1"><label>Error Message: </label> {transaction.error_message}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        )
      }
    </Container>
  ); 
}

const mapStatesToProps = (state) => ({
  transaction: state.transactions.transaction,
});

export default connect(mapStatesToProps, transactions.actions)(Detail);