import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/searchproducts/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <InputGroup width=" 100%">
      <InputLeftElement pointerEvents="none">
        <CiSearch />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search"
        borderWidth="1px"
        borderRadius="4px"
        borderColor="gray.400"
        focusBorderColor="brand.primary"
        onChange={(e) => setkeyword(e.target.value)}
        value={keyword}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          _hover={{ bgColor: "brand.primary" }}
          type="submit"
          onClick={(e) => searchSubmitHandler(e)}
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default Search;
