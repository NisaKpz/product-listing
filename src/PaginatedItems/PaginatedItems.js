import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

import Product from "../Products/Product/Product";
import './PaginatedItems.css';

const Container = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;    
`;

function Items({ currentItems }) {
  return (
    <Container>
      {currentItems && currentItems.map((item) => <Product key={item.slug} id={item.slug} price={item.price} name={item.name} />)}
    </Container>
  );
}
const PaginatedItems = ({ itemsPerPage, items }) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const [selectedPage, setSelectedPage] = useState();

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const updatedCurrentItems = items.slice(itemOffset, endOffset);
    if (updatedCurrentItems.length === 0) {
      // If there is no item in page, set current page to 1
      setItemOffset(0);
      setSelectedPage(0);
    }
    setCurrentItems(updatedCurrentItems);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        breakClassName={"break-me"}
        previousLabel="< Prev"
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        renderOnZeroPageCount={null}
        forcePage={selectedPage}
      />
    </>
  );
}

export default PaginatedItems;