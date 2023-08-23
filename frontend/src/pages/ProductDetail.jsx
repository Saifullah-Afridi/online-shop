import {
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Divider,
  Box,
  Button,
  Stack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../store/productDetailSlice";
import ReactStars from "react-rating-stars-component";
import top2 from "../assets/top2.jpg";
import ProductQuantity from "../components/ProductQuantity";
import ReviewCard from "../components/ReviewCard";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.productDe);
  const options = {
    edit: false,
    color: " rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 16 : 18,
  };
  console.log(product);
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <Grid
        // templateAreas={`"column1  coulmn2"`}
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
        }}
        w={{ base: "100%", lg: "90%" }}
        gap="20px"
        pt="10rem"
        px="2rem"
      >
        <GridItem p="2rem">
          <Image src={top2} height="550px" mx="auto"></Image>
        </GridItem>
        <GridItem>
          <Heading size="lg">{product.name}</Heading>
          <Text my="1rem">
            {" "}
            {product.description}asdfafskaflsdsdlkjsflksldl asldfjladfj asdlflka
            asdfkl laskdjfa sdfkas skd fsdfk{" "}
          </Text>
          <Divider my="2rem" borderBottom="1px" />

          <HStack>
            <Text>Ratings:</Text>
            <ReactStars {...options} />
          </HStack>
          <Divider my="1rem" borderBottom="1px" />

          <Text fontSize="2rem">Price: ${product.price}</Text>
          <Divider my="2rem" borderBottom="1px" />
          <HStack>
            <ProductQuantity />
            <CustomButton text="Add to Cart" />
          </HStack>
          <Divider my="2rem" borderBottom="1px" />
          <Box>
            Status:{"    "}
            <Text
              color={product.stock < 1 ? "red" : "green.400"}
              display="inline"
            >
              {product.stock < 1 ? "Out of stock" : "Product is available"}
            </Text>
          </Box>
          <Divider my="2rem" borderBottom="1px" />
          <CustomButton text="Submit a Reivew" />
        </GridItem>
      </Grid>
      <Heading mt="3rem" size="lg" textAlign="center">
        Reviews
      </Heading>

      {product.reviews && product.reviews[0] ? (
        <SimpleGrid columns="3" my="3rem" mx="3rem">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard review={review}></ReviewCard>
            ))}
        </SimpleGrid>
      ) : (
        <Text my="3rem" fontSize="20px" color="red" textAlign="center">
          No review found for this product
        </Text>
      )}

      <Footer />
    </>
  );
};

export default ProductDetail;
