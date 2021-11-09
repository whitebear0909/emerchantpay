import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as transactions from "../redux/transactionRedux";
import {
  Container, Row, Col
} from "react-bootstrap";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { matchByList, fieldList } from "../services/constant";
import SelectFilter from "../components/selectFilter";
import AddFilter from "../components/addFilter";
import FilterItem from "../components/filterItem";
import TransactioinTable from "../components/transactionTable";

let filterNameList = [
  { name: "merchant_name" },
  { name: "terminal_name" },
  { name: "type" },
  { name: "error_class" },
  { name: "card_holder" },
  { name: "card_number" },
  { name: "amount" },
  { name: "status" },
];

const HomePage = (props) => {
  const {
    getTransactions,
    filteredTransactions,
    isLoading,
    filterTransactions,
  } = props;

  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [dateRange, setDateRange] = useState([
    new Date(0, 0, 0, 0, 0),
    new Date(),
  ]);
  const [visibleNewFilterArea, setVisibleNewFilterArea] = useState(false);
  const [matchedBy, setMatchedBy] = useState("Matched By");
  const [filterName, setFilterName] = useState("Filters");
  const [filterText, setFilterText] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch, getTransactions]);

  useEffect(()=>{
    filterTransactions({ dateRange, sort, sortDirection, filters });
  },[sort, sortDirection, dateRange, filters, filterTransactions])

  const handleSort = (sortName) => {
    if (sort === sortName) {
      if (sortDirection === "asc") setSortDirection("desc");
      else setSortDirection("asc");
    } else {
      setSort(sortName);
      setSortDirection("asc");
    }
  };
  
  const handleDateRangePicker = (dateRange) => {
    setDateRange(dateRange);
  };

  const handleApplyFilter = () => {
    let tempFilters = filters.slice();
    tempFilters.push({ name: filterName, matchedBy: matchedBy, text: filterText });
    setFilters(tempFilters);

    setVisibleNewFilterArea(false);
    setMatchedBy("Matched By");
    setFilterName("Filters");
    setFilterText("");
    setDisableInput(true);
    filterNameList = filterNameList.filter((el) => {
      return el.name !== filterName;
    });
  };

  const handleResetFilterCond = (name, matchedBy, text) => {
    let tempFilters = filters.slice();
    if(text != null){
      tempFilters.map((item) => {
        if(item.name === name) item.text = text;
        return item;
      })
    }

    if(matchedBy != null){
      tempFilters.map((item) => {
        if(item.name === name) item.matchedBy = matchedBy;
        return item;
      })
    }

    setFilters(tempFilters);
  }

  const handleRemoveFilter = (name) => {
    let tempFilters = filters.slice();
    tempFilters = tempFilters.filter((el) => {
      return el.name !== name;
    });

    setFilters(tempFilters);
    filterNameList.push({name: name});
  }

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <Row className="mt-3 justify-content-center">
            <Col xs={6}>
            <DateTimeRangePicker
              onChange={(dateRange) => handleDateRangePicker(dateRange)}
              value={dateRange}
              timePicker24Hour={true}
              format={"y-MM-dd H:mm:ss"}
            />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={2} className="text-start">
              <SelectFilter
                filterNameList = {filterNameList}
                filterName = {filterName}
                setVisibleNewFilterArea = {setVisibleNewFilterArea}
                setFilterName = {setFilterName}
              />
            </Col>
            <Col xs={4}>
              {visibleNewFilterArea ? (
              <AddFilter
                matchByList = {matchByList}
                filterText = {filterText}
                matchedBy = {matchedBy}
                setMatchedBy =  {setMatchedBy}
                setDisableInput =  {setDisableInput}
                disableInput = {disableInput}
                setFilterText = {setFilterText}
                handleApplyFilter = {handleApplyFilter}
              />
            ) : (
              ""
            )}
            </Col>
          </Row>
          <Row>
              {filters.map((item, index) => (
                <FilterItem
                key = {index}
                filter = {item}
                matchByList = {matchByList}
                handleResetFilterCond = {handleResetFilterCond}
                handleRemoveFilter = {handleRemoveFilter}
                />
              ))}
          </Row>
          <Row className=" mt-1">
            <TransactioinTable
              fieldList = {fieldList}
              handleSort = {handleSort}
              sort = {sort}
              sortDirection = {sortDirection} 
              filteredTransactions = {filteredTransactions}
            />
          </Row>
        </Container>
      )}
    </>
  );
};

const mapStatesToProps = (state) => ({
  transactions: state.transactions.transactions,
  isLoading: state.transactions.isLoading,
  filteredTransactions: state.transactions.filteredTransactions,
});

export default connect(mapStatesToProps, transactions.actions)(HomePage);
