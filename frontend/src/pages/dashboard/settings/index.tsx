/** @format */

//** @format */
import AccountSettings from "./accountSettings";
import { Box, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";

export default function ProfileTab() {
  return (
    <Box>
      <Tabs w={"100%"} p={4} variant="enclosed">
        <TabList>
          <Tab>Public Profile</Tab>
          <Tab isDisabled>Privacy</Tab>
          <Tab isDisabled>Billing</Tab>
        </TabList>
        <TabPanels w={"100%"}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
