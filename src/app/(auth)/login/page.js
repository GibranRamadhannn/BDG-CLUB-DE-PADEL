"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
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

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res.ok) {
      toast.success("Login Success! Redirecting to main page...");
      setTimeout(() => router.push("/"), 1000);
    } else {
      if (res.error?.toLowerCase().includes("identifier")) {
        setErrors((prev) => ({ ...prev, identifier: true }));
      } else if (res.error?.toLowerCase().includes("password")) {
        setErrors((prev) => ({ ...prev, password: true }));
      }
      toast.error(res.error || "Invalid credentials.");
    }

    setLoading(false);
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

          {/* Form Login */}
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
                <h1 className="text-2xl md:text-4xl font-bold text-foreground text-center w-full text-uppercase">
                  Login
                </h1>
                <p className="text-sm md:text-md text-foreground text-center font-[family-name:var(--font-geist-mono)]">
                  Enter your email and password to access your account
                </p>
              </div>

              <div className="px-0 md:px-12 lg:px-2 xl:px-20 py-2 w-full">
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center justify-between gap-6 w-full">
                    <div className="grid w-full items-center gap-3">
                      <Label
                        htmlFor="identifier"
                        className="text-sm md:text-md"
                      >
                        Email or Username
                      </Label>
                      <Input
                        id="identifier"
                        type="text"
                        placeholder="Your email or username"
                        value={form.identifier}
                        onChange={handleChange}
                        className={`p-3 bg-white rounded-xl placeholder:text-xs ${
                          errors.identifier
                            ? "border-stoplight"
                            : "border-silver-medal/70"
                        }`}
                      />
                    </div>

                    <div className="grid w-full items-center gap-3 relative">
                      <Label htmlFor="password" className="text-sm md:text-md">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          value={form.password}
                          onChange={handleChange}
                          className={`p-3 pr-10 bg-white rounded-xl placeholder:text-xs ${
                            errors.password
                              ? "border-stoplight"
                              : "border-silver-medal/70"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center w-full justify-end gap-3">
                      <Link
                        href="/"
                        className="bg-white text-stoplight border-stoplight border px-6 py-2 rounded-xl hover:bg-stoplight hover:text-white hover:border-none disabled:opacity-50"
                      >
                        Guest Login
                      </Link>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-stoplight text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Didn't have an account */}
              <div className="w-full flex justify-center items-center gap-2">
                <p className="text-xs md:text-md font-medium text-foreground text-center font-[family-name:var(--font-geist-mono)]">
                  Didn&apos;t have an account?
                </p>
                <Link
                  href="/register"
                  className="text-sm md:text-md text-neptune-blue font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
