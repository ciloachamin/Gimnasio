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
    HiChevronLeft,
    HiChevronRight,
    HiCog,
    HiDocumentDownload,
    HiDotsVertical,
    HiExclamationCircle,
    HiOutlineExclamationCircle,
    HiOutlinePencilAlt,
    HiPlus,
    HiTrash,
} from "react-icons/hi";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { SidebarProvider } from "../../context/SidebarContext";
import ButtonAuth from "../../components/ButtonAuth";
import Place from "../../components/Place";
import PlaceStatus from "../../components/PlaceState";
import PlaceRead from "../../components/PlaceRead";
import UserRead from "../../components/UserRead";
import UserCreate from "../../components/UserCreate";

export default function Index(): JSX.Element {
    return (
        <SidebarProvider>
            <Header />
            <div className="flex dark:bg-gray-900">
                <main className="order-2">
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
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        Kanban
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiShoppingBag} label="CRUD">
                        <Sidebar.Item href="#">Products</Sidebar.Item>
                        <Sidebar.Item href="/crud/user">Users</Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Item href="#" icon={HiInbox}>
                        Inbox
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        Products
                    </Sidebar.Item>
                    <Sidebar.Item href="/" icon={HiArrowSmRight}>
                        Sign In
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable}>
                        Sign Up
                    </Sidebar.Item>
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

    const hasPlaces = false
    const onCreatePlace = () => {
        // Tu lógica para agregar lugares
    };

    return (
        <div>
            <UserListPage></UserListPage>
        </div>
    );
}

function UserListPage(): JSX.Element {

    const handleUserCreate = () => {
        // Lógica para actualizar la lista de usuarios después de la creació
        console.log('User created successfully!');
    };



    return (
        <div>
            <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="#">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Home</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            All users
                        </h1>
                    </div>
                    <div className="sm:flex">
                        <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                            <form className="lg:pr-3">
                                <Label htmlFor="users-search" className="sr-only">
                                    Search
                                </Label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <TextInput
                                        id="users-search"
                                        name="users-search"
                                        placeholder="Search for users"
                                    />
                                </div>
                            </form>
                            <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                                <a
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Configure</span>
                                    <HiCog className="text-2xl" />
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Delete</span>
                                    <HiTrash className="text-2xl" />
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Purge</span>
                                    <HiExclamationCircle className="text-2xl" />
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Settings</span>
                                    <HiDotsVertical className="text-2xl" />
                                </a>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                            <UserCreate onCreate={handleUserCreate}></UserCreate>
                            <Button color="gray">
                                <div className="flex items-center gap-x-3">
                                    <HiDocumentDownload className="text-xl" />
                                    <span>Export</span>
                                </div>
                            </Button>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            {/* Reemplaza AllUsersTable con tu componente real */}
                            {/* <AllUsersTable /> */}
                            <UserRead />

                        </div>
                    </div>
                </div>
            </div>
            {/* Reemplaza Pagination con tu componente real */}
            {/* <Pagination /> */}

        </div>
    );
};

