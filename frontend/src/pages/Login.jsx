import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = () => {
    const userCrendential = { email, password };
    dispatch(loginUser(userCrendential));
  };
  const { isAuthenticated, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, isError, errorMessage]);
  return (
    <Flex minH={"100vh"} justify={"flex-end"} pt="8rem">
      <Stack
        spacing={8}
        w={{
          base: "90%",
          lg: "50%",
        }}
        mx="auto"
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="userEmail">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="savedPassword">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <Link to="/forgotpassword">
              <Text align="end">Forgot Password</Text>
            </Link>
            <Stack mt="1rem">
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onSubmitHandler}
              >
                Login
              </Button>
              {isError && (
                <Text color="red" pt={2}>
                  {errorMessage}
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
