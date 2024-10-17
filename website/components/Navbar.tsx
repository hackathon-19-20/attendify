"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./Buttons/ThemeToggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";

// Define the navbar structure
interface variantOptions {
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}
interface navbarOptionType extends variantOptions {
    label: string;
    href: string;
    authRequired?: boolean;
    isLogout?: boolean;
};

const navbarOptions = [
    { label: "Login", href: "/login", variant: "link", authRequired: false },
    { label: "Sign Up", href: "/sign-up", variant: "default", authRequired: false },
    { label: "Dashboard", href: "/dashboard", variant: "link", authRequired: true },
    { label: "Logout", href: "/", variant: "default", authRequired: true, isLogout: true }
] as navbarOptionType[];

const Navbar: FC = () => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const pathname = usePathname();

    // Function to check for authToken
    const checkAuthToken = () => {
        const token = localStorage.getItem("authToken");
        setAuthToken(token);
    };

    // Effect to run when the component mounts or when pathname changes
    useEffect(() => {
        checkAuthToken();
    }, [pathname]);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setAuthToken(null);
    };

    // Filtered menu options based on authentication status
    const filteredOptions = navbarOptions.filter(option => {
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
                    {filteredOptions.map(option =>
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
                    <ThemeToggle />
                </div>

                {/* Mobile View */}
                <MobileMenu authToken={authToken} handleLogout={handleLogout} options={filteredOptions} />
            </nav>

            <SVGWave />
        </>
    );
};

// Reusable NavLink component that accepts variants
const NavLink: FC<{ href: string; text: string; variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined; }> = ({ href, text, variant }) => (
    <Link href={href}>
        <Button className={`text-lg`} variant={variant!}>
            {text}
        </Button>
    </Link>
);

// MobileMenu as a separate component
const MobileMenu: FC<{ authToken: string | null; handleLogout: () => void; options: any[] }> = ({ authToken, handleLogout, options }) => (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-col md:hidden gap-1 focus:outline-none">
            <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 sm:w-40 flex flex-col justify-center items-center">
            <DropdownMenuLabel className="text-lg text-center">Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {options.map(option =>
                option.isLogout ? (
                    <DropdownMenuItem key={option.label}>
                        <Link href="/"><Button onClick={handleLogout}>{option.label}</Button></Link>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem key={option.label}>
                        <NavLink href={option.href} text={option.label} variant={option.variant} />
                    </DropdownMenuItem>
                )
            )}

            <DropdownMenuItem className="flex justify-center">
                <ThemeToggle />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

// Separate SVGWave component
const SVGWave = () => (
    <div className="relative">
        <div className="absolute top-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fca5a5" fillOpacity="1" d="M0,288L80,240C160,192,320,96,480,58.7C640,21,800,43,960,64C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
        </div>
    </div>
);

// Separate menu icon for mobile
const MenuIcon = () => (
    <>
        <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
        <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
        <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
    </>
);

export default Navbar;
