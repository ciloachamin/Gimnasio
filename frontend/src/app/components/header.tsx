import { DarkThemeToggle, Navbar, Avatar, Dropdown, } from "flowbite-react";
import Image from "next/image";
import AplicationButton from "./AplicationButton";
import NotificationButton from './NotificationButton';
import SearchInput from "./SearchInput";
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


     

        <div className="flex md:order-2">
        <SearchInput></SearchInput>
        </div>





        <div className="flex md:order-2">
  
          <NotificationButton />
          <DarkThemeToggle />
          <AplicationButton></AplicationButton>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded  size="md"/>
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



    












      </Navbar>
    </header>
  );
};

export default Header;
