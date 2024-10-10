"use client"

import Link from 'next/link'
import { FC } from 'react'
import { Button } from './ui/button'
import { ThemeToggle } from './Buttons/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu'
import { User2, UserPlus2 } from 'lucide-react'


const Navbar: FC = ({ }) => {
    return (
        <>
    <nav className="flex justify-between items-center py-4 px-20 bg-red-300 ">
        <Link href="/"><p className="font-bold text-3xl text-foreground">Attendify</p></Link>

        {/* For Desktop */}
        <div className="hidden justify-around items-center gap-6 md:flex">
            <Link href="/login"><Button className="text-lg" variant="link">Login</Button></Link>
            <Link href="/sign-up"><Button className="text-lg">Sign Up</Button></Link>
            <ThemeToggle />
        </div>

        {/* For Mobile */}
        <DropdownMenu>
            <DropdownMenuTrigger className='flex flex-col md:hidden gap-1 focus:outline-none'>
                <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
                <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
                <div className="w-8 h-1 rounded bg-foreground md:hidden"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-32 sm:w-40 flex flex-col justify-center'>
                <DropdownMenuLabel className='text-lg text-center'>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User2/><Link href="/login"><Button variant="link">Login</Button></Link></DropdownMenuItem>
                <DropdownMenuItem>
                    <UserPlus2/><Link href="/sign-up"><Button variant="link">Sign Up</Button></Link></DropdownMenuItem>
                <DropdownMenuItem className='flex justify-center'>
                    <ThemeToggle />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </nav>
    <div className="relative">
    <div className="absolute top-0 left-0 w-full ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fca5a5" fill-opacity="1" d="M0,288L80,240C160,192,320,96,480,58.7C640,21,800,43,960,64C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
    </div></div>
    </>
    )
}

export default Navbar