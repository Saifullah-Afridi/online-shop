import React, { useEffect } from "react";
import { loadUser } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

const Account = () => {
  const dispatch = useDispatch();
  const { userr, isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex
          flexDirection={{
            base: "column",
            lg: "row",
          }}
          pt="8rem"
          w={{ base: "100%", lg: "90%" }}
          mx="auto"
          gap="30px"
        >
          <Box
            w={{
              base: "100%",
              lg: "50%",
            }}
          >
            <Image src={userr.avatar.url} boxSize="400px"></Image>
            <Button bgColor="brand.primary" mt={6} w="60%" size="lg">
              Edit Profile
            </Button>
          </Box>
          <Box
            pt="5rem"
            w={{
              base: "100%",
              lg: "50%",
            }}
          >
            <Heading mb={4}>My Profile</Heading>
            <HStack>
              <Text fontWeight="semibold">Full Name :</Text>
              <Text>{userr.name}</Text>
            </HStack>
            <HStack mt={6}>
              <Text fontWeight="semibold">Email :</Text>
              <Text>{userr.email}</Text>
            </HStack>
            <HStack mt={6}>
              <Text fontWeight="semibold">Joined on :</Text>
              <Text>{String(userr?.createdAt).substr(0, 10)}</Text>
            </HStack>
            <Stack mt="4rem">
              <Link to="/me/orders">
                <Button
                  w="100%"
                  my={2}
                  bgColor="brand.primary"
                  _hover={{ bgColor: "brand.primaryLight" }}
                >
                  My Orders
                </Button>
              </Link>
              <Link>
                <Button
                  w="100%"
                  my={2}
                  bgColor="brand.primary"
                  _hover={{ bgColor: "brand.primaryLight" }}
                >
                  Change Password
                </Button>
              </Link>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Account;
