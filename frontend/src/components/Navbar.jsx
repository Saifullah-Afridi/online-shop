import {
  Flex,
  Heading,
  Stack,
  HStack,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";

import { useSelector } from "react-redux";
const Navbar = () => {
  const { userr, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Flex
      width="100%"
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
        <Link to="/cart">
          <Text bgColor="green.300" px={5} py={2} rounded="full">
            Cart
          </Text>
        </Link>
        {!isAuthenticated && (
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
  );
};

export default Navbar;
