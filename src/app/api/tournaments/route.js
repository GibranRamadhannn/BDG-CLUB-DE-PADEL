import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();
// const mockUserId = 3;

export async function GET() {
  try {
    const tournaments = await prisma.tournaments.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // const userId = mockUserId;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log(body);

    const {
      name,
      organizer,
      venue,
      venue_address,
      grand_prize,
      register_price,
      bank,
      account_number,
      description,
      status = "UPCOMING",
      start_date,
      end_date,
    } = body;

    const parsedStart = new Date(start_date);
    const parsedEnd = new Date(end_date);

    if (isNaN(parsedStart)) {
      return NextResponse.json(
        { error: "Start date is invalid" },
        { status: 400 }
      );
    }
    if (isNaN(parsedEnd)) {
      return NextResponse.json(
        { error: "End date is invalid" },
        { status: 400 }
      );
    }

    const errors = {};
    if (!name) errors.name = "Tournament name is required";
    if (!organizer) errors.organizer = "Tournament organizer is required";
    if (!venue) errors.venue = "Tournament Venue is required";
    if (!start_date) errors.start_date = "Tournament Start Date is required";
    if (!end_date) errors.end_date = "Tournament End Date is required";
    if (!venue_address)
      errors.venue_address = "Tournament Venue Address is required";
    if (!grand_prize) errors.grand_prize = "Tournament Grand Prize is required";
    if (!register_price)
      errors.register_price = "Tournament Register Price is required";
    if (!bank) errors.bank = "Bank name for register payment is required";
    if (!account_number)
      errors.account_number =
        "Account number bank for register payment is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newTournament = await prisma.tournaments.create({
      data: {
        name,
        organizer,
        venue,
        venue_address,
        grand_prize,
        register_price,
        bank,
        account_number,
        description,
        status,
        start_date,
        end_date,
        created_by: session.user?.id,
      },
    });

    return NextResponse.json(
      { success: true, data: newTournament },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
