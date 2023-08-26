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
import { logout, reset } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
          <NavLink to="/about">About</NavLink>
        </Stack>
        <HStack width="30%" gap={6} mr="1rem">
          <Search />
          <Text>Cart</Text>
          {user ? (
            <Button
              variant="outline"
              colorScheme="red"
              _hover={{ bgColor: "brand.primaryLight" }}
              fontSize="17px"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log Out
            </Button>
          ) : (
            <NavLink fontSize="17px" to="/login">
              <Button
                variant="outline"
                colorScheme="red"
                _hover={{ bgColor: "brand.primaryLight" }}
                fontSize="17px"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Log In
              </Button>
            </NavLink>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
