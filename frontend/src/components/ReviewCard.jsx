import { Card, Flex, Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-rating-stars-component";
import profile from "../assets/profile.jpg";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: " rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 16 : 18,
  };
  return (
    <Flex alignContent="center" gap="1rem">
      <Box w="150px">
        <Image src={profile}></Image>
      </Box>
      <Box w="200px">
        <Text>{review.name}</Text>
        <Text>{review.comment}</Text>
        <ReactStars {...options} />
      </Box>
    </Flex>
  );
};

export default ReviewCard;
