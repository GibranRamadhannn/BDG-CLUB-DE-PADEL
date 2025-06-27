"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import MatchFormat from "./match-format";
import toast from "react-hot-toast";

export default function FormNewMatch() {
  const router = useRouter();

  const [format, setFormat] = useState(null);
  const [name, setName] = useState("");
  const [field_address, setFieldAddress] = useState("");
  const [field, setField] = useState("");
  const [cp_name, setCpName] = useState("");
  const [cp_phone_number, setCpPhoneNumber] = useState("");
  const [cp_instagram, setCpInstagramUsn] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          name,
          field_address,
          field,
          cp_name,
          cp_phone_number,
          cp_instagram,
          description,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Match created successfully!");
        resetForm();
        router.replace("/match");
      } else if (res.status === 400 && result?.errors) {
        toast.error("Please fix the form errors.");
        setErrors(result.errors);
      } else {
        toast.error(result?.error || "Something went wrong");
        console.error("Server error:", result);
      }
    } catch (err) {
      toast.error("Failed to create match. Please try again.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setFieldAddress("");
    setField("");
    setCpName("");
    setCpInstagramUsn("");
    setCpPhoneNumber("");
    setDescription("");
    setFormat(null);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Match Format */}
      <section className="px-5 mb-12 w-full">
        <h3 className="text-xl text-foreground font-semibold font-[family-name:var(--font-roboto)] pb-3 mb-5 border-b border-mercury">
          Match Format
        </h3>
        <MatchFormat
          selectedId={format}
          onSelect={(value) => {
            setFormat(value);
            clearError("format");
          }}
        />
        {errors.format && (
          <p className="text-xs text-stoplight mt-2 transition-all duration-300">
            {errors.format}
          </p>
        )}
      </section>

      {/* Match Details */}
      <section className="px-5 mb-12 w-full">
        <h3 className="text-xl text-foreground font-semibold font-[family-name:var(--font-roboto)] pb-3 mb-5 border-b border-mercury">
          Match Details
        </h3>

        <div className="w-full h-full grid grid-cols-3 gap-4">
          <InputField
            id="match_name"
            label="Match Name"
            type="text"
            placeholder="Enter your match name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            error={errors.name}
            requiredIcon="true"
          />

          <InputField
            id="field_address"
            label="Field Address"
            type="text"
            placeholder="Enter full field address"
            value={field_address}
            onChange={(e) => {
              setFieldAddress(e.target.value);
              clearError("field_address");
            }}
            error={errors.field_address}
            requiredIcon="true"
          />

          <InputField
            id="field_name"
            label="Field Name"
            type="text"
            placeholder="Enter your field name"
            value={field}
            onChange={(e) => {
              setField(e.target.value);
              clearError("field");
            }}
            error={errors.field}
            requiredIcon="true"
          />
        </div>

        <div className="w-full h-full grid grid-cols-3 gap-4">
          <InputField
            id="cp_instagram"
            label="Contact Person - Instagram Username"
            type="text"
            placeholder="Enter your CP instagram username"
            value={cp_instagram}
            onChange={(e) => setCpInstagramUsn(e.target.value)}
            error={errors.cp_instagram}
          />

          <InputField
            id="cp_phone_number"
            label="Contact Person - Phone Number"
            type="text"
            placeholder="Enter your CP phone number"
            value={cp_phone_number}
            onChange={(e) => {
              setCpPhoneNumber(e.target.value);
              clearError("cp_phone_number");
            }}
            error={errors.cp_phone_number}
            requiredIcon="true"
          />

          <InputField
            id="cp_name"
            label="Contact Person - Name"
            type="text"
            placeholder="Enter your CP name"
            value={cp_name}
            onChange={(e) => {
              setCpName(e.target.value);
              clearError("cp_name");
            }}
            error={errors.cp_name}
            requiredIcon="true"
          />
        </div>

        <InputField
          id="description"
          label="Match Description"
          as="textarea"
          placeholder="Type your description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-stoplight text-white px-6 py-2 mt-6 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </section>
    </form>
  );
}
