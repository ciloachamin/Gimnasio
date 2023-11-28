'use client';
import { DarkThemeToggle, Navbar, Avatar, Dropdown } from "flowbite-react";
import Image from "next/image";
import AplicationButton from "./AplicationButton";
import NotificationButton from './NotificationButton';
import SearchInput from "./SearchInput";
import { useSidebarContext } from "../context/SidebarContext";
import { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: FC<Record<string, never>> = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();



  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";

    // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800">
      <Navbar fluid>
        {isPageWithSidebar && (
          <button
            aria-controls="sidebar"
            aria-expanded="true"
            className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
            onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
          >
            {isOpenOnSmallScreens ? (
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        )}
        <Navbar.Brand href="/">
          <Image
            alt="Flowbite logo"
            height="24"
            src="/favicon.png"
            width="24"
          />
          <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>




        <div className="flex md:order-2">
          <SearchInput></SearchInput>
        </div>





        <div className="flex md:order-2">
          <Navbar.Toggle />
          <NotificationButton />
          <DarkThemeToggle />
          <AplicationButton></AplicationButton>
          <Dropdown
            arrowIcon={false}
            dismissOnClick={false} 
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded size="md" />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{`${session?.user?.user[2]} ${session?.user?.user[3]}`}</span>
              <span className="block truncate text-sm font-medium">{session?.user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item  >Dashboard</Dropdown.Item>
            <Dropdown.Item >Settings</Dropdown.Item>
            <Dropdown.Item >Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item  onClick={() => handleSignOut()}>Sign out</Dropdown.Item>
          </Dropdown>





        </div>

        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/">About</Navbar.Link>
          <Navbar.Link href="/">Services</Navbar.Link>
          <Navbar.Link href="/">Pricing</Navbar.Link>
          <Navbar.Link href="/">Contact</Navbar.Link>
        </Navbar.Collapse>
















      </Navbar>
    </header>
  );
};

export default Header;
