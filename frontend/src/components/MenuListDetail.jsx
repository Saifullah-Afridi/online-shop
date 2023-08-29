import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FiArrowDown } from "react-icons/fi";
import { logout } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MenuListDetail = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleLogout = () => {
    dispatch(logout());
  };

  const onHandleOrders = () => {
    navigate("/orders");
  };

  const onHandleProfile = () => {
    navigate("/profile");
  };

  const onHandleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bgColor="white"
        _hover={{ bgColor: "white" }}
        rightIcon={<FiArrowDown />}
      >
        <Avatar size="md" src={user?.avatar?.url} name={user?.name} />
      </MenuButton>
      <MenuList>
        <MenuItem _hover={{ bgColor: "red.100" }} onClick={onHandleOrders}>
          Orders
        </MenuItem>
        <MenuItem _hover={{ bgColor: "red.100" }} onClick={onHandleProfile}>
          Profile
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem _hover={{ bgColor: "red.100" }} onClick={onHandleDashboard}>
            Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={onHandleLogout} _hover={{ bgColor: "red.100" }}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuListDetail;
