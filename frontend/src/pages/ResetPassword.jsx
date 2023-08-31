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
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  resetUpdatedUser,
  resetPassword,
} from "../store/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setNewPassword] = useState("");
  const [passwordConfirm, setpasswordConfirms] = useState("");
  const { isError, updatedUser, errorMessage } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { token } = useParams();
  const onSubmitHandler = (e) => {
    const myForm = new FormData();
    myForm.append("password", password);
    myForm.append("passwordConfirm", passwordConfirm);

    dispatch(resetPassword({ token, myForm }));
  };
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (updatedUser) {
      navigate("/login");
    }
  }, [dispatch, isError, errorMessage, updatedUser]);
  return (
    <Card>
      <CardBody>
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
              <Heading fontSize={"4xl"}>Set New Password</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="password">
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setpasswordConfirms(e.target.value)}
                  />
                </FormControl>

                <Stack mt="1rem">
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={onSubmitHandler}
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ResetPassword;
