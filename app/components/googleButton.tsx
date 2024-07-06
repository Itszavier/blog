import { IconButton } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginWithGoogle() {
  return (
    <IconButton
      colorScheme="blue"
      fontSize={"20px"}
      aria-label=""
      icon={<FaGoogle />}
    />
  );
}
