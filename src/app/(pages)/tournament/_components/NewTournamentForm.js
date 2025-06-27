"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/InputField";
import toast from "react-hot-toast";
import { createTournament } from "../_lib/actions";

export default function FormNewTournament() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    start_date: null,
    end_date: null,
    venue: "",
    venue_address: "",
    grand_prize: "",
    register_price: "",
    bank: "",
    account_number: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleChange = (field) => (valueOrEvent) => {
    const value =
      valueOrEvent instanceof Date
        ? valueOrEvent
        : valueOrEvent?.target?.value ?? valueOrEvent;

    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await createTournament(formData);

    if (result.success) {
      toast.success("Tournament created successfully!");
      resetForm();
      router.replace("/tournament");
    } else if (result.errors) {
      toast.error("Please fix the form errors.");
      setErrors(result.errors);
    } else {
      toast.error(result.message || "Something went wrong");
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      organizer: "",
      start_date: null,
      end_date: null,
      venue: "",
      venue_address: "",
      grand_prize: "",
      register_price: "",
      bank: "",
      account_number: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <section className="p-5 w-full">
        <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
          <InputField
            id="name"
            label="Tournament Name"
            type="text"
            placeholder="Enter your tournament name"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            requiredIcon
          />

          <InputField
            id="organizer"
            label="Organizer"
            type="text"
            placeholder="Enter organizer full name"
            value={formData.organizer}
            onChange={handleChange("organizer")}
            error={errors.organizer}
            requiredIcon
          />

          <InputField
            id="start_date"
            label="Start Date"
            as="datetime"
            value={formData.start_date}
            onChange={handleChange("start_date")}
            error={errors.start_date}
            withTime={false}
            requiredIcon
          />

          <InputField
            id="end_date"
            label="End Date"
            as="datetime"
            value={formData.end_date}
            onChange={handleChange("end_date")}
            error={errors.end_date}
            withTime={false}
            requiredIcon
          />

          <InputField
            id="venue"
            label="Venue Name"
            type="text"
            placeholder="Enter venue full name"
            value={formData.venue}
            onChange={handleChange("venue")}
            error={errors.venue}
            requiredIcon
          />

          <InputField
            id="venue_address"
            label="Venue Address"
            type="text"
            placeholder="Enter venue address"
            value={formData.venue_address}
            onChange={handleChange("venue_address")}
            error={errors.venue_address}
            requiredIcon
          />

          <InputField
            id="grand_prize"
            label="Grand Prize"
            type="text"
            placeholder="Enter grand prize value"
            value={formData.grand_prize}
            onChange={handleChange("grand_prize")}
            error={errors.grand_prize}
            requiredIcon
          />

          <InputField
            id="register_price"
            label="Register Price"
            type="text"
            placeholder="Enter register price value"
            value={formData.register_price}
            onChange={handleChange("register_price")}
            error={errors.register_price}
            requiredIcon
          />

          <InputField
            id="bank"
            label="Bank Name [Register Payment]"
            type="text"
            placeholder="Enter bank name for register payment"
            value={formData.bank}
            onChange={handleChange("bank")}
            error={errors.bank}
            requiredIcon
          />

          <InputField
            id="account_number"
            label="Account Number [Register Payment]"
            type="text"
            placeholder="Enter account number bank for register payment"
            value={formData.account_number}
            onChange={handleChange("account_number")}
            error={errors.account_number}
            requiredIcon
          />
        </div>

        <InputField
          id="description"
          label="Match Description"
          as="textarea"
          placeholder="Type your description..."
          value={formData.description}
          onChange={handleChange("description")}
          error={errors.description}
        />

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
