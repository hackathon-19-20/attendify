"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./Buttons/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { usePathname , useRouter } from "next/navigation";
import { getCookie, removeCookie } from "@/lib/auth";

interface variantOptions {
  variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

interface navbarOptionType extends variantOptions {
  label: string;
  href: string;
  authRequired?: boolean;
  isLogout?: boolean;
}

const navbarOptions = [
  { label: "Login", href: "/login", variant: "link", authRequired: false },
  { label: "Sign Up", href: "/sign-up", variant: "default", authRequired: false },
  { label: "Dashboard", href: "/dashboard", variant: "link", authRequired: true },
  { label: "Logout", href: "/", variant: "default", authRequired: true, isLogout: true },
] as navbarOptionType[];

const Navbar: FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const checkAuthToken = async () => {
    const token = await getCookie("authToken");
    if(token)
      setAuthToken(token);
  };

  useEffect(() => {
    checkAuthToken();
  }, [pathname]);

  const handleLogout = () => {
    removeCookie("authToken");
    console.log("Signed out");
    router.push("/");
    setAuthToken(null);
  };

  const filteredOptions = navbarOptions.filter((option) => {
    if (option.authRequired && !authToken) return false;
    if (!option.authRequired && authToken) return false;
    return true;
  });

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-20 bg-red-300">
        <Link href="/">
          <p className="font-bold text-3xl text-foreground">Attendify</p>
        </Link>

        {/* Desktop View */}
        <div className="hidden md:flex justify-around items-center gap-6">
          {filteredOptions.map((option) =>
            option.isLogout ? (
              <Link href="/">
                <Button key={option.label} className="text-lg" onClick={handleLogout}>
                  {option.label}
                </Button>
              </Link>
            ) : (
              <NavLink key={option.label} href={option.href} text={option.label} variant={option.variant!} />
            )
          )}
          {/* <ThemeToggle /> */}
        </div>

        {/* Mobile View */}
        <MobileMenu authToken={authToken} handleLogout={handleLogout} options={filteredOptions} />
      </nav>

      <SVGWave />
    </>
  );
};

const NavLink: FC<{ href: string; text: string; variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined }> = ({ href, text, variant }) => (
  <Link href={href}>
    <Button className={`text-lg`} variant={variant!}>
      {text}
    </Button>
  </Link>
);

const MobileMenu: FC<{ authToken: string | null; handleLogout: () => void; options: any[] }> = ({ authToken, handleLogout, options }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex flex-col md:hidden gap-1 focus:outline-none">
      <MenuIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-32 sm:w-40 flex flex-col justify-center items-center">
      <DropdownMenuLabel className="text-lg text-center">Menu</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {options.map((option) =>
        option.isLogout ? (
          <DropdownMenuItem key={option.label}>
            <Link href="/">
              <Button onClick={handleLogout}>{option.label}</Button>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem key={option.label}>
            <NavLink href={option.href} text={option.label} variant={option.variant} />
          </DropdownMenuItem>
        )
      )}

      <DropdownMenuItem className="flex justify-center">
        {/* <ThemeToggle /> */}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SVGWave = () => {
  const pathname = usePathname();
  const [isWave, setIsWave] = useState(true);

  useEffect(() => {
    if (pathname === "/dashboard" || pathname === "/attendance") {
      setIsWave(false);
    } else {
      setIsWave(true);
    }
  }, [pathname]);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full transition-all duration-500">
        {isWave ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fca5a5" fillOpacity="1" d="M0,288L80,240C160,192,320,96,480,58.7C640,21,800,43,960,64C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        ) : (
          <div
            style={{
              width: "100%",
              height: "30px", 
              backgroundColor: "#fca5a5",
              transition: "height 1s ease",
            }}
          />
        )}
      </div>
    </div>
  );
};

const MenuIcon = () => (
  <>
    <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
    <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
    <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
  </>
);

export default Navbar;
