"use server";

import { put } from "@vercel/blob";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const cookieStore = cookies();

export async function createTournament(data) {
  try {
    const res = await fetch(`${baseUrl}/api/tournaments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        errors: result.errors || null,
        message: result.error || "Failed to create tournament",
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("[createTournament]", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function registerPlayerToTournament(formData, tournamentId) {
  try {
    const { photo, proof_payment, date_birth, ...fields } = formData;

    const upload = async (file, prefix) => {
      if (!file) return null;
      const blob = await put(`${prefix}-${Date.now()}-${file.name}`, file, {
        access: "public",
        addRandomSuffix: false,
        token: process.env.bdgclubdepadel_blob_READ_WRITE_TOKEN,
      });
      return blob.url;
    };

    const photoUrl = await upload(photo, "player");
    const proofPaymentUrl = await upload(proof_payment, "payment");

    const payload = {
      ...fields,
      photo: photoUrl,
      proof_payment: proofPaymentUrl,
      status_payment: "PENDING",
      date_birth: date_birth?.toISOString?.() ?? null,
    };

    const res = await fetch(
      `${baseUrl}/api/tournaments/${tournamentId}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        errors: result.errors || null,
        message: result.message || result.error || "Registration failed",
      };
    }

    return {
      success: true,
      data: result.data,
      tournament_player: result.tournament_player,
    };
  } catch (error) {
    console.error("registerPlayerToTournament error:", error);
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
