import moment from "moment";

export const filterByCondition = (transactions, cond) => {
  let flag;
  return transactions.filter((el) => {
    if (cond.length === 0) return el;
    else {
      flag = true;
      for (let i = 0; i < cond.length; i++) {
        if (
          cond[i].matchedBy === "contains" &&
          !el[cond[i].name].includes(cond[i].text)
        ) {
          flag = false;
        } else if (
          cond[i].matchedBy === "starts with" &&
          !el[cond[i].name].startsWith(cond[i].text)
        ) {
          flag = false;
        } else if (
          cond[i].matchedBy === "ends with" &&
          !el[cond[i].name].endsWith(cond[i].text)
        ) {
          flag = false;
        } else if (
          cond[i].matchedBy === "equal" &&
          el[cond[i].name] !== cond[i].text &&
          cond[i].text !== ""
        ) {
          flag = false;
        }
      }

      if (flag === true) return el;
    }
    return this;
  });
};

export const vAmount = (amount, currency) => {
  let fAmount = amount / 100;
  let fAmountArray = fAmount.toString().split(".");

  if (fAmountArray.length === 2 && fAmountArray[1].length === 1) fAmount += "0";
  if (fAmountArray.length === 2 && fAmountArray[1].length === 0)
    fAmount += "00";
  return fAmount + " " + currency;
};

export const getTransactionByDaterange = (transactions, daterange) => {
  if (daterange == null) return transactions;
  return transactions.filter((el) => {
    return moment(el.created_at).isBetween(
      moment(daterange[0]).format("YYYY-MM-DD HH:mm:ss"),
      moment(daterange[1]).format("YYYY-MM-DD HH:mm:ss")
    );
  });
};
