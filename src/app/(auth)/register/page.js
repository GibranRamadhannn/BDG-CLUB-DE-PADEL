"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = true;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.field) setErrors((prev) => ({ ...prev, [data.field]: true }));
        throw new Error(data.message);
      }

      toast.success("Register Success! Redirecting to login page...");
      setForm({
        full_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      });

      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-2 font-[family-name:var(--font-montserrat)] duration-300 transition-all">
      <div className="w-full h-full">
        <div className="flex justify-between gap-1 h-full">
          {/* Image */}
          <div className="w-full relative rounded-4xl overflow-hidden hidden lg:block">
            <Image
              src="/bdgclubdepadel-flag.jpg"
              alt="BDGCLUBDEPADEL Flag"
              fill
              className="object-cover"
            />
          </div>

          {/* Form Register */}
          <div className="w-full px-8 md:px-16 lg:px-32 py-12 flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-between items-center gap-4 h-full w-full">
              {/* Logo */}
              <Image
                src="/logo-1.png"
                alt="BDGCLUBDEPADEL Logo"
                width={100}
                height={100}
              />

              <div className="flex flex-col justify-between items-center gap-2 w-full">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground text-center w-full">
                  REGISTER
                </h1>
                <p className="text-sm md:text-md text-foreground text-center font-[family-name:var(--font-geist-mono)]">
                  Fill the form to continue the registration account
                </p>
              </div>

              <div className="px-0 md:px-12 lg:px-2 xl:px-20 py-7 w-full">
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center justify-between gap-6 w-full">
                    {["full_name", "username", "email"].map((id) => {
                      const label = id
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase());

                      return (
                        <div
                          key={id}
                          className="grid w-full items-center gap-3"
                        >
                          <Label htmlFor={id} className="text-sm md:text-md">
                            {label} <span className="text-sm text-stoplight font-medium">*</span>
                          </Label>
                          <Input
                            id={id}
                            type="text"
                            value={form[id]}
                            onChange={handleChange}
                            placeholder={`Your ${label}`}
                            className={`p-3 bg-white rounded-xl placeholder:text-xs ${
                              errors[id]
                                ? "border-stoplight"
                                : "border-silver-medal/70"
                            }`}
                          />
                        </div>
                      );
                    })}

                    {["password", "password_confirmation"].map((id) => (
                      <div
                        key={id}
                        className="grid w-full items-center gap-3 relative"
                      >
                        <Label htmlFor={id} className="text-sm md:text-md">
                          {id === "password"
                            ? "Password"
                            : "Password Confirmation"} <span className="text-sm text-stoplight font-medium">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id={id}
                            type={showPassword ? "text" : "password"}
                            value={form[id]}
                            onChange={handleChange}
                            placeholder={
                              id === "password"
                                ? "Password"
                                : "Confirm password"
                            }
                            className={`p-3 pr-10 bg-white rounded-xl placeholder:text-xs ${
                              errors[id]
                                ? "border-stoplight"
                                : "border-silver-medal/70"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center w-full justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-stoplight text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? "Registering..." : "Register"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Already have an account */}
              <div className="w-full flex justify-center items-center gap-2">
                <p className="text-xs md:text-md font-medium text-foreground text-center font-[family-name:var(--font-geist-mono)]">
                  Already have an account?
                </p>
                <Link
                  href="/login"
                  className="text-sm md:text-md text-neptune-blue font-semibold"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
