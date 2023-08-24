import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Product from "../components/Product";
import axios from "axios";
import { Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const SearchProducts = () => {
  const { keyword } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/products?name=${keyword}`)
      .then((res) => {
        setIsLoading(false);
        console.log(keyword);

        setData(res.data.products);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [keyword]);

  return (
    <>
      <Navbar />
      {isLoading && <Spinner />}
      <SimpleGrid columns={3} gap="20px" width="70%" mx="auto" pt="10rem">
        {" "}
        {data &&
          data.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </SimpleGrid>
      {data.length === 0 && (
        <Heading textAlign="center" size="lg" pt="2rem" color="red">
          There is no such product
        </Heading>
      )}
    </>
  );
};

export default SearchProducts;
