import { useSelector, useDispatch } from "react-redux";
import { saveShipingInfo } from "../store/CartSlice";

import { getNames, getNameList, getCode, getData } from "country-list";
import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";

const shiping = () => {
  const dispatch = useDispatch();
  const { shipingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shipingInfo.address);
  const [city, setCity] = useState(shipingInfo.city);
  const [state, setState] = useState(shipingInfo.state);
  const [country, setCountry] = useState(shipingInfo.country);
  const [pincode, setPinCode] = useState(shipingInfo.pincode);
  const [phoneNumber, setPhoneNumber] = useState(shipingInfo.phoneNumber);

  return (
    <Box>
      <Heading as="h1" size="lg" textAlign="center">
        Shiping Details
      </Heading>
    </Box>
  );
};

export default shiping;
