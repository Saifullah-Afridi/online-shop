import React from "react";
import shoe from "../assets/3.jpg";
import {
  Box,
  Flex,
  Image,
  VStack,
  Heading,
  Text,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { addToCart } from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (product, quantity, stock) => {
    console.log(product, quantity, stock);
    if (stock <= quantity) return;
    quantity = quantity + 1;
    const newProduct = { ...product, quantity };
    dispatch(addToCart(newProduct));
  };

  return (
    <Box>
      {cartItems && (
        <Box>
          <Flex justify="space-between" px="4rem" pt="1.5rem">
            <Heading size="md">Product</Heading>
            <Heading size="md">Quantity</Heading>
            <Heading size="md">Price</Heading>
          </Flex>
          {cartItems.map((item) => (
            <Flex key={item._id} justify="space-between" px="4rem" py="1.5rem">
              <Box display="flex" gap={3}>
                <Image src={shoe} width="100px"></Image>

                <VStack gap="5px" alignSelf="center">
                  <Text fontWeight="medium">{`Product: ${item.name}`}</Text>
                  <Text fontWeight="medium">{`Price:$${item.price}`}</Text>
                  <Text fontWeight="medium">{`Quantity:${item.quantity}`}</Text>
                </VStack>
              </Box>
              <HStack>
                <Button>-</Button>
                <Input type="number" w="60px" value={item.quantity} readOnly />
                <Button
                  onClick={() =>
                    increaseQuantity(item, item.quantity, item.stock)
                  }
                >
                  +
                </Button>
              </HStack>
              <Box>
                <Text>{item.price * item.quantity}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      )}
      <HStack>
        <Text>Totel Price</Text>
        <Text></Text>
        <Text>Order Now /Check Out</Text>
      </HStack>
    </Box>
  );
};

export default Cart;
