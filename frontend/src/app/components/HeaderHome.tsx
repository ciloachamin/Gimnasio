import { DarkThemeToggle, Navbar, Avatar, Dropdown, Button, } from "flowbite-react";
import Image from "next/image";
import AplicationButton from "./AplicationButton";
import NotificationButton from './NotificationButton';
import SearchInput from "./SearchInput";
import { useSidebarContext } from "../context/SidebarContext";
import React, { FC, useState, useEffect } from "react";


import "./Header.css";
import ButtonAuth from "./ButtonAuth";

const Header: FC<Record<string, never>> = function () {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Cambia 100 por la cantidad de desplazamiento que desees antes de aplicar el cambio
            setIsScrolled(scrollPosition > 100);
        };

        window.addEventListener("scroll", handleScroll);

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`w-full flex justify-between items-center fitness-club fixed top-0 z-20  ${isScrolled ? "bg-white" : "bg-transparent"
                }`}
        >            <Navbar fluid className="w-full bg-transparent" >

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
                    <Button  className='bg-[#7F9115] text-white rounded hover:bg-[#647C10]'>
                        Purple to blue
                    </Button>


                </div>

                <Navbar.Collapse >
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }`} href="/" >
                        Home
                    </Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }`} href="/" >About</Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }`} href="/" >Services</Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }`} href="/" >Pricing</Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }`} href="/" >Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
