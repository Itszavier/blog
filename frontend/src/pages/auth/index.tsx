/** @format */

import Login from "./login";
import SignUp from "./signup";
import style from "./style.module.css";
import { Box, Tabs, Tab, TabPanels, TabList, TabPanel } from "@chakra-ui/react";

export default function Auth() {
  return (
    <Box justifyContent={"center"} display={"flex"} pt={"68"} w={"100%"} h={"100vh"}>
      <Tabs
        boxShadow={"md"}
        mt={"40px"}
        p={"2"}
        h={"fit-content"}
        w={"500px"}
        align="center"
        variant="enclosed"
      >
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
