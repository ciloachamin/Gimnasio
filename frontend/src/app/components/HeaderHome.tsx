import { DarkThemeToggle, Navbar } from "flowbite-react";
import Image from "next/image";
import ButtonAuthHome from "./ButtonAuthHome";
import React, { FC, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import "./Header.css";

const Header: FC<Record<string, never>> = function () {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

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
            className={`w-full  fitness-club absolute top-0 z-20  ${isScrolled ? "bg-white dark:text-white" : "bg-transparent  sm:text-white max-sm:text-white dark:text-white "
                }`}
            data-aos='fade-down' data-aos-delay='50'
        >            <Navbar fluid

            className={` w-full  ${expanded ? "bg-black " : "bg-transparent"


                }`}
        >

                <Navbar.Brand href="/">
                    <Image
                        alt="Flowbite logo"
                        height="24"
                        src="/favicon.png"
                        width="24"
                    />
                    <span
                        className={`self-center whitespace-nowrap px-3 text-xl font-semibold"}`}
                    >
                        Flowbite
                    </span>


                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Navbar.Toggle
                        className="text-white hover:bg-[#647C10]"
                        onClickCapture={handleToggle}

                    />
                    <DarkThemeToggle className="text-white hover:bg-[#647C10]" />

                    <ButtonAuthHome/>



                </div>

                <Navbar.Collapse>
                    <Navbar.Link

                        className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                            }
                        
                        ${expanded ? "max-sm:text-gray-400" : ""


                            }
                        `} href="/" >
                        Home
                    </Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }  ${expanded ? "max-sm:text-gray-400" : ""}
                        `} href="/" >About</Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }
                        ${expanded ? "max-sm:text-gray-400" : ""}
                        `} href="/" >Services</Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }
                        ${expanded ? "max-sm:text-gray-400" : ""}
                        `} href="/" >Pricing</Navbar.Link>
                    <Navbar.Link className={`md:hover:text-[#7F9115] ${isScrolled ? "" : "text-gray-100"
                        }
                        ${expanded ? "max-sm:text-gray-400" : ""}
                        `} href="/" >Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
