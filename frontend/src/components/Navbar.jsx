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
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";

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
          <NavLink to="/login">Login</NavLink>
        </Stack>
        <HStack width="30%" gap={6}>
          <Search />
          <Text>Cart</Text>
          <Button variant="outline" _hover={{ bgColor: "brand.primaryLight" }}>
            Log Out
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
