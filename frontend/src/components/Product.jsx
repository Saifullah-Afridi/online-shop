import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const options = {
    edit: false,
    color: " rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 600 ? 16 : 18,
  };
  return (
    <Card borderWidth={2} align="center">
      <CardBody>
        <Link to={product._id}>
          <Image src={product.image} width="170px" border={1} />
          <Text fontSize="20px" fontWeight="semibold" paddingY={1}>
            {product.name}
          </Text>

          <HStack>
            <ReactStars {...options} />
            <Text fontSize="14px">(256 Reviews)</Text>
          </HStack>
          <Text>${product.price}</Text>
        </Link>
      </CardBody>
    </Card>
  );
};

export default Product;
