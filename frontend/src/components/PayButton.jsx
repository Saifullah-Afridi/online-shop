import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PayButton = ({ cartItems }) => {
  const navigate = useNavigate();
  const { userr } = useSelector((state) => state.user);
  const onHandleCheckout = () => {
    console.log(cartItems);
    axios
      .post(
        "http://localhost:3001/api/v1/stripe/create-checkout-session",
        {
          cartItems,
          userId: userr.id,
        },
        {
          headers: {
            Authorization:
              "Bearer sk_test_51Np9SQKqyyYiNaNIGtRRqhy5yjxX11ApoSHs8UPKm15OwMCBVwgsAUaYeN6u2p3yHJmgpRWSfNC4RCnLHt8k3p1L00cbKrX2yP",
          },
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(er.message));
  };
  return (
    <Button bgColor="brand.primaryDark" onClick={() => onHandleCheckout()}>
      Order Now /Check Out
    </Button>
  );
};
export default PayButton;
