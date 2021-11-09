import React, { useCallback, useState } from "react";
import Card from "../UI/Card/Card";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import styled from "styled-components";

const Label = styled.label`
  line-height: 18px;
  vertical-align: center;
  letter-spacing: 0.16px;
  font-size: 14px;
  color: ${Colors.filter_text_color};
  font-weight: 400;
  vertical-align: super;
  margin: 0px;
   @media (max-width: 1036px) {
    font-size: 12px;
  }
`;

const Item = styled.div`
  margin-bottom: 16px;
`;

const RadioInput = styled.input`
  width: 22px;
  height: 22px;
  margin: 0px;
   @media (max-width: 1024px) {
    width: 20px;
    height: 20px;
  }
`;

const Sort = (props) => {
    const [sort, setSort] = useState("priceAscending");
    const {onSortChange} = props;
    const onSortChangeHandler = useCallback(
      (event) => {
        setSort(event.target.id);
        onSortChange(event.target.id);
      },
      [onSortChange]
    ); 

    return (
      <Card label="Sorting">
        <Item>
          <RadioInput
            type="radio"
            id="priceAscending"
            name="priceAscending"
            value="priceAscending"
            checked={sort === "priceAscending"}
            onChange={onSortChangeHandler}
          />
            <Label htmlFor="priceAscending">Price low to high</Label>
        </Item>
        <Item>
          <RadioInput
            type="radio"
            id="priceDescending"
            name="priceDescending"
            value="priceDescending"
            checked={sort === "priceDescending"}
            onChange={onSortChangeHandler}
          />
            <Label htmlFor="priceDescending">Price high to low</Label>
        </Item>
        <Item>
          <RadioInput
            type="radio"
            id="timeDescending"
            name="timeDescending"
            value="timeDescending"
            checked={sort === "timeDescending"}
            onChange={onSortChangeHandler}
          />
            <Label htmlFor="timeDescending">New to old</Label>
        </Item>
        <Item>
          <RadioInput
            type="radio"
            id="timeAscending"
            name="timeAscending"
            value="timeAscending"
            checked={sort === "timeAscending"}
            onChange={onSortChangeHandler}
          />
            <Label htmlFor="timeAscending">Old to new</Label>
        </Item>
      </Card>
    );
};

Sort.defaultProps = {
  onSortChange: PropTypes.func
};


export default Sort;