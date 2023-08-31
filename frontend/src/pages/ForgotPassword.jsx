import {
  Center,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Input,
  Text,
  Toast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { forgotPassword } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isError, errorMessage, isLoading, isAuthenticated, userr } =
    useSelector((state) => state.user);
  const onClickHandler = () => {
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (isAuthenticated) {
      toast.success("email send");
    }
  }, [dispatch, isError, errorMessage, isAuthenticated]);
  return (
    <Center pt="8rem">
      <VStack w="50%">
        <Text w="100%">
          Write Your Email and then Click on send email buttton..we will send
          you a reset token
        </Text>
        <FormControl w="100%">
          <FormLabel>Email address</FormLabel>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <Button
          my="2rem"
          w="100%"
          variant="solid"
          colorScheme="green"
          onClick={onClickHandler}
        >
          Send Email
        </Button>
      </VStack>
    </Center>
  );
};

export default ForgotPassword;
