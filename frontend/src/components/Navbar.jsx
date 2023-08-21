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
            />
          </InputGroup>
          <Text>Cart</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
