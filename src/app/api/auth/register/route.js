import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, email, username, password, password_confirmation } =
      body;

    if (
      !full_name ||
      !email ||
      !username ||
      !password ||
      !password_confirmation
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format.", field: "email" },
        { status: 400 }
      );
    }

    const usernameRegex = /^[A-Z][A-Za-z0-9]*$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          message:
            "Username must start with a capital letter and contain no spaces.",
          field: "username",
        },
        { status: 400 }
      );
    }

    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[^A-Za-z0-9]).{7,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters, start with a capital letter, include a number and a symbol.",
          field: "password",
        },
        { status: 400 }
      );
    }

    if (password !== password_confirmation) {
      return NextResponse.json(
        {
          message: "Password confirmation does not match.",
          field: "password_confirmation",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email or Username already taken.",
          field: existingUser.email === email ? "email" : "username",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
        remember_token: "",
      },
    });

    await prisma.user_Profiles.create({
      data: {
        user_id: newUser.id,
        full_name,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
