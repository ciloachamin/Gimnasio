import { DarkThemeToggle, Navbar, Avatar, Dropdown, } from "flowbite-react";
import Image from "next/image";
import AplicationButton from "./AplicationButton";
import NotificationButton from './NotificationButton';
import { FC } from "react";

const Header: FC<Record<string, never>> = function () {

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800">
      <Navbar fluid>
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


        <form action="#" method="GET" className="hidden lg:block lg:pl-3.5">
          <label htmlFor="topbar-search" className="sr-only">Search</label>
          <div className="relative mt-1 lg:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
          </div>
        </form>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        


        <div className="flex md:order-2">
          <Navbar.Toggle />
          <NotificationButton />
          <DarkThemeToggle />
          <AplicationButton></AplicationButton>

        </div>



    












      </Navbar>
    </header>
  );
};

export default Header;
