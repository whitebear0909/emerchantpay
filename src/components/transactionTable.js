import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { vAmount } from "../services/function.service";

const transactionTable = (props) => {
  const { fieldList, handleSort, sort, sortDirection, filteredTransactions } =
    props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr className="table-header bg-gray">
          {fieldList.map((item, index) => (
            <th
              onClick={
                item.sortable
                  ? () => handleSort(item.name)
                  : () => {
                      return;
                    }
              }
              className={
                item.sortable
                  ? item.name === sort
                    ? sortDirection === "asc"
                      ? "sortable-asc-field"
                      : "sortable-desc-field"
                    : "sortable-field"
                  : ""
              }
              key={index}
            >
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((item, index) => (
          <tr className="table-body" key={index + 1}>
            <td>{index + 1}</td>
            <td>{item.merchant_name}</td>
            <td>{item.terminal_name}</td>
            <td>{item.type.replace("Transaction", "")}</td>
            <td>{item.error_class.split("::")[0]}</td>
            <td>{item.card_holder}</td>
            <td>{item.card_number}</td>
            <td>
              <Link className="p-link" to={`/detail/${item.id}`}>
                {item.created_at.substr(2, item.created_at.length - 5)}
              </Link>
            </td>
            <td>{vAmount(item.amount, item.currency)}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default transactionTable;
