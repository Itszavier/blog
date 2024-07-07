import Link from "next/link";

import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Text,
  Input,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { GoogleButton, XButton } from "@/app/components/authButton";

export default function Signup() {
  return (
    <Box
      pt={"68px"}
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box as="form" width={"470px"} h="fit-content" p={"10px"}>
        <Box padding={"5px"}>
          <Heading textAlign={"center"}>Sign up</Heading>
        </Box>

        <Flex display={"flex"} flexDirection={"column"} p={8} gap={"8"}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" type={"email"} />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type={"password"} />
          </FormControl>
        </Flex>

        <Flex justifyContent={"space-evenly"} p={2} width={"100%"}>
          <Text>
            Already have an account? <Link href={"/auth/login"}>Signup</Link>
          </Text>
        </Flex>

        <Flex mt={2} p={2} w={"100%"} justify={"center"}>
          <Button type="submit" colorScheme="blue" width={"90%"}>
            Sign up
          </Button>
        </Flex>
        <Flex alignItems="center">
          <Divider orientation="horizontal" height="2px" flex="1" />
          <Text mx={2}>Or</Text>
          <Divider orientation="horizontal" height="2px" flex="1" />
        </Flex>
        <Flex
          mt={2}
          gap={"3"}
          flexDirection={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <GoogleButton />
          <XButton />
        </Flex>
      </Box>
    </Box>
  );
}
