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
import { updatePassword, resetUpdatedUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordConfirm, setpasswordConfirms] = useState("");
  const { isError, updatedUser, errorMessage } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    const myForm = new FormData();
    myForm.append("oldPassword", oldPassword);
    myForm.append("password", password);
    myForm.append("passwordConfirm", passwordConfirm);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (updatedUser) {
      dispatch(resetUpdatedUser());
      navigate("/profile");
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
              <Heading fontSize={"4xl"}>Change Password</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="OldPassword">
                  <FormLabel>Old Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </FormControl>
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

export default ChangePassword;
