'use client';

import {LayoutDashboard , UserRoundCheck, CalendarFold} from "lucide-react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from "react";

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'Timetable',
    href: '/dashboard/timetable',
    icon: CalendarFold,
  },
  { name: 'Attendance', href: '/dashboard/attendance', icon: UserRoundCheck },
];



export default function NavLinks() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const pathName = usePathname();

  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  useEffect(() => {
    checkAuthToken();
  }, [pathName]);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-rose-200': pathName === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
