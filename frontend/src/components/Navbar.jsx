import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Text,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import { CiSearch } from "react-icons/ci";
import Search from "./Search";

const Navbar = () => {
  return (
    <Box
      width="100%"
      mb="1rem"
      bgColor="white"
      pos="fixed"
      zIndex={999}
      borderWidth={1}
      borderColor="gray.200"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginX={4}
        paddingY={2}
      >
        <Heading size="lg">ONLINE_SHOP</Heading>

        <Stack
          fontWeight={"semibold"}
          direction="row"
          gap="40px"
          verticalAlign="center"
          fontSize="17px"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
          <NavLink to="/about">About</NavLink>
        </Stack>
        <HStack width="25%" gap={6}>
          <Search />
          <Text>Cart</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
