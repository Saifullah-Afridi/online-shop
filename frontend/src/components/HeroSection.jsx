import React from "react";
import { Button, Flex, Heading, Text, Box } from "@chakra-ui/react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { Link } from "react-router-dom";

import Hero from "../assets/hero.jpg";
const HeroSection = () => {
  return (
    <Flex
      paddingTop="6rem"
      justifyContent="center"
      alignItems="center"
      gap="2"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      w={{ base: "100%", lg: "90%" }}
      mx="auto"
    >
      <Box
        w={{
          base: "100%",
          lg: "50%",
        }}
      >
        <Heading
          as="h1"
          size={{
            base: "xl",
            lg: "3xl",
          }}
          lineHeight="4rem"
          color="brand.primary"
          marginY="20px"
        >
          Find Amazing Products Below
        </Heading>
        <Text
          fontSize={{
            base: "md",
            lg: "lg",
          }}
          paddingY="1rem"
          maxW="600px"
        >
          Find the amazing products below in cheap price and the quality of
          product is ten time better,Avaiable in different colors
        </Text>
        <Link to="/products">
          <Button
            rounded="full"
            minW="10rem"
            bgColor="brand.primary"
            color="white"
            _hover={{ bgColor: "brand.primaryDark" }}
          >
            Show Now
          </Button>
        </Link>
      </Box>
      <Box
        w={{
          base: "100%",
          lg: "50%",
        }}
      >
        <Box
          mx="2rem"
          w={{
            base: "300px",
            lg: "600px",
          }}
          h={{
            base: "300px",
            lg: "600px",
          }}
          bg="center/cover no-repeat url(mockup.svg)"
        ></Box>
      </Box>
    </Flex>
  );
};

export default HeroSection;
