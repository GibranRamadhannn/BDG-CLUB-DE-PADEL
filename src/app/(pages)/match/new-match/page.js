import FormNewMatch from "@/app/components/new-match/form";
import { CircleArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function NewMatchPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen font-[family-name:var(--font-montserrat)] px-4 bg-mercury">
      {/* Back to match page */}
      <div className="pt-32 mb-8 mx-6 w-full font-[family-name:var(--font-geist-mono)]">
        <Link
          href="/match"
          className="text-foreground text-md font-semibold hover:text-stoplight flex items-center gap-3 transition-colors duration-200 ease-in-out"
        >
          <CircleArrowLeftIcon size={16} /> Back to match page
        </Link>
      </div>

      {/* Title */}
      <div className="mb-7 mx-6 w-full">
        <h1 className="md:text-4xl text-3xl text-black font-bold font-[family-name:var(--font-roboto)]">
          NEW PADEL <span className="text-stoplight">MATCH</span>
        </h1>
      </div>

      {/* New Matches */}
      <div className="flex justify-center items-start w-full bg-white">
        <div className="p-5 w-full">
          <FormNewMatch />
        </div>
      </div>
    </div>
  );
}
