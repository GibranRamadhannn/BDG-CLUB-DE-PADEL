"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import InputField from "@/app/components/InputField";
import { updateProofPayment } from "../../../../../_lib/actions";

export default function RegisterConfirmationPage() {
  const [formData, setFormData] = useState({
    proof_payment: null,
    payment_notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const { tournamentId, playerId1, playerId2 } = params;
  const router = useRouter();

  const extractValue = (evtOrVal) => {
    if (evtOrVal instanceof File || evtOrVal instanceof Blob) return evtOrVal;
    if (evtOrVal?.target?.files) return evtOrVal.target.files[0];
    return evtOrVal?.target?.value ?? evtOrVal;
  };

  const handleInputChange = (field) => (evtOrVal) => {
    const value = extractValue(evtOrVal);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // quick front‑end validation
    if (!formData.proof_payment) {
      setError("Please upload proof of payment first.");
      return;
    }
    setError(null);
    setLoading(true);
    const result = await updateProofPayment(
      formData,
      tournamentId,
      playerId1,
      playerId2
    );
    setLoading(false);

    if (result.success) {
      router.push(`/tournament`);
    } else {
      setError(result.message || "Something went wrong, please try again.");
    }
  };

  return (
    <section className="min-h-screen font-[family-name:var(--font-montserrat)] bg-[url('/wintery-sunburst.svg')] bg-cover bg-center p-6">
      <div className="flex flex-col justify-center items-center pt-32 space-y-4 text-center mb-8">
        <h1 className="font-bold text-[#faf1b3] text-5xl">
          Thank you for registering!
        </h1>
        <p className="text-white text-xl max-w-xl">
          To complete your registration, please proceed with the payment. We’re
          excited to have you on board!
        </p>
      </div>

      <div className="md:px-12 flex justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-8 p-3 rounded-3xl bg-after-shock md:w-1/2"
        >
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold font-roboto text-foreground">
                Bank & Account Name
              </span>
              <span className="text-lg md:text-xl font-bold font-roboto text-exotic-liras">
                Mandiri - Aldibrama
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold font-roboto text-foreground">
                Account Number
              </span>
              <span className="text-lg md:text-xl font-bold font-roboto text-exotic-liras">
                1320016833924
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold font-roboto text-foreground">
                Register Price
              </span>
              <span className="text-lg md:text-xl font-bold font-roboto text-exotic-liras">
                Rp. 550.000
              </span>
            </div>
          </div>

          {/* <InputField
            id="proof_payment"
            label="Proof Payment"
            as="file"
            accept=".jpg,.jpeg,.png"
            placeholder="Upload your proof payment"
            onChange={handleInputChange("proof_payment")}
            value={formData.proof_payment}
            requiredIcon
          />

          <InputField
            id="payment_notes"
            label="Payment Notes"
            as="textarea"
            placeholder="Enter your payment notes"
            onChange={handleInputChange("payment_notes")}
          />

          <button
            type="submit"
            className="bg-stoplight text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Submitting…" : "Submit"}
          </button> */}

          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
