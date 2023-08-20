import {
  Box,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <Box width="100%" borderBottomWidth="2px" paddingY={1} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center" marginX={4}>
        <Heading size="lg">ONLINE_SHOP</Heading>

        <Stack
          fontWeight={"semibold"}
          direction="row"
          gap="40px"
          verticalAlign="center"
          fontSize="17px"
        >
          <Link>Home</Link>
          <Link>Products</Link>
          <Link>Contact us</Link>
          <Link>About</Link>
        </Stack>
        <InputGroup width=" 25%">
          <InputLeftElement pointerEvents="none">
            <CiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            borderWidth="1px"
            borderRadius="4px"
            borderColor="gray.500"
          />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default Navbar;
