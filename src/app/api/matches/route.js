import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const matches = await prisma.matches.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      format,
      name,
      field_address,
      field,
      cp_name,
      cp_instagram,
      cp_phone_number,
      description,
    } = body;

    const errors = {};
    if (!format) errors.format = "Match format is required";
    if (!name) errors.name = "Match name is required";
    if (!field_address) errors.field_address = "Field Address is required";
    if (!field) errors.field = "Field Name is required";
    if (!cp_name) errors.cp_name = "Contact Person - Name is required";
    if (!cp_phone_number)
      errors.cp_phone_number = "Contact Person - Phone Number is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newMatch = await prisma.matches.create({
      data: {
        format,
        name,
        field_address,
        field,
        cp_name,
        cp_instagram,
        cp_phone_number,
        description,
        created_by: session.user.id,
      },
    });

    return NextResponse.json(
      { success: true, data: newMatch },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
