import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request, context) {
  try {
    const { params } = context;
    const { id } = await params;
    const tournamentId = parseInt(id, 10);

    if (isNaN(tournamentId)) {
      return NextResponse.json(
        { message: "Invalid Tournament ID format. ID must be a number." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      full_name,
      nickname,
      gender,
      jersey_size,
      date_birth,
      birth_place,
      community,
      phone_number,
      email,
      instagram,
      photo,
      proof_payment,
      notes,
      status_payment = "PENDING",
    } = body;

    const errors = {};
    if (!full_name) errors.full_name = "Full name is required";
    if (!nickname) errors.nickname = "Nickname is required";
    if (!gender) errors.gender = "Gender is required";
    if (!jersey_size) errors.jersey_size = "Jersey size is required";
    if (!date_birth) errors.date_birth = "Birth Date is required";
    if (!birth_place) errors.birth_place = "Birth place is required";
    if (!community) errors.community = "Community is required";
    if (!phone_number) errors.phone_number = "Phone number is required";
    if (!email) errors.email = "Email is required";
    if (!photo) errors.photo = "Photo is required";
    if (!proof_payment) errors.proof_payment = "Photo is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newPlayer = await prisma.players.create({
      data: {
        full_name,
        nickname,
        gender,
        jersey_size,
        date_birth,
        birth_place,
        community,
        phone_number,
        email,
        instagram,
        photo,
      },
    });

    const newTournamentPlayer = await prisma.tournament_Players.create({
      data: {
        tournament_id: tournamentId,
        player_id: newPlayer.id,
        status_payment,
        proof_payment,
        notes,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newPlayer,
        tournament_player: newTournamentPlayer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tournament player:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
