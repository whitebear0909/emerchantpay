import React from "react";
import {
  Dropdown,
  InputGroup,
  FormControl,
  Button,
  Row,
} from "react-bootstrap";

const AddFilter = (props) => {
  const {
    matchByList,
    filterText,
    matchedBy,
    setMatchedBy,
    setDisableInput,
    disableInput,
    setFilterText,
    handleApplyFilter,
  } = props;
  return (
    <Row className="p-1 rounded-1 border-secondary">
      <InputGroup>
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="info">{matchedBy}</Dropdown.Toggle>
          <Dropdown.Menu>
            {matchByList.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setMatchedBy(item.name);
                  setDisableInput(false);
                }}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <FormControl
          value={filterText}
          disabled={disableInput}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => handleApplyFilter()}
          disabled={disableInput}
        >
          apply
        </Button>
      </InputGroup>
    </Row>
  );
};

export default AddFilter;
