"use client";

import { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import { Button, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';



const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

import {
    HiArrowSmRight,
    HiChartPie,
    HiShoppingBag,
    HiTable,
    HiInbox,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";

import Header from "../../components/headerPlace";
import Sidebar from "../../components/sidebar";
import { SidebarProvider } from "../../context/SidebarContext";
import Profile from '../Profile';





interface Place {
    pla_id: number;
    pla_name: string;
    pla_location: string;
    pla_schedule: string;
    pla_classSchedule: string;
    pla_type: string;
}

export function useFetchPlace(): { place: Place | null; isLoading: boolean } {
    const params = useParams();
    const id = params['id'];
    const [place, setPlace] = useState<Place | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { data: session, status } = useSession();

    const fetchData = async () => {
        try {
            const placesRes = await fetch(`${backendUrl}/place/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${session?.user?.token}`,
                },
            });
            const data = await placesRes.json();
            setPlace(data[0]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setPlace(null);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            fetchData();
        }
    }, [status]);

    return { place, isLoading };
}



function AccordionExample2(): JSX.Element {
    const { place, isLoading } = useFetchPlace();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!place) {
        return <div>No se encontraron datos para el ID de lugar especificado.</div>;
    }

    return (
        <div>
            <h2>{place.pla_id}</h2>
            {/* Resto de la presentación de los datos del lugar */}
        </div>
    );
}










export default function Index(): JSX.Element {
    const { place, isLoading } = useFetchPlace();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!place) {
        return <div>No se encontraron datos para el ID de lugar especificado.</div>;
    }
    return (
        <SidebarProvider>
            <Header place={place} />
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
    const params = useParams();
    const id = params['id'];
    console.log(id);
    return (
        <div className="p-6">
            <section>
                <header>

                </header>
                <Profile id={id}></Profile>
            </section>
        </div>

            );
}
