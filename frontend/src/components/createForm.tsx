/** @format */
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { serverAxios } from "../api/axios";
import { useState } from "react";
import { z } from "zod";
import useZodErrorFilter from "../hooks/useZodErrorFilter";
import { useNavigate } from "react-router-dom";

interface CreateFormProps {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => any;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateForm(props: CreateFormProps) {
  const [title, setTitle] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { errors, clearErrors, filterZodErrors } = useZodErrorFilter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.setIsLoading && typeof props.setIsLoading === "function") {
      props.setIsLoading(false);
    }
    if (props.onSubmit && typeof props.onSubmit === "function") {
      props.onSubmit(e);
    }
    clearErrors();
    const titleSchema = z
      .string()
      .min(5, { message: "Title must be at least 5 characters long" })
      .max(120, { message: "Title cannot exceed 100 characters" });

    try {
      const data = titleSchema.parse(title);
      const response = await serverAxios.post("/article/create", { title: data });

      navigate(`/editor/${response.data.post._id}`);

      toast({
        title: "Article created.",
        description: "We've created your Ariticle",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      
    } catch (error) {
      toast({
        title: "Internal Server Error",
        description:
          "Something went wrong while trying to save your article to the database",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      filterZodErrors(error);

      console.log(error);
    } finally {
      if (props.setIsLoading && typeof props.setIsLoading === "function") {
        props.setIsLoading(false);
      }
    }
  };

  return (
    <Box>
      <form id="create" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input title={title} onChange={(e) => setTitle(e.target.value)} type="text" />
          <FormHelperText>
            {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
            Provide a title to start with
          </FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
}
