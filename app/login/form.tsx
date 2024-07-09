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
import { isValid, z } from "zod";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
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

export default function LoginForm() {
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>(false);
  const toast = useToast({ position: "bottom-right" });
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res && res.error === "Configuration") {
        console.error("client", res);
        toast({
          description: "username or password invalid",
          status: "error",
        });

        return;
      }

      toast({
        title: "login",
        status: "success",
        description: "Successfully logged in",
      });

      router.push("/profile");
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        description:
          "Oops! Something went wrong while creating your account. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
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
      <Heading mb={"40px"} size={"lg"} p={"14px"} textAlign={"center"}>
        Login
      </Heading>
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
            <Box>
              <Input
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <Flex>
                <Link href={"#"}>forgot Password</Link>
              </Flex>
            </Box>

            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Flex mt={{ base: "2px" }} p={2} w={"100%"} justify={"center"}>
            <Button
              isLoading={loading}
              type="submit"
              bg="light.secondaryBtn"
              width={{ base: "90%" }}
            >
              Login
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
