"use client"

import { PowerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/lib/cookiesServer";

export default function SignOutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("authToken");
    console.log("Signed out");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-100 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}
