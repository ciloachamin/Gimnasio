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



function BreadcrumbExample(): JSX.Element {
    return (
        <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="#" icon={HiHome}>
                Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
            <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
        </Breadcrumb>
    );
}

function ButtonsExample(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button outline gradientDuoTone="purpleToBlue">
                Purple to blue
            </Button>
            <Button outline gradientDuoTone="cyanToBlue">
                Cyan to blue
            </Button>
            <Button outline gradientDuoTone="greenToBlue">
                Green to blue
            </Button>
            <Button outline gradientDuoTone="purpleToPink">
                Purple to pink
            </Button>
            <Button outline gradientDuoTone="pinkToOrange">
                Pink to orange
            </Button>
            <Button outline gradientDuoTone="tealToLime">
                Teal to lime
            </Button>
            <Button outline gradientDuoTone="redToYellow">
                Red to yellow
            </Button>
        </div>
    );
}

function ButtonGroupExample(): JSX.Element {
    return (
        <Button.Group>
            <Button color="gray">
                <HiUserCircle className="mr-3 h-4 w-4" /> Profile
            </Button>
            <Button color="gray">
                <HiAdjustments className="mr-3 h-4 w-4" /> Settings
            </Button>
            <Button color="gray">
                <HiCloudDownload className="mr-3 h-4 w-4" /> Messages
            </Button>
        </Button.Group>
    );
}

function CardExample(): JSX.Element {
    return (
        <div className="max-w-sm">
            <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so
                    far, in reverse chronological order.
                </p>
            </Card>
        </div>
    );
}

function CarouselExample(): JSX.Element {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                />
            </Carousel>
        </div>
    );
}

function DropdownExample(): JSX.Element {
    return (
        <Dropdown label="Dropdown button">
            <Dropdown.Header>
                <span className="block text-sm">Bonnie success</span>
                <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
    );
}

function FormsExample(): JSX.Element {
    return (
        <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput
                    id="email1"
                    type="email"
                    placeholder="name@flowbite.com"
                    required
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
}

function FooterExample(): JSX.Element {
    return (
        <Footer container>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <Footer.Brand
                            href="https://flowbite.com"
                            src="https://flowbite.com/docs/images/logo.svg"
                            alt="Flowbite Logo"
                            name="Flowbite"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Flowbite</Footer.Link>
                                <Footer.Link href="#">Tailwind CSS</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Github</Footer.Link>
                                <Footer.Link href="#">Discord</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Privacy Policy</Footer.Link>
                                <Footer.Link href="#">Terms & Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Flowbite™" year={2022} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                        <Footer.Icon href="#" icon={BsGithub} />
                        <Footer.Icon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}

function ListGroupExample(): JSX.Element {
    return (
        <div className="w-48">
            <ListGroup>
                <ListGroup.Item active icon={HiUserCircle}>
                    Profile
                </ListGroup.Item>
                <ListGroup.Item icon={HiOutlineAdjustments}>Settings</ListGroup.Item>
                <ListGroup.Item icon={HiInbox}>Messages</ListGroup.Item>
                <ListGroup.Item icon={HiCloudDownload}>Download</ListGroup.Item>
            </ListGroup>
        </div>
    );
}

function ModalExample(): JSX.Element {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Toggle modal</Button>
            <Modal show={isOpen} onClose={() => setOpen(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new
                            consumer privacy laws for its citizens, companies around the world
                            are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.)
                            goes into effect on May 25 and is meant to ensure a common set of
                            data rights in the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data breaches that
                            could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpen(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpen(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function NavbarsExample(): JSX.Element {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite.com/">
                <Image
                    alt="Flowbite logo"
                    height="0"
                    src="https://flowbite.com/docs/images/logo.svg"
                    width="0"
                    style={{ width: '100%', height: 'auto' }}

                />
                <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold dark:text-white">
                    Flowbite
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/navbars" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">About</Navbar.Link>
                <Navbar.Link href="/navbars">Services</Navbar.Link>
                <Navbar.Link href="/navbars">Pricing</Navbar.Link>
                <Navbar.Link href="/navbars">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

function PaginationExample(): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex items-center justify-center text-center">
            <Pagination
                currentPage={currentPage}
                layout="table"
                onPageChange={(page: number) => setCurrentPage(page)}
                showIcons
                totalPages={1000}
            />
        </div>
    );
}

function ProgressExample(): JSX.Element {
    return (
        <Progress
            progress={45}
            label="Flowbite"
            labelPosition="outside"
            labelProgress
        />
    );
}

function RatingExample(): JSX.Element {
    return (
        <div className="flex flex-col justify-center gap-4">
            <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                </p>
            </Rating>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                1,745 global ratings
            </p>
            <Rating.Advanced percentFilled={70}>5 star</Rating.Advanced>
            <Rating.Advanced percentFilled={17}>4 star</Rating.Advanced>
            <Rating.Advanced percentFilled={8}>3 star</Rating.Advanced>
            <Rating.Advanced percentFilled={4}>2 star</Rating.Advanced>
            <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
        </div>
    );
}

function SidebarExample(): JSX.Element {
    const [isOpen, setOpen] = useState(false);

    function toggle() {
        setOpen(!isOpen);
    }

    return (
        <>
            <Button color="warning" onClick={toggle}>
                Toggle sidebar
            </Button>
            <div className="my-6 h-96">
                <FlowbiteSidebar aria-label="Example sidebar" collapsed={isOpen}>
                    <FlowbiteSidebar.Items>
                        <FlowbiteSidebar.ItemGroup>
                            <FlowbiteSidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </FlowbiteSidebar.Item>
                            <FlowbiteSidebar.Item
                                href="#"
                                icon={HiViewBoards}
                                label="Pro"
                                labelColor="gray"
                            >
                                Kanban
                            </FlowbiteSidebar.Item>
                            <FlowbiteSidebar.Item href="#" icon={HiInbox} label="3">
                                Inbox
                            </FlowbiteSidebar.Item>
                            <FlowbiteSidebar.Item href="#" icon={HiUser}>
                                Users
                            </FlowbiteSidebar.Item>
                            <FlowbiteSidebar.Item href="#" icon={HiShoppingBag}>
                                Products
                            </FlowbiteSidebar.Item>
                            <FlowbiteSidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </FlowbiteSidebar.Item>
                            <FlowbiteSidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </FlowbiteSidebar.Item>
                        </FlowbiteSidebar.ItemGroup>
                    </FlowbiteSidebar.Items>
                </FlowbiteSidebar>
            </div>
        </>
    );
}

function SpinnersExample(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-2">
            <Spinner color="info" aria-label="info spinner example" />
            <Spinner color="success" aria-label="success spinner example" />
            <Spinner color="failure" aria-label="failure spinner example" />
            <Spinner color="warning" aria-label="Yellow spinner example" />
            <Spinner color="pink" aria-label="Pink spinner example" />
            <Spinner color="purple" aria-label="Purple spinner example" />
        </div>
    );
}

function TablesExample(): JSX.Element {
    return (
        <Table striped>
            <Table.Head>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Apple MacBook Pro 17&quot;
                    </Table.Cell>
                    <Table.Cell>Sliver</Table.Cell>
                    <Table.Cell>Laptop</Table.Cell>
                    <Table.Cell>$2999</Table.Cell>
                    <Table.Cell>
                        <a
                            href="/tables"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Edit
                        </a>
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Microsoft Surface Pro
                    </Table.Cell>
                    <Table.Cell>White</Table.Cell>
                    <Table.Cell>Laptop PC</Table.Cell>
                    <Table.Cell>$1999</Table.Cell>
                    <Table.Cell>
                        <a
                            href="/tables"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Edit
                        </a>
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Magic Mouse 2
                    </Table.Cell>
                    <Table.Cell>Black</Table.Cell>
                    <Table.Cell>Accessories</Table.Cell>
                    <Table.Cell>$99</Table.Cell>
                    <Table.Cell>
                        <a
                            href="/tables"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Edit
                        </a>
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Google Pixel Phone
                    </Table.Cell>
                    <Table.Cell>Gray</Table.Cell>
                    <Table.Cell>Phone</Table.Cell>
                    <Table.Cell>$799</Table.Cell>
                    <Table.Cell>
                        <a
                            href="/tables"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Edit
                        </a>
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Apple Watch 5
                    </Table.Cell>
                    <Table.Cell>failure</Table.Cell>
                    <Table.Cell>Wearables</Table.Cell>
                    <Table.Cell>$999</Table.Cell>
                    <Table.Cell>
                        <a
                            href="/tables"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Edit
                        </a>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

function TabsExample(): JSX.Element {
    return (
        <Tabs.Group aria-label="Tabs with icons" style="underline">
            <Tabs.Item title="Profile" icon={HiUserCircle}>
                Profile content
            </Tabs.Item>
            <Tabs.Item active title="Dashboard" icon={HiDatabase}>
                Dashboard content
            </Tabs.Item>
            <Tabs.Item title="Settings" icon={HiAdjustments}>
                Settings content
            </Tabs.Item>
            <Tabs.Item title="Contacts" icon={HiClipboardList}>
                Contacts content
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
                Disabled content
            </Tabs.Item>
        </Tabs.Group>
    );
}

function TimelineExample(): JSX.Element {
    return (
        <Timeline>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time>February 2022</Timeline.Time>
                    <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                    <Timeline.Body>
                        Get access to over 20+ pages including a dashboard layout, charts,
                        kanban board, calendar, and pre-order E-commerce & Marketing pages.
                    </Timeline.Body>
                    <Button color="gray">
                        Learn More
                        <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                    </Button>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time>March 2022</Timeline.Time>
                    <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                    <Timeline.Body>
                        All of the pages and components are first designed in Figma and we
                        keep a parity between the two versions even as we update the
                        project.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time>April 2022</Timeline.Time>
                    <Timeline.Title>E-Commerce UI code in Tailwind CSS</Timeline.Title>
                    <Timeline.Body>
                        Get started with dozens of web components and interactive elements
                        built on top of Tailwind CSS.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
    );
}

function ToastExample(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
                <Toast.Toggle />
            </Toast>
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
                <Toast.Toggle />
            </Toast>
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <HiExclamation className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                    Improve password difficulty.
                </div>
                <Toast.Toggle />
            </Toast>
        </div>
    );
}

function TooltipsExample(): JSX.Element {
    return (
        <div className="flex gap-2">
            <Tooltip content="Tooltip content" placement="top">
                <Button>Tooltip top</Button>
            </Tooltip>
            <Tooltip content="Tooltip content" placement="right">
                <Button>Tooltip right</Button>
            </Tooltip>
            <Tooltip content="Tooltip content" placement="bottom">
                <Button>Tooltip bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip content" placement="left">
                <Button>Tooltip left</Button>
            </Tooltip>
        </div>
    );
}