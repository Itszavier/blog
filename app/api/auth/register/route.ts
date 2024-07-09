import UserModel from "@/app/models/user";
import next, { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import { signIn } from "@/app/auth";
import { z, ZodError } from "zod";
import { redirect } from "next/navigation";

const bodySchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email must be at least 5 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = bodySchema.parse(body);

    const user = await UserModel.findOne({ email: email });

    if (user) {
      console.log("user already exist");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const createdUser = await UserModel.create({
      email,
      password,
    });

    console.log(createdUser);

    return NextResponse.json(
      { message: "successfuly created user" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errors = error.errors.map((errors) => {
        return { path: errors.path, message: error.message, name: error.name };
      });

      return NextResponse.json(
        { name: "validationError", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Server Interal error" },
      { status: 400 }
    );
  }
}
