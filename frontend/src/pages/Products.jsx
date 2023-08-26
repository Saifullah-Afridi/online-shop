import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import "../components/Pagination.css";
import { List, ListItem } from "@chakra-ui/react";

import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Products = () => {
  const [active, setActive] = useState(false);
  const [category, setCategory] = useState();
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Samrtphones",
  ];
  const [data, SetData] = useState([]);
  const limit = 6;
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
  const fetchDataOnCategory = (category) => {
    axios
      .get("http://localhost:3001/api/v1/products", {
        params: {
          category,
        },
      })
      .then((res) => {
        SetData(res.data.products);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/api/v1/products?page=1&&limit=${limit}`)
      .then((res) => {
        setIsLoading(false);
        const totel = res.data.totelProducts;
        setPageCount(Math.ceil(totel / limit));
        SetData(res.data.products);
      });
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      {isLoading && <Spinner />}
      {data && (
        <Grid
          templateColumns={"200px 1fr"}
          py="6rem"
          gap="10"
          w="95%"
          mx="auto"
        >
          <GridItem>
            <List fontSize="18px">
              {categories.map((category) => (
                <ListItem
                  mb="10px"
                  borderBottom="1px"
                  borderBottomColor="gray.200"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                    fetchDataOnCategory(category);
                    setActive(true);
                  }}
                  _hover={{ bgColor: "brand.primaryLight" }}
                >
                  {category}
                </ListItem>
              ))}
            </List>
          </GridItem>
          <Grid templateColumns={"1fr 1fr 1fr"} gap={6}>
            {data.map((product) => (
              <GridItem key={product._id}>
                <Product product={product}></Product>
              </GridItem>
            ))}
          </Grid>
        </Grid>
      )}

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
      <Footer />
    </React.Fragment>
  );
};

export default Products;
