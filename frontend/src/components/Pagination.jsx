import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../components/Product";
import axios from "axios";
import "./Pagination.css";
const Pagination = () => {
  const [data, SetData] = useState([]);
  const limit = 4;
  const [pageCount, setPageCount] = useState(0);
  const fetchData = async (currentPage) => {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/products?page=${currentPage}&limit=${limit}`
    );

    return data.products;
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const newData = await fetchData(currentPage);
    SetData(newData);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/products?page=1&&limit=${limit}`)
      .then((res) => {
        const totel = res.data.totelProducts;
        setPageCount(Math.ceil(totel / limit));
        SetData(res.data.products);
      });
  }, []);
  return (
    <>
      <div className="flex">
        {data.map((dat) => (
          <Product className="product" product={dat} key={dat._id} />
        ))}
      </div>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="***"
        pageCount={pageCount}
        marginPagesDisplayed={4} //pages before and after the break icons start and end
        pageRangeDisplayed={5} //pages number displayed after break icons
        onPageChange={handlePageClick} //take a function and in the function we take the selected button page number
        containerClassName="pagination" //the whole container name like div etc
        pageClassName="li"
        pageLinkClassName="links"
        previousClassName="page"
        previousLinkClassName="page-link"
        nextClassName="page"
        nextLinkClassName="page-link"
        breakClassName="links"
        activeClassName="active-pagintaion"
      />
    </>
  );
};

export default Pagination;
