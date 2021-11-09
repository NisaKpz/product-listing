import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";


const Container = styled.div`
  // width: 296px
  height: 274px;
`;

const Box = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0px 6px 24px rgba(93, 62, 188, 0.04);
  border-radius: 2px;
  padding: 2rem;
  position: relative;
  border-radius: 2px;
  top: 10px;
  overflow: hidden;
  max-height: 80%;
  @media (max-width: 1440px) {
    width: 90%;
    padding: 1rem;
  }
  @media (max-width: 1024px) {
    width: 80%;
    padding: 1rem;
  }
`;

const Label = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: ${Colors.text_color};
`;

const Card = (props) => {
    return (
      <Container>
        <Label>{props.label}</Label>
        <Box>
          {props.children} 
        </Box>
      </Container>
    );
};

Card.defaultProps = {
  label: PropTypes.string
};


export default Card;