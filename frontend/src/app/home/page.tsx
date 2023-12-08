"use client";

import {
    Accordion,
    Alert,
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Carousel,
    Checkbox,
    Dropdown,
    Footer,
    Label,
    ListGroup,
    Modal,
    Navbar,
    Pagination,
    Progress,
    Rating,
    Sidebar as FlowbiteSidebar,
    Spinner,
    Table,
    Tabs,
    TextInput,
    Timeline,
    Toast,
    Tooltip,
} from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
} from "react-icons/bs";
import {
    HiAdjustments,
    HiArrowNarrowRight,
    HiArrowSmRight,
    HiChartPie,
    HiCheck,
    HiClipboardList,
    HiCloudDownload,
    HiDatabase,
    HiExclamation,
    HiEye,
    HiHome,
    HiInbox,
    HiOutlineAdjustments,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiUserCircle,
    HiViewBoards,
    HiX,
} from "react-icons/hi";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import ButtonAuth from "../components/ButtonAuth";
import Place from "../components/Place";
import PlaceStatus from "../components/PlaceState";
import PlaceRead from "../components/PlaceRead";
import UserRead from "../components/UserRead";

import { BsCollectionFill } from "react-icons/bs";
import { RiHome2Fill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";


export default function Index(): JSX.Element {
    return (
        <SidebarProvider>
            <Header />
            <div className="flex dark:bg-gray-900">
                <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
                    <HomePage />
                </main>
                <div className="order-1">
                    <ActualSidebar />
                </div>
            </div>
        </SidebarProvider>
    );
}

function ActualSidebar(): JSX.Element {
    return (
        <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={RiHome2Fill}>
                        Home
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={BsCollectionFill} label="Lugares">
                        <Sidebar.Item href="#">Agregar</Sidebar.Item>
                        <Sidebar.Item href="/crud/user">Mostrar</Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={RiMoneyDollarCircleFill} label="Caja">
                        <Sidebar.Item href="#">Dashboard</Sidebar.Item>
                        <Sidebar.Item href="/crud/user">Mostrar</Sidebar.Item>
                    </Sidebar.Collapse>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/authentication/log-in/page" icon={HiChartPie}>
                        Upgrade to Pro
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        Documentation
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

function HomePage(): JSX.Element {


    
    return (
        <div className="p-6">
            <section>
                <header>
                    <h1 className="mb-6 text-5xl font-extrabold dark:text-white">
                        Bienvenidos al   <code>sistema</code> de <code>administración</code>!
                    </h1>
                </header>
            </section>
            <section>
                <PlaceRead />
            </section>

        </div>
    );
}
