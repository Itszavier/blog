"use client";

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
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleButton, XButton } from "@/app/components/authButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Inputs {
  email: string;
  password: string;
}

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email must be at least 5 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function SignUpForm() {
  const router = useRouter();
  const toast = useToast({ position: "bottom-right" });
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok && response.status == 400) {
        return toast({
          title: "Error",
          description: result.message,
          status: "error",
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await signIn("credentials", {
        ...data,
      });
      toast({
        title: "Signup",
        status: "success",
        description: "Successfully registered your account",
      });

      console.log(result);
      router.push("/profile");
    } catch (error: any) {
      console.log("error", error);
      toast({
        title: "Error",
        status: "error",
        description:
          "Oops! Something went wrong while creating your account. Please try again.",
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      p={"14px"}
      boxShadow={{ base: "md", md: "unset" }}
      w={{ base: "90%", md: "650px" }}
    >
      <Flex justifyContent={"center"}>
        <Heading mb={"40px"} size={"lg"} p={"14px"}>
          Sign up
        </Heading>
      </Flex>

      <Box gap={"5px"} display={{ base: "unset", md: "flex" }}>
        <Flex flexDir={"column"} alignItems={"center"}>
          <FormControl
            w={{ base: "90%", md: "350px" }}
            p={"8px"}
            isInvalid={!!errors.email}
          >
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            w={{ base: "90%", md: "350px" }}
            isInvalid={!!errors.password}
            p={"8px"}
          >
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Flex mt={{ base: "2px" }} p={2} w={"100%"} justify={"center"}>
            <Button
              isLoading={isSubmitting}
              type="submit"
              bg="light.secondaryBtn"
              width={{ base: "90%" }}
            >
              Sign up
            </Button>
          </Flex>
        </Flex>

        <Flex
          w="100%"
          alignItems="center"
          justifyContent={{ base: "center", md: "normal" }}
          gap={"4px"}
          p={{ base: "unset", md: "10px" }}
          flexDir={{ base: "row", md: "column" }}
        >
          <Divider
            display={{ base: "none", md: "block" }}
            orientation={"vertical"}
          />
          <Divider
            display={{ base: "block", md: "none" }}
            orientation={"horizontal"}
            width={"40%"}
          />
          <Text>Or</Text>

          <Divider
            display={{ base: "none", md: "block" }}
            orientation={"vertical"}
          />
          <Divider
            display={{ base: "block", md: "none" }}
            orientation={"horizontal"}
            width={"40%"}
          />
        </Flex>
        <Flex
          mt={2}
          gap={{ base: "8px", md: "25px" }}
          w={{ md: "350px" }}
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
