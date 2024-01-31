// pages/profile/[id].tsx
"use client";
import Layout from './Layout';
import { Button, Table } from 'flowbite-react';
import Image from 'next/image';
import UserRead from "../components/UserRead";
import TableAsis from "./TableAsis";
import TableMem from "./TableMem";
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


const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];


interface ProfileProps {
  id: string | string[] | undefined;
  place: number | number[] | undefined;
}

const Profile: React.FC<ProfileProps> = ({ id, place }) => {
  const { data: session, status } = useSession();
  const [attendance, setAttendance] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);


  const fetchPlaces = async () => {
    if (status === "loading" || !session) {
      return;
    }

    try {
      const attendanceRes = await fetch(`${backendUrl}/attendance-member/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${session?.user?.token}`,
        },
      });
      if (!attendanceRes.ok) {
        throw new Error('Error al obtener lugares');
      }
      const attendancesData = await attendanceRes.json();
      setAttendance(attendancesData);
    } catch (error) {
      console.error('Error fetching places:', error);
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
    fetchPlaces();
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
              <code>Perfil del usuario </code>
            </h1>

            <div className="items-center sm:flex xl:flex 2xl:flex sm:space-x-4 xl:space-x-4 2xl:space-x-4 justify-between ">
              <div className="items-center sm:flex xl:flex 2xl:flex sm:space-x-4 xl:space-x-4 2xl:space-x-4 justify-between  ">
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
                  <div className="mb-3 text-md text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Membrecia:</span> {`${memberInfo.membership_name}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 ">
                <div className="col-span-full xl:col-auto w-full md:w-[200px] lg:w-[200px] xl:w-[250px]">
                  <div className=" bg-white border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700  dark:bg-gray-800">
                    <ul className=''>
                      <li>
                        <div className="inline-flex items-center w-full">

                          <UserEditModal user={memberInfo} place={place} />
                        </div>
                      </li>
                      <li>
                        <div className="inline-flex items-center w-full">
                          <a href="#" className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                            <IoFingerPrint size={25} />Registrar Huella</a>
                        </div>
                      </li>                      <li>
                        <div className="inline-flex items-center w-full">
                          <a href="#" className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                            <FaAddressBook size={25} />Reservas</a>
                        </div>
                      </li>                      <li>
                        <div className="inline-flex items-center w-full">
                          <a href="#" className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                            <BsCashCoin size={25} />Pagos</a>
                        </div>
                      </li>                      <li>
                        <div className="inline-flex items-center w-full">
                          <a href="#" className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                            <MdContactless size={25} />NFC</a>
                        </div>
                      </li>                      <li>
                        <div className="inline-flex items-center w-full">
                          <a href="#" className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                            <IoSpeedometerOutline size={25} />Rutina</a>
                        </div>
                      </li>                      <li>
                        <div className="inline-flex items-center w-full">
                          <a href="#" className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                            <FaUserEdit size={25} />Disconnect</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 px-4 pt-6 gap-2">

        <div className="col-span-full xl:col-auto">
          <div className="p-4  bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h1 className="mb-6 text-3xl font-extrabold dark:text-white items-center  flex">
              <code>Asistencia del usuario</code>
            </h1>

            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                    <TableAsis attendances={attendance} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-full xl:col-auto">
          <div className="p-4  bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h1 className="mb-6 text-3xl font-extrabold dark:text-white items-center  flex">
              <code>Pagos del usuario</code>
            </h1>

            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                    <TableMem attendances={attendance} />
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