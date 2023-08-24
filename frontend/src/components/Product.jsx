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
  const options = {};
  return (
    <Link to={`/products/${product._id}`}>
      <Card borderWidth={2} align="center">
        <CardBody>
          {/* <Image src={product.image[0].url} width="170px" border={1} /> */}
          <Text fontSize="20px" fontWeight="semibold" paddingY={1}>
            {product.name}
          </Text>

          <HStack>
            <ReactStars
              edit={false}
              color=" rgba(20,20,20,0.1)"
              activeColor="tomato"
              value={product.ratings}
              isHalf={true}
              size-={window.innerWidth < 600 ? 16 : 18}
            />
            <Text fontSize="14px">({product.numberOfReviews} Reviews)</Text>
          </HStack>
          <Text>${product.price}</Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export default Product;
