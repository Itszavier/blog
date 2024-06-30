/** @format */

import { NavLink, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import google from "../../../assets/google.png";
import { create } from "lodash";
import { useAuth } from "../../../context/auth";
import { Avatar, Box, Text, Button, Flex, VStack } from "@chakra-ui/react";

export default function SideNav() {
  const Navigate = useNavigate();
  const auth = useAuth();
  return (
    <Box
      w={"240px"}
      top={0}
      left={0}
      pt={"10px"}
      pb={"10px"}
      pl={"20px"}
      pr={"20px"}
      position={"fixed"}
      height={"100%"}
      zIndex={99}
      boxShadow={"md"}
    >
      <Flex gap={2} mt={2}>
        <Avatar
          borderRadius={"8px"}
          mr={2}
          name={auth.user?.name}
          src={auth.user?.profileImage.url}
        />

        <Box flexDirection={"column"}>
          <Text p={0} m={0}>
            {auth.user?.name}
          </Text>
          <Text color={'light.secondaryColor'} fontSize={"13px"} p={0} m={0}>
            Web developer
          </Text>
        </Box>
      </Flex>
      <div className={style.list_container}>
        <ul className={style.navlist}>
          <li className={style.navlist_item}>
            <NavLink to="/dashboard" className={style.navlink}>
              <i className="bx bxs-dashboard"></i>
              <span className="">Dashboard</span>
            </NavLink>{" "}
          </li>{" "}
          <li className={style.navlist_item}>
            <NavLink to="#" className={style.navlink}>
              <i className="bx bxs-bar-chart-alt-2"></i>
              <span className="">Analytics</span>
            </NavLink>
          </li>
          <li className={style.navlist_item}>
            <NavLink to="/dashboard/notifcations" className={style.navlink}>
              <i className="bx bxs-bell"></i>
              <span className="">Notifications</span>
            </NavLink>
          </li>
          <li className={style.navlist_item}>
            <NavLink to="/dashboard/settings" className={style.navlink}>
              <i className="bx bxs-cog"></i>
              <span className="">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <VStack mt={10} spacing={4}>
        <Button
          textAlign={"start"}
          onClick={() => Navigate("/browse")}
          className={`button ${style.logoutBtn} ${style.exit_btn}`}
        >
          Exit
        </Button>
        <Button
          colorScheme="blue"
          textAlign={"start"}
          className={` button ${style.logoutBtn} ${style.create_btn}`}
        >
          Create
        </Button>
      </VStack>
    </Box>
  );
}
