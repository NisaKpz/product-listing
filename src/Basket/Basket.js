import React, { useCallback } from 'react';
import styled from "styled-components";

import Colors from './../constants/Colors';
import signPlus from "../assets/SignPlus.svg";
import signMinus from "../assets/SignMinus.svg";
import { useSelector, useDispatch } from "react-redux";
import { basketActions } from '../store/basket-slice';


const Container = styled.div`
  width: 15rem;
  background-color: white;
  padding: 1rem;
  overflow: hidden;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};

  @media (max-width: 880px) {
    width 12rem;
  }
`;

const Item = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 6px;

  &:after {
    content: " ";
    border: 1px solid ${Colors.border_gray};
    position: absolute;
    width: 85%;
    left: 10px;
    bottom: -6px;
  }
`;

const Product = styled.div`
  display: inline-block;
  width: 50%;
`;

const Title = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height:18px;
  letter-spacing: 0.16px;
  color: ${Colors.black};
  
`;
const Price = styled(Title)`
  font-weight: 600;
  color: ${Colors.primary};
`;

const TotalPrice = styled(Price)`
  font-weight: 600;
  line-height: 16px;
  @media (max-width: 768px) {
    line-height: 3px;
  }
`;

const ButtonContainer = styled.div`
  display: inline-block;
`;

const TotalPriceBox = styled.div`
  border-radius: 2px;
  border: 1px solid ${Colors.primary};
  padding: 0px 8px;
  display: inline-block;
  margin-top: 16px;
  float: right;
`;

const Button = styled.img`
width: 10px;
height:10px;
cursor:pointer;
`

const Count = styled.span`
  background-color: ${Colors.primary};
  padding: 0.3rem 0.6rem;
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 0px 11px;
`;


const Basket = () => {
    const basketItems = useSelector(state => state.basket);
    const dispatch = useDispatch();

    const onRemoveItem = useCallback(
      (id) => {
        dispatch(basketActions.removeItemFromBasket(id));
      },
      [dispatch]
    );

    const onAddItem = useCallback(
      (item) => {
        dispatch(
          basketActions.addItemToBasket({
            id: item.id,
            price: item.price,
            name: item.name,
          })
        );
      },
      [dispatch]
    );

    return (
      <>
        <Container isVisible={basketItems && basketItems.items.length > 0}>
          {basketItems.items.map((item) => (
            <Item key={item.id}>
              <Product>
                <Title>{item.name}</Title>
                <Price>${item.totalPrice.toFixed(2)}</Price>
              </Product>
              <ButtonContainer>
                <Button
                  src={signMinus}
                  onClick={() => onRemoveItem(item.id)}
                ></Button>
                <Count>{item.quantity}</Count>
                <Button src={signPlus} onClick={() => onAddItem(item)}></Button>
              </ButtonContainer>
            </Item>
          ))}
          <TotalPriceBox>
            <TotalPrice>${basketItems.totalPrice.toFixed(2)}</TotalPrice>
          </TotalPriceBox>
        </Container>
      </>
    );
};

export default Basket;