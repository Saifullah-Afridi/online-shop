import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const Resgister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

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
  const onSubmitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);
    myForm.append("password", password);
    myForm.append("passwordConfirm", passwordConfirm);
    dispatch(registerUser(myForm));
  };

  useEffect(() => {
    if (user || isAuthenticated) {
      navigate("/");
    }
  }, [user]);
  return (
    <Flex minH={"100vh"}>
      <Stack spacing={8} py={12} px={10}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <FormControl id="passwordConfirm">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
              />
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
                Register/Signup
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Resgister;
