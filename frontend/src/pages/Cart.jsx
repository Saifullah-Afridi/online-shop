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
import { addToCart, removeCartItem } from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (product, quantity, stock) => {
    if (stock <= quantity) return;
    quantity = quantity + 1;
    const newProduct = { ...product, quantity };
    dispatch(addToCart(newProduct));
  };
  const decreaseQuantity = (product, quantity) => {
    if (quantity <= 1) return;
    quantity = quantity - 1;
    const newProduct = { ...product, quantity };
    dispatch(addToCart(newProduct));
  };

  const onHandleDelete = (id) => {
    dispatch(removeCartItem(id));
  };
  const onCheckHandler = () => {};
  return (
    <>
      {cartItems.length === 0 ? (
        <Heading textAlign="center" color="red" pt="4rem">
          No item found in cart
        </Heading>
      ) : (
        <Box>
          <Box>
            <Flex justify="space-between" px="4rem" pt="1.5rem">
              <Heading size="md">Product</Heading>
              <Heading size="md">Quantity</Heading>
              <Heading size="md">Price</Heading>
              <Heading size="md">Remove</Heading>
            </Flex>
            {cartItems.map((item) => (
              <Flex
                key={item._id}
                justify="space-between"
                px="4rem"
                py="1.5rem"
              >
                <Box display="flex" gap={3}>
                  <Image src={shoe} width="100px"></Image>

                  <VStack gap="5px" alignSelf="center">
                    <Text fontWeight="medium">{`Product: ${item.name}`}</Text>
                    <Text fontWeight="medium">{`Price:$${item.price}`}</Text>
                    <Text fontWeight="medium">{`Quantity:${item.quantity}`}</Text>
                  </VStack>
                </Box>
                <HStack>
                  <Button onClick={() => decreaseQuantity(item, item.quantity)}>
                    -
                  </Button>
                  <Input
                    type="number"
                    w="60px"
                    value={item.quantity}
                    readOnly
                  />
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
                <Button
                  bgColor="brand.primary"
                  onClick={() => onHandleDelete(item.id)}
                >
                  Remove
                </Button>
              </Flex>
            ))}
          </Box>

          <HStack
            px="6rem"
            justify="flex-end"
            borderTop="1px"
            py={5}
            gap="4rem"
          >
            <Text fontWeight={"semibold"}>Totel Price</Text>
            <Text fontWeight={"semibold"}>
              {cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}
            </Text>
            <Button bgColor="brand.primaryDark" onClick={onCheckHandler}>
              Order Now /Check Out
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default Cart;
