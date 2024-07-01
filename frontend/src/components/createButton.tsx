/** @format */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CreateForm from "./createForm";
import { useState } from "react";

export default function CreateButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <Button bg={"black"} color={"white"}  onClick={onOpen}>
        Create Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create A New article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateForm setIsLoading={setIsLoading} />
          </ModalBody>

          <ModalFooter gap={3} flexDirection={"column"}>
            <Button width={"100%"} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              loadingText="Saving"
              width={"100%"}
              colorScheme="blue"
              type="submit"
              form="create"
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
