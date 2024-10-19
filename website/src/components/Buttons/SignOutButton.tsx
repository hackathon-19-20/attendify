"use client"
 
import { useState, useEffect } from "react";
import { PowerIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation"; 

export default function SignOutButton() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const pathName = usePathname();
  const router = useRouter(); 

  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    console.log("Signed out");
    router.push("/"); 
  };

  useEffect(() => {
    checkAuthToken();
  }, [pathName]);

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
