"use client";

import React, { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import InputField from "@/app/components/InputField";
import toast from "react-hot-toast";
import { registerPlayerToTournament } from "../_lib/actions";

export default function FormPlayerRegisterTournament() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params?.id;

  const emptyPlayer = {
    full_name: "",
    nickname: "",
    gender: "",
    jersey_size: "",
    date_birth: null,
    birth_place: "",
    phone_number: "",
    email: "",
    instagram: "",
    photo: null,
  };

  const [formData, setFormData] = useState({
    player1: { ...emptyPlayer },
    player2: { ...emptyPlayer },
    proof_payment: null,
    community_logo: null,
    community: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const makeKey = (playerKey, field) =>
    playerKey ? `${playerKey}_${field}` : field;

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const extractValue = (evtOrVal) => {
    if (evtOrVal instanceof Date) return evtOrVal;
    if (evtOrVal?.target?.files) return evtOrVal.target.files[0];
    return evtOrVal?.target?.value ?? evtOrVal;
  };

  const handlePlayerChange = (playerKey, field) => (evtOrVal) => {
    setFormData((prev) => ({
      ...prev,
      [playerKey]: { ...prev[playerKey], [field]: extractValue(evtOrVal) },
    }));
    clearError(makeKey(playerKey, field));
  };

  const handleRootChange = (field) => (evtOrVal) => {
    setFormData((prev) => ({ ...prev, [field]: extractValue(evtOrVal) }));
    clearError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const common = {
      proof_payment: formData.proof_payment,
      community_logo: formData.community_logo,
      community: formData.community,
      notes: formData.notes,
    };

    const p1 = await registerPlayerToTournament(
      { ...formData.player1, ...common },
      tournamentId
    );
    const p2 = await registerPlayerToTournament(
      { ...formData.player2, ...common },
      tournamentId
    );

    if (p1.success && p2.success) {
      toast.success("Both players registered successfully!");
      resetForm();
      router.replace("/tournament");
    } else {
      toast.error("Some errors occurred. Please check the form.");
      const rename = (obj = {}, prefix) =>
        Object.fromEntries(
          Object.entries(obj).map(([k, v]) => [prefix + k, v])
        );
      setErrors({ ...rename(p1.errors, "p1_"), ...rename(p2.errors, "p2_") });
    }

    setLoading(false);
  };

  const resetForm = () =>
    setFormData({
      player1: { ...emptyPlayer },
      player2: { ...emptyPlayer },
      proof_payment: null,
      community_logo: null,
      community: "",
      notes: "",
    });

  return (
    <form onSubmit={handleSubmit} className="relative">
      <section className="p-5 w-full">
        <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-6 mb-4">
          <div className="flex flex-col justify-start items-center gap-2 px-5">
            <h1 className="text-2xl mb-5 text-black font-bold font-[family-name:var(--font-roboto)]">
              PLAYER 1
            </h1>
            <InputField
              id="p1-full_name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.player1.full_name}
              onChange={handlePlayerChange("player1", "full_name")}
              error={errors.p1_full_name}
              requiredIcon
            />

            <InputField
              id="p1-nickname"
              label="Nickname"
              type="text"
              placeholder="Enter your nickname"
              value={formData.player1.nickname}
              onChange={handlePlayerChange("player1", "nickname")}
              error={errors.p1_nickname}
              requiredIcon
            />

            <InputField
              id="p1-gender"
              label="Gender"
              as="radio"
              value={formData.player1.gender}
              onChange={handlePlayerChange("player1", "gender")}
              options={[
                { value: "MALE", label: "MALE" },
                { value: "FEMALE", label: "FEMALE" },
              ]}
              error={errors.p1_gender}
              requiredIcon
            />

            <InputField
              id="p1-jersey_size"
              label="Jersey Size"
              as="radio"
              direction="row"
              value={formData.player1.jersey_size}
              onChange={handlePlayerChange("player1", "jersey_size")}
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
                { value: "xl", label: "XL" },
                { value: "xxl", label: "XXL" },
                { value: "xxxl", label: "XXXL" },
              ]}
              error={errors.p1_jersey_size}
              requiredIcon
            />

            <InputField
              id="p1-date_birth"
              label="Birth Date"
              as="datetime"
              value={formData.player1.date_birth}
              onChange={handlePlayerChange("player1", "date_birth")}
              error={errors.p1_date_birth}
              withTime={false}
              requiredIcon
            />

            <InputField
              id="p1-phone_number"
              label="Phone Number"
              type="text"
              placeholder="Enter your phone number"
              value={formData.player1.phone_number}
              onChange={handlePlayerChange("player1", "phone_number")}
              error={errors.p1_phone_number}
              requiredIcon
            />

            <InputField
              id="p1-email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.player1.email}
              onChange={handlePlayerChange("player1", "email")}
              error={errors.p1_email}
              requiredIcon
            />

            <InputField
              id="p1-instagram"
              label="Instagram Account"
              type="text"
              placeholder="Enter your instagram username"
              value={formData.player1.instagram}
              onChange={handlePlayerChange("player1", "instagram")}
              error={errors.p1_instagram}
            />

            <InputField
              id="p1-photo"
              label="Close Up Photo"
              as="file"
              accept=".jpg,.jpeg,.png"
              placeholder="Upload your close up photo"
              value={formData.player1.photo}
              onChange={handlePlayerChange("player1", "photo")}
              error={errors.p1_photo}
              requiredIcon
            />
          </div>

          <div className="flex flex-col justify-start items-center gap-2 px-5">
            <h1 className="text-2xl mb-5 text-black font-bold font-[family-name:var(--font-roboto)]">
              PLAYER 2
            </h1>

            <InputField
              id="p2-full_name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.player2.full_name}
              onChange={handlePlayerChange("player2", "full_name")}
              error={errors.p2_full_name}
              requiredIcon
            />

            <InputField
              id="p2-nickname"
              label="Nickname"
              type="text"
              placeholder="Enter your nickname"
              value={formData.player2.nickname}
              onChange={handlePlayerChange("player2", "nickname")}
              error={errors.p2_nickname}
              requiredIcon
            />

            <InputField
              id="p2-gender"
              label="Gender"
              as="radio"
              value={formData.player2.gender}
              onChange={handlePlayerChange("player2", "gender")}
              options={[
                { value: "MALE", label: "MALE" },
                { value: "FEMALE", label: "FEMALE" },
              ]}
              error={errors.p2_gender}
              requiredIcon
            />

            <InputField
              id="p2-jersey_size"
              label="Jersey Size"
              as="radio"
              direction="row"
              value={formData.player2.jersey_size}
              onChange={handlePlayerChange("player2", "jersey_size")}
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
                { value: "xl", label: "XL" },
                { value: "xxl", label: "XXL" },
                { value: "xxxl", label: "XXXL" },
              ]}
              error={errors.p2_jersey_size}
              requiredIcon
            />

            <InputField
              id="p2-date_birth"
              label="Birth Date"
              as="datetime"
              value={formData.player2.date_birth}
              onChange={handlePlayerChange("player2", "date_birth")}
              error={errors.p2_date_birth}
              withTime={false}
              requiredIcon
            />

            <InputField
              id="p2-phone_number"
              label="Phone Number"
              type="text"
              placeholder="Enter your phone number"
              value={formData.player2.phone_number}
              onChange={handlePlayerChange("player2", "phone_number")}
              error={errors.p2_phone_number}
              requiredIcon
            />

            <InputField
              id="p2-email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.player2.email}
              onChange={handlePlayerChange("player2", "email")}
              error={errors.p2_email}
              requiredIcon
            />

            <InputField
              id="p2-instagram"
              label="Instagram Account"
              type="text"
              placeholder="Enter your instagram username"
              value={formData.player2.instagram}
              onChange={handlePlayerChange("player2", "instagram")}
              error={errors.p2_instagram}
            />

            <InputField
              id="p2-photo"
              label="Close Up Photo"
              as="file"
              accept=".jpg,.jpeg,.png"
              placeholder="Upload your close up photo"
              value={formData.player2.photo}
              onChange={handlePlayerChange("player2", "photo")}
              error={errors.p2_photo}
              requiredIcon
            />
          </div>

          <div className="px-5">
            <InputField
              id="community_logo"
              label="Community Logo"
              as="file"
              accept=".jpg,.jpeg,.png,.pdf"
              placeholder="Upload your community logo"
              value={formData.community_logo}
              onChange={handleRootChange("community_logo")}
              error={errors.community_logo}
              requiredIcon
            />
          </div>

          <div className="px-5">
            <InputField
              id="community"
              label="Community"
              as="dropdown"
              placeholder="Select your community"
              value={formData.community}
              onChange={handleRootChange("community")}
              options={[
                { value: "bcdp", label: "BCDP" },
                { value: "pppadel", label: "PPPadel" },
                { value: "127_padel", label: "127 Padel" },
                { value: "atte", label: "ATTE" },
                { value: "hari_hari_padel", label: "Hari Hari Padel" },
                { value: "pagi_pagi", label: "Pagi Pagi" },
                { value: "baiko_padel_club", label: "Baiko Padel Club" },
                { value: "padel_ngasal", label: "Padel Ngasal" },
                {
                  value: "final_padel_community",
                  label: "Final Padel Community",
                },
                { value: "padelicios", label: "Padelicios" },
                { value: "nyobain_padel", label: "Nyobain Padel" },
                { value: "padel_pisan", label: "Padel Pisan" },
                { value: "the_padel_hub", label: "The Padel Hub" },
                { value: "the_padel_club", label: "The Padel Club" },
                { value: "padel_pop", label: "Padel Pop" },
                { value: "belajar_padel", label: "Belajar Padel" },
              ]}
              error={errors.community}
              requiredIcon
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-stoplight text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </section>
    </form>
  );
}
