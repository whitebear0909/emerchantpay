import React from "react";
import { Dropdown } from "react-bootstrap";

const SelectFilter = (props) => {
  const { filterNameList, filterName, setVisibleNewFilterArea, setFilterName } =
    props;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">{filterName}</Dropdown.Toggle>
      <Dropdown.Menu>
        {filterNameList.map((item, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => {
              setVisibleNewFilterArea(true);
              setFilterName(item.name);
            }}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectFilter;
