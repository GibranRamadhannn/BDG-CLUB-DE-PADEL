import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request, { params }) {
  try {
    const { tournamentId, playerId1, playerId2 } = params;
    const { proof_payment, notes } = await request.json();

    if (!proof_payment) {
      return NextResponse.json(
        { message: "Missing proof_payment" },
        { status: 400 }
      );
    }

    const updateData = {
      proof_payment,
      notes,
      status_payment: "PAID",
    };

    const [tp1, tp2] = await Promise.all([
      prisma.tournament_Players.updateMany({
        where: {
          tournament_id: parseInt(tournamentId),
          player_id: parseInt(playerId1),
        },
        data: updateData,
      }),
      prisma.tournament_Players.updateMany({
        where: {
          tournament_id: parseInt(tournamentId),
          player_id: parseInt(playerId2),
        },
        data: updateData,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        updated: [tp1.count, tp2.count],
      },
    });
  } catch (error) {
    console.error("Error updating proof payment:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
