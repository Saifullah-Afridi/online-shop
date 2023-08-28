import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FiArrowDown } from "react-icons/fi";
import { logout } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const MenuListDetail = ({ user }) => {
  const dispatch = useDispatch();
  const onHandleLogout = () => {
    dispatch(logout());
  };
  console.log(user);
  return (
    <Menu>
      <MenuButton
        as={Button}
        bgColor="white"
        _hover={{ bgColor: "white" }}
        rightIcon={<FiArrowDown />}
      >
        <Avatar size="md" src={user.avatar.url} name={user.name} />
      </MenuButton>
      <MenuList>
        <MenuItem _hover={{ bgColor: "red.100" }}>Orders</MenuItem>
        <MenuItem _hover={{ bgColor: "red.100" }}>Profile</MenuItem>
        {user.role === "admin" && (
          <MenuItem _hover={{ bgColor: "red.100" }}>Dashboard</MenuItem>
        )}
        <MenuItem onClick={onHandleLogout} _hover={{ bgColor: "red.100" }}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuListDetail;
