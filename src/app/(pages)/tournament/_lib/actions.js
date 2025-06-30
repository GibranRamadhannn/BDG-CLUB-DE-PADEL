"use server";

import { put } from "@vercel/blob";
import { cookies } from "next/headers";

export async function createTournament(data) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cookieHeader = cookies().toString();
    const res = await fetch(`${baseUrl}/api/tournaments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
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

export async function registerPlayerToTournament(
  formData,
  tournamentId,
  playerId1,
  playerId2
) {
  try {
    const { photo, proof_payment, community_logo, date_birth, ...fields } =
      formData;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cookieHeader = cookies().toString();

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
    const communtiyLogoUrl = await upload(community_logo, "community_logo");

    const payload = {
      ...fields,
      photo: photoUrl,
      proof_payment: proofPaymentUrl,
      community_logo: communtiyLogoUrl,
      status_payment: "PENDING",
      date_birth: date_birth?.toISOString?.() ?? null,
    };

    const res = await fetch(
      `${baseUrl}/api/tournaments/${tournamentId}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
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

export async function updateProofPayment(formData, tournamentId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cookieHeader = cookies().toString();

    const proof_payment = formData.proof_payment;
    const payment_notes = formData.payment_notes;

    const upload = async (file, prefix) => {
      if (!file) return null;
      const blob = await put(`${prefix}-${Date.now()}-${file.name}`, file, {
        access: "public",
        addRandomSuffix: false,
        token: process.env.bdgclubdepadel_blob_READ_WRITE_TOKEN,
      });
      return blob.url;
    };

    const proofPaymentUrl = await upload(proof_payment, "payment");

    const payload = {
      proof_payment: proofPaymentUrl,
      notes: payment_notes || "",
    };

    const res = await fetch(
      `${baseUrl}/api/tournaments/${tournamentId}/${playerId1}/${playerId2}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        errors: result.errors || null,
        message:
          result.message || result.error || "Failed updating proof payment",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("updateProofPayment error:", error);
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
