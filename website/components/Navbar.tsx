"use client"

import Link from 'next/link'
import { FC } from 'react'
import { Button } from './ui/button'
import { ThemeToggle } from './Buttons/ThemeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu'
import { User2, UserPlus2 } from 'lucide-react'


const Navbar: FC = ({ }) => {
    return (<nav className="flex justify-between items-center py-4 px-20">
        <Link href="/"><p className="font-bold text-3xl">Attendify</p></Link>

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
    </nav>)
}

export default Navbar