import React from "react";
import { loadUser } from "../store/UserSlice";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

export const LoadUserr = () => {
  const dispatch = useDispatch();
  const { userr } = useSelector((state) => state.user);
  const onHandleClick = () => {
    dispatch(loadUser());
  };
  console.log(userr);
  return (
    <Button mt={"6rem"} mx="auto" value="outlince" onClick={onHandleClick}>
      Click me
    </Button>
  );
};

export default LoadUserr;
