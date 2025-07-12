"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GroupsContent from "./GroupsContent";
import BracketContent from "./BracketContent";

export default function DrawsContent({ tournament }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleManageClick = () => {
    router.push(`/tournament/${tournament.id}/manage`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Tab Content */}
      {/* <div className="flex justify-between items-center w-full mb-12">
        {session && (
          <button
            onClick={handleManageClick}
            className="bg-stoplight text-white px-6 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            Manage
          </button>
        )}
      </div> */}

      {/* Contents */}
      <div className="p-2 w-full">
        {/* Group Card */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <GroupsContent />
        </div>

        {/* Bracket View */}
        {/* <BracketContent /> */}
      </div>
    </div>
  );
}
