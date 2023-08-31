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
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile, resetUpdatedUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { userr, isError, updatedUser, errorMessage, isLoading } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(userr?.name);
  const [email, setEmail] = useState(userr?.email);
  const [avatar, setAvatar] = useState("/Profile.png");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitHandler = (e) => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (updatedUser) {
      dispatch(resetUpdatedUser());

      navigate("/profile");
    }
  }, [dispatch, isError, userr, updatedUser]);

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
          <Heading fontSize={"4xl"}>Update Your Account</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="User Name">
              <FormLabel>User Name</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="userEmail">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id="avatar">
              <FormLabel>Upload avatar</FormLabel>
              <Input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={registerDataChange}
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
  );
};

export default UpdateProfile;
