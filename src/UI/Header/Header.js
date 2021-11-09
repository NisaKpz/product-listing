import React from "react";
import { useSelector } from "react-redux";

import logo from "../../assets/Logo.svg";
import basket from "../../assets/basket.svg";
import Colors from "../../constants/Colors";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: ${Colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4.5rem;
  align-items: center;
  z-index: 1;
`;


const Basket = styled.div`
  background-color: ${Colors.accent};
  height: 100%;
  width: 9%;
  position: absolute;
  right: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 425px) {
    width: 12%;
    right: 40px;
  }
    @media (max-width: 320px) {
    width: 16%;
    right: 26px;
  }
`;

const Logo = styled.img`
  height: 40px;
  width: 141px;
  @media (max-width: 320px) {
    height: 30px;
  }
`;

const BasketImg = styled.img`
  height: 24px;
  width: 24px;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 426px) {
    width: 17px;
    height: 17px;
  }


`;

const BasketText = styled.span`
  color: white;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.16px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 426px) {
    font-size: 10px;
  }
`;

const Header = () => {

  const totalPrice = useSelector((state) => state.basket.totalPrice);

    return (
      <StyledHeader>
        <Logo src={logo} alt="logo" />
        <Basket>
          <BasketImg src={basket} />
          <BasketText>₺{totalPrice.toFixed(2)}</BasketText>
        </Basket>
      </StyledHeader>
    );

};

export default Header;