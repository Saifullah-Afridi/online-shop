import {
  Flex,
  Text,
  Image,
  Stack,
  Heading,
  List,
  ListItem,
  Link,
} from "@chakra-ui/react";
import React from "react";
import playstore from "../assets/playstore.png";
import Appstore from "../assets/Appstore.png";

const Footer = () => {
  return (
    <Flex
      justifyContent="space-around"
      marginTop="10px"
      bgColor="blackAlpha.800"
      color="gray.100"
      padding="60px"
    >
      <Stack align="center" gap="20px">
        <Text size="lg">Download Our App</Text>
        <Text size="lg">Download App for Andriod and IOS mobiles</Text>
        <Image src={playstore} width="150px"></Image>
        <Image src={Appstore} width="150px"></Image>
      </Stack>
      <Stack align="center" gap="20px">
        <Heading size="xl" letterSpacing="3px" color="red.200">
          ECOMERECE
        </Heading>
        <Text>High quality is our first priority</Text>
        <Text>copy rights {new Date(Date.now()).getFullYear()}@Saifullah</Text>
      </Stack>
      <Stack>
        <Text>Navigation</Text>
        <List>
          <ListItem>
            <Link> Home</Link>
          </ListItem>
          <ListItem>
            <Link> Products</Link>
          </ListItem>
          <ListItem>
            <Link> Contacts</Link>
          </ListItem>
          <ListItem>
            <Link> About Us</Link>
          </ListItem>
        </List>
      </Stack>
    </Flex>
  );
};

export default Footer;
