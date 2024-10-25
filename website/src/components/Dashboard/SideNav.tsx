import Link from 'next/link';
import NavLinks from './NavLinks';
import SignOutButton from '../Buttons/SignOutButton';

export default function SideNav() {

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 relative">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-300 p-4 md:h-40"
        href="/"
      >
        <p className="font-bold text-3xl text-foreground">Attendify</p>
      </Link>

      <div className="hidden md:flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          <SignOutButton />
        </div>
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between shadow-lg md:hidden z-10 border-t-2 ">
        {/* Add the navigation links and sign-out button in mobile view */}
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
