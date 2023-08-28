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
import React, { useEffect } from "react";
import Search from "./Search";
import { loadUser } from "../store/UserSlice";
import MenuListDetail from "./MenuListDetail";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const { userr } = useSelector((state) => state.user);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch, userr]);
  // console.log(userr);
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
          {userr ? (
            // <Button
            //   variant="outline"
            //   colorScheme="red"
            //   _hover={{ bgColor: "brand.primaryLight" }}
            //   fontSize="17px"
            //   onClick={() => {
            //     dispatch(logout());
            //   }}
            // >
            //   Log Out
            // </Button>

            <MenuListDetail user={userr} />
          ) : (
            <NavLink fontSize="17px" to="/login">
              <Button
                variant="outline"
                colorScheme="red"
                _hover={{ bgColor: "brand.primaryLight" }}
                fontSize="17px"
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
