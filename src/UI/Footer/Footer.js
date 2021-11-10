import React from "react";

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
  return (
    <StyledFooter>
      <Span>©2019 Market</Span>
      <SpanDot></SpanDot>
      <Span>Privacy Policy</Span>
    </StyledFooter>
  );
};

export default Footer;
