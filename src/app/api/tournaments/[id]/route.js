import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(request, context) {
  const { params } = context;
  const { id } = await params;
  const tournamentId = parseInt(id, 10);

  if (isNaN(tournamentId)) {
    return NextResponse.json(
      { message: "Invalid Tournament ID format. ID must be a number." },
      { status: 400 }
    );
  }

  try {
    const tournament = await prisma.tournaments.findUnique({
      where: {
        id: tournamentId,
      },
      include: {
        creator: {
          include: {
            profile: true,
          },
        },
        tournament_players: {
          include: {
            player: true,
          },
        },
      },
    });
    if (!tournament) {
      return NextResponse.json(
        { message: "Tournament not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(tournament, { status: 200 });
  } catch (error) {
    console.error("Error fetching tournament data:", error);
    return NextResponse.json(
      { message: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
