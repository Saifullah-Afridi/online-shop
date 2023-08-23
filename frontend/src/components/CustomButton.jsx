import { Button } from "@chakra-ui/react";
import React from "react";

const CustomButton = (props) => {
  return (
    <Button
      rounded="full"
      color="white"
      w="9rem"
      p="20px"
      bg="brand.primary"
      _hover={{ bg: "brand.primaryDark" }}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
