import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Register from "../components/Resgister";
import Login from "../components/Login";
const LoginRegistration = () => {
  return (
    <Tabs
      width="90%"
      mx="auto"
      pt="4rem"
      align="center"
      variant="soft-rounded"
      colorScheme="red"
      size="lg"
      position="relative"
      isFitted
      defaultIndex={0}
    >
      <TabList>
        <Tab>REGISTER</Tab>
        <Tab>LOGIN</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Register />
        </TabPanel>
        <TabPanel>
          <Login />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoginRegistration;
