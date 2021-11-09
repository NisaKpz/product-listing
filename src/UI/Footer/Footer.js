import React from "react";
import { useSelector } from "react-redux";

import logo from "../../assets/Logo.svg";
import basket from "../../assets/basket.svg";
import Colors from "../../constants/Colors";
import styled from "styled-components";


const StyledFooter = styled.footer`
  color: ${Colors.primary};
  height: 100%;
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
`;

const Span = styled.span`
    margin: 0px 10px;
`;

const SpanDot = styled.span`
  height: 3px;
  width: 3px;
  background-color: ${Colors.primary};
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 2px;
`;



const Footer = () => {
  const totalPrice = useSelector((state) => state.basket.totalPrice);

  return (
    <StyledFooter>
      <Span>©2019 Market</Span>
      <SpanDot></SpanDot>
      <Span>Privacy Policy</Span>
    </StyledFooter>
  );
};

export default Footer;
