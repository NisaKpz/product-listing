import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { basketActions } from "../../store/basket-slice";

const ProductCard = styled.div`
  width: 25%;
  height: 16vw;
  position: relative;
  padding: 0 14px;
  margin-bottom: 20px;
  @media (max-width: 1440px) {
    width: 33%;
    height: 19vw;
  }

  @media (max-width: 1090px) {
    width: 50%;
    height: 23vw;
  }
   @media (max-width: 880px) {
    height: 26vw;
  }

  @media (max-width: 768px) {
    width: 33%;
    height: 31vw;
  }

  @media (max-width: 768px) {
    width: 50%;
    height: 37vw;
  }
 @media (max-width: 570px) {
     width: 100%;
    height: 43vw;
  }

  @media (max-width: 425px) {
    height: 52vw;
  }
}
`;
const ProductBG = styled.div`
    border: 1.18px solid ${Colors.border_color};
    border-radius: 12px;
    width:100%;
    padding: 15px;
    height: 124px;
`;

const ProductImage = styled.div`
  background: ${Colors.dark_gray};
  width: 100%;
  height:100%
`;
const Price = styled.div`
  color: ${Colors.primary};
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  vertical-align: top;
  font-weight: 700;
  width:100%;
`;

const Name = styled.span`
  color: #191919;
  font-size: 14px;
  line-height: 20px;
  display: block;

`;

const Button = styled.button`
  background-color: ${Colors.primary};
  line-height: 20px;
  color: white;
  font-size: 12px;
  position: absolute;
  width: 84%;
  border: 0px;
  cursor: pointer;
  border-radius: 2px;
  bottom: 0px;
  left: 13px;
  @media (max-width: 570px) {
    width: 95%;
  }
`;


const Product = (props) => {
  const { name, id, price} = props;
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(basketActions.addItemToBasket({
      id,
      price,
      name
    }));
  }
    return (
      <ProductCard>
        <ProductBG>
          <ProductImage></ProductImage>
        </ProductBG>
        <Price>$ {props.price}</Price>
        <Name>{props.name}</Name>
        <Button onClick={addItemHandler} type="button">Add</Button>
      </ProductCard>
    );
};

Product.defaultProps = {
  name: PropTypes.string,
  id: PropTypes.string,
  price: PropTypes.number,
};


export default Product;