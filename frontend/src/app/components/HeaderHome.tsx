import { DarkThemeToggle, Navbar, Avatar, Dropdown, Button, } from "flowbite-react";
import Image from "next/image";
import AplicationButton from "./AplicationButton";
import NotificationButton from './NotificationButton';
import SearchInput from "./SearchInput";
import { useSidebarContext } from "../context/SidebarContext";
import { FC } from "react";

import "./Header.css";
import ButtonAuth from "./ButtonAuth";

const Header: FC<Record<string, never>> = function () {
    return (
        <header className=" fitness-club sticky top-0 z-20 bg-white dark:bg-gray-800">
            <Navbar fluid  className="bg-transparent">

                <Navbar.Brand href="/">
                    <Image
                        alt="Flowbite logo"
                        height="24"
                        src="/favicon.png"
                        width="24"
                    />
                    <span className=" self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
                        Flowbite
                    </span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Navbar.Toggle />
                    <DarkThemeToggle />
                    <Button>
                        Purple to blue
                    </Button>


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
