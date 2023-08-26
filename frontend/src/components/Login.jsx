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
import { loginUser, reset } from "../store/UserSlice";
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

    setEmail("");
    setPassword("");
  };
  const { isAuthenticated, user, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    // if (user) {
    //   navigate("/");
    // }
    // dispatch(reset());
  }, [user, isError, errorMessage, navigate, dispatch]);
  return (
    <Flex minH={"100vh"} justify={"flex-end"}>
      <Stack spacing={8} py={12} px={16}>
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
