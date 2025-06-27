import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;
  const { id } = await params;
  const matchId = parseInt(id, 10);

  if (isNaN(matchId)) {
    return NextResponse.json(
      { message: "Invalid Match ID format. ID must be a number." },
      { status: 400 }
    );
  }

  try {
    const match = await prisma.matches.findUnique({
      where: {
        id: matchId,
      },
      include: {
        creator: {
          include: {
            profile: true,
          },
        },
      },
    });
    if (!match) {
      return NextResponse.json(
        { message: "Match not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(match, { status: 200 });
  } catch (error) {
    console.error("Error fetching match data:", error);
    return NextResponse.json(
      { message: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
