// pages/profile/[id].tsx
"use client";
import { Button, Table, Card, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import UserRead from "../components/UserRead";
import { FC, use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaUserEdit } from "react-icons/fa";
import { IoFingerPrint, IoSpeedometerOutline } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { SiContactlesspayment } from "react-icons/si";
import { MdContactless } from "react-icons/md";
import UserEditModal from '@/app/components/UserEdit'
import { TfiReload } from "react-icons/tfi";
import UserNFCModal from '../components/UserNFC';
import { MemberInfo } from 'member-info';
import { FaRegAddressCard } from "react-icons/fa";
import TableAsis from './TableAsis';
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];


interface ProfileProps {
  id: string | string[] | undefined;
  place: number | number[] | undefined;
}

const Profile: React.FC<ProfileProps> = ({ id, place }) => {
  const { data: session, status } = useSession();
  const [memberships, setMemberships] = useState([]);
  const [memberInfo, setMemberInfo] = useState({} as MemberInfo);


  const fetchMemberships = async () => {
    if (status === "loading" || !session) {
      return;
    }

    try {
      const membershipRes = await fetch(`${backendUrl}/membership-by-member/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${session?.user?.token}`,
        },
      });
      if (!membershipRes.ok) {
        throw new Error('Error al obtener membresías');
      }
      const membershipsData = await membershipRes.json();
      console.log(membershipsData);
      setMemberships(membershipsData);
    } catch (error) {
      console.error('Error fetching memberships:', error);
    }
  };


  const fetchMemberInfo = async () => {
    if (status === "loading" || !session) {
      // La sesión aún se está cargando o el usuario no está autenticado
      return;
    }
    try {
      const fetchMemberInfoRes = await fetch(`${backendUrl}/member-info/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${session?.user?.token}`,
        },
      });
      if (!fetchMemberInfoRes.ok) {
        throw new Error('Error al obtener la informacion');
      }
      const fetchMemberInfoData = await fetchMemberInfoRes.json();
      console.log(fetchMemberInfoData)
      setMemberInfo(fetchMemberInfoData);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleRefreshMemberInfo = async () => {
    await fetchMemberInfo();
  };


  useEffect(() => {
    fetchMemberships();
    fetchMemberInfo();
  }, [session, status]);

  return (
    <div >
      <div className="grid grid-cols-1 px-4 pt-6">

        <div className="col-span-full xl:col-auto">

          <div className="p-4  bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div
              onClick={handleRefreshMemberInfo}
              className="absolute max-sm:relative mb-3 px-3 py-2 text-md font-medium   rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2"
            >
              <TfiReload />
            </div>
            <h1 className="mb-6 text-3xl font-extrabold dark:text-white items-center justify-center flex">
              <code>Ultima membresia del usuario </code>
            </h1>

            <div className="items-center   sm:space-x-4 xl:space-x-4 2xl:space-x-4 justify-between ">
              <div className="grid grid-cols-2 gap-4  max-lg:grid-cols-1">
                <div className="items-center sm:flex xl:flex 2xl:flex sm:space-x-4 xl:space-x-4 2xl:space-x-4 justify-c ">
                  <Image
                    alt="Flowbite logo"
                    height="150"
                    src="/assets/img/community/img1.png"
                    width="150"
                  />
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                      {`${memberInfo.mem_name} ${memberInfo.mem_lastname}`}
                    </h3>
                    <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                      <span className="font-bold">ID:</span> {`${memberInfo.mem_id}`}
                    </div>
                    <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Codigo:</span> {`${memberInfo.mem_code}`}
                    </div>
                    <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Email:</span> {`${memberInfo.mem_email}`}
                    </div>
                    <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Telefono:</span> {`${memberInfo.mem_phone}`}
                    </div>
                    <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Email:</span> {`${memberInfo.mem_email}`}
                    </div>
                    {/* <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Membrecia:</span> {`${memberInfo.membership_name}`}
                  </div> */}
                  </div>
                </div>
                <Card className="w-full">
                  <div className="flex justify-end px-4 pt-4">
                    <Dropdown inline label="">
                      <Dropdown.Item>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Export Data
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Delete
                        </a>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                  <div className="flex flex-col items-center pb-10">
                  <h2 className="mb-6 text-3xl font-extrabold dark:text-white items-center justify-center flex">
                      <code>Membresia</code>
                    </h2>
                    <FaRegAddressCard size={100} />

                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`${memberInfo.membership_name}`} </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400"> <b>Inicio</b> {`${memberInfo.mbs_start_date}`} - <b>Fin</b> {`${memberInfo.mbs_due_date}`}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400"> <b>Descripcion</b> {`${memberInfo.pro_description}`}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400"><b>Beneficios</b> {`${memberInfo.pro_benefits}`}</span>

                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <div
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        <b>Precio: </b> {`${memberInfo.pro_cost}`}
                      </div>
                      <div
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        <b>Duración: </b> {` ${memberInfo.pro_duration} dias`}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 px-4 pt-6 gap-2">

        <div className="col-span-full xl:col-auto">
          <div className="p-4  bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h1 className="mb-6 text-3xl font-extrabold dark:text-white items-center  flex">
              <code>Todas las membresias</code>
            </h1>

            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                  <TableAsis memberships={memberships} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


  );
};

export default Profile;