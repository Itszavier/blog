/** @format */

import { FaGoogle } from "react-icons/fa";
import style from "./style.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Icon,
} from "@chakra-ui/react";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: any;
}

export default function AuthModal(props: AuthModalsProps) {
  const handleLogin = () => {
    window.open(`https://narrate-server.loca.lt/auth/login/google`, "_self");
  };

  return (
    <Modal scrollBehavior={"outside"} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent h={"250px"} bgColor={"grey.200"}>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={"flex"} flexDirection={"column"}>
            <Button
              onClick={handleLogin}
              h="60px"
              leftIcon={<Icon as={FaGoogle} className={style.icon} />}
            >
              Sign in with Google
            </Button>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
