import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";
import PaginatedItems from "../PaginatedItems/PaginatedItems";

const Header = styled.h4`
  color: ${Colors.label_color};
  font-size: 20px;
  line-height: 26px;
  text-align: left;
  letter-spacing: 0.25px;
  font-weight: 400;
`;



const TypesContainer = styled.div`
    height: 2rem;
    width: 100%;

`;

const TypeItem = styled.div`
  background-color: ${(props) =>
    props.isActive ? Colors.primary : Colors.gray};
  width: 3rem;
  height: 2rem;
  border-radius: 2px;
  padding: 6px;
  color: ${(props) => (props.isActive ? Colors.gray : Colors.primary)};
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  margin-right: 15px;
`;

const ProductsContainer = styled.div`
  background-color: white;
  margin-top: 16px;
  padding: 20px;
`;


const Products = (props) => {
    const [selectedType, setSelectedType] = useState('mug');
    const onChangeType = useCallback((type) => {
        setSelectedType(type);
    },[]);

    return (
      <>
        <Header>Products</Header>
        <TypesContainer>
          <TypeItem
            isActive={selectedType && selectedType === "mug"}
            onClick={() => onChangeType("mug")}
          >
            mug
          </TypeItem>

          <TypeItem
            isActive={selectedType && selectedType === "shirt"}
            onClick={() => onChangeType("shirt")}
          >
            shirt
          </TypeItem>
        </TypesContainer>
        <ProductsContainer>
          <PaginatedItems
            itemsPerPage={16}
            items={props.items.filter(
              (item) => {
                  if(props.allFilters.length > 0) {
                    return (
                      (props.allFilters.indexOf(item.manufacturer) > -1 ||
                        props.allFilters.some(
                          (filter) =>
                            item.tags.findIndex((tag) => tag === filter) >=
                            0
                        )) &&
                      item.itemType === selectedType
                    );
                  } else {
                      return  item.itemType === selectedType
                  }
              })}
               
          />
        </ProductsContainer>
      </>
    );
}

Products.defaultProps = {
  items: PropTypes.array,
  allFilters: PropTypes.string
};


export default Products;