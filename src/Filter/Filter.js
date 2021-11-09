import React, {useEffect, useState, useCallback} from "react";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import styled from "styled-components";
import Card from "../UI/Card/Card";

const SearchInput = styled.input`
  border-style: none;
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;

const SearchInputContainer = styled.div`
  top: 1rem;
  border-radius: 2px;
  border: 2px solid ${Colors.light_gray};
  margin: 0 auto;
  height: 48px;
  width: 85%;
  @media (max-width: 1024px) {
    height: 38px;
  }
`;

const FilterList = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow-y: scroll;
  height: 214px;
  padding-left: 7px;
  padding-top: 6px;
`;

const Checkbox = styled.input`
  box-shadow: 0px 1px 7px rgb(93 56 192 / 40%);
  width: 22px;
  height: 22px;
  margin: 0px;
  box-sizing: border-box;
  outline: 1px solid white;
  input[type="checkbox"] {
    outline: 1px solid white;
  }
  input[type="checkbox"]:before {
    position: relative;
    display: block;
    width: 11px;
    height: 11px;
    border: 1px solid #808080;
    content: "";
    background: #fff;
  }

  @media (max-width: 1024px) {
    width: 18px;
    height: 18px;
  }
`;


const FilterElement = styled.div`
    position:relative
`;


const CheckboxLabel = styled.label`
  line-height: 18px;
  vertical-align: center;
  letter-spacing: 0.16px;
  font-size: 14px;
  color: ${Colors.filter_text_color};
  font-weight: 400;
  position: relative;
  bottom: 4px;
  padding-left: 10px;
  @media (max-width: 1090px) {
    font-size: 13px;
  }
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;


let selectedFilters = [];

const Filter = (props) => {

  const [allDisplayedFilters, setFilters] = useState(props.filters);

  const { filters, filterChanged } = props;
  useEffect(() => {
    setFilters([...filters])
  }, [filters]);

  const checkboxChangeHandler = useCallback(
      (event) => {
        if (event.target.checked) {
          selectedFilters.push(event.target.id);
        } else {
          if (selectedFilters.indexOf(event.target.id) !== -1) {
            selectedFilters = selectedFilters.filter((filter) => {
              return filter !== event.target.id;
            });
          }
        }
        filterChanged(selectedFilters);
      },
      [filterChanged]
    );


    const onSearchInputChangeHandler = useCallback(
      (event) => {
        const value = event.target.value;
        if (value.length >= 1) {
          setFilters([
            ...filters.filter(
              (filter) => filter.name.toLocaleLowerCase().indexOf(value) >= 0
            ),
          ]);
        } else {
          //Empty search
          setFilters([...filters]);
        }
      },
      [filters]
    );


  return (
    <Card label={props.label}>
      <SearchInputContainer>
        <SearchInput
          placeholder={`Search ${props.label}`}
          onChange={onSearchInputChangeHandler}
        />
      </SearchInputContainer>
      <FilterList>
        {allDisplayedFilters.map((filter) => (
          <FilterElement key={filter.slug}>
            <Checkbox
              id={filter.slug}
              type="checkbox"
              onChange={checkboxChangeHandler}
            />
            <CheckboxLabel htmlFor={filter.slug}>{filter.name}</CheckboxLabel>
          </FilterElement>
        ))}
      </FilterList>
    </Card>
  );
};

Filter.defaultProps = {
  filters: PropTypes.array,
  label: PropTypes.string,
  filterChanged: PropTypes.func
};


export default Filter;
