/** @format */
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import { serverAxios } from "../api/axios";
import { useState } from "react";
import { z } from "zod";

interface CreateFormProps {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => any;
}

export default function CreateForm(props: CreateFormProps) {
  const [title, setTitle] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit && typeof props.onSubmit === "function") {
      props.onSubmit(e);
    }

    const postSchema = z.object({
      title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(120, { message: "Title cannot exceed 100 characters" }),
    });
    
    try {
      const response = await serverAxios.post("/article/create", { title });
    } catch (error) {

    }
  };

  return (
    <Box>
      <form id="create" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input title={title} onChange={(e) => setTitle(e.target.value)} type="email" />
          <FormHelperText>Provide a title to start with </FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
}
