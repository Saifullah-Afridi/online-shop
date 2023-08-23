import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import React from "react";

const ProductQuantity = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 5,
      disabled: false,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...inc}>+</Button>
      <Input width="70px" {...input} />
      <Button {...dec}>-</Button>
    </HStack>
  );
};
export default ProductQuantity;
