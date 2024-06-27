/** @format */
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Box,
} from "@chakra-ui/react";

interface CreateFormProps {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => any;
}
export default function CreateForm(props: CreateFormProps) {
  return (
    <Box>
      <form>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="email" />
          <FormHelperText>Provide a title to start with </FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
}
