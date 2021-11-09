import React from "react";

import {
  Dropdown,
  CloseButton,
  InputGroup,
  FormControl,
  Col,
} from "react-bootstrap";

const FilterItem = (props) => {
  const { filter, matchByList, handleResetFilterCond, handleRemoveFilter } =
    props;

  return (
    <Col xs={6} className="mt-1">
      <InputGroup className="bg-secondary p-1 rounded-1">
        <span className="mt-2 text-white">
          <strong>{filter.name}:&nbsp;&nbsp; </strong>
        </span>
        <Dropdown>
          <Dropdown.Toggle className="p-1" variant="info">
            {filter.matchedBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {matchByList.map(
              (matchItem, index, array, itemName = filter.name) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    handleResetFilterCond(itemName, matchItem.name, null);
                  }}
                >
                  {matchItem.name}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
        <FormControl
          defaultValue={filter.text}
          onChange={(e) =>
            handleResetFilterCond(filter.name, null, e.target.value)
          }
        />
        <CloseButton
          className="ms-2 mt-2 text-white"
          onClick={() => {
            handleRemoveFilter(filter.name);
          }}
          variant="white"
        ></CloseButton>
      </InputGroup>
    </Col>
  );
};

export default FilterItem;
