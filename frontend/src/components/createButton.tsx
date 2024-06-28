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
  Flex,
} from "@chakra-ui/react";
import CreateForm from "./createForm";

export default function CreateButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Create Post</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create A New article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateForm />
          </ModalBody>

          <ModalFooter gap={3} flexDirection={"column"}>
            <Button width={"100%"} colorScheme="blue" onClick={onClose}>
              Close
            </Button>
            <Button width={"100%"} type="submit" form="create">
              continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
