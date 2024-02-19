import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Modal, Label, TextInput, Tabs } from 'flowbite-react'; // Reemplaza con tus importaciones reales
import { HiOutlinePencilAlt, HiTrash, HiOutlineExclamationCircle, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { IoFingerPrint, IoSpeedometerOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { MdContactless } from "react-icons/md";
import { User } from 'user-edit';
import { useSession } from 'next-auth/react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { MdOutlineNfc } from "react-icons/md";
import { MdOutlineDocumentScanner } from "react-icons/md";

import Scan from './NFC/Scan';
import Write from './NFC/Write';
import { ActionsContext } from '../context/context';
import { MemberInfo } from 'member-info';

const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

interface ModalProps {
    user: MemberInfo;
    place: number | number[] | undefined
}

const UserNFCModal: FC<ModalProps> = ({ user, place }) => {

    const [actions, setActions] = useState<{ scan: any, write: any } | null>(null);
    const { scan, write } = actions || {};

    const actionsValue = { actions, setActions };

    const onHandleAction = (actions: { scan: any, write: any }) => {
        setActions({ ...actions });
    }

    const [isOpen, setOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const { data: session } = useSession();



    const handleSave = async () => {
        setErrors([]);

        const res = await fetch(`${backendUrl}/member/${user.mem_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${session?.user?.token}`,
            },
            body: JSON.stringify({
                mem_id: 0,
                pla_id: place,
                mem_name: userName,
                mem_lastname: userLastName,
                mem_code: userCode,
                mem_phone: userPhone,
                mem_email: userEmail,
                mem_location: userLocation,
                mem_password: userNewPassword,
            }),
        });

        const responseAPI = await res.json();

        if (!res.ok) {
            setErrors([responseAPI.message]);
            return;
        }
        setOpen(false)

    };





    const handleTabClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetButton = e.target as HTMLButtonElement; // Convertir a HTMLButtonElement
        const ariaControls = targetButton.getAttribute('aria-controls');
        console.log('aria-controls', ariaControls);

        if (ariaControls === ':rj:-tabpanel-0') {
            onHandleAction({ scan: 'scanning', write: null });
        } else if (ariaControls === ':rj:-tabpanel-1') {
            onHandleAction({ scan: null, write: 'writing' });
        }
    };

    const [fullWidthTabs, setFullWidthTabs] = useState(false); //

    return (
        <>
            <div className="inline-flex items-center w-full">
                <button onClick={() => setOpen(true)} className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                    <MdContactless size={25} /> NFC
                </button>
            </div>
            <Modal onClose={() => { onHandleAction({ scan: null, write: null }); setOpen(false);setFullWidthTabs(false) }} show={isOpen} size={'3xl'}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Generar NFC</strong>
                </Modal.Header>
                <Modal.Body>
                    <div>
                            <div  className="grid grid-cols-1  sm:grid-cols-2" >
                                <button 
                                    onClick={() => {onHandleAction({ scan: 'scanning', write: null });  setFullWidthTabs(true)}} 
                                    className={`hover:bg-gray-100 bg-white focus:outline-none  focus:bg-gray-100
                                    ${fullWidthTabs ? 'w-full h-10 flex-row flex items-center justify-center border' : 'mx-3 h-64 rounded-3xl mt-6 justify-center flex-col flex items-center shadow-xl    max-sm:h-40'}`}>
                                <MdOutlineDocumentScanner size={fullWidthTabs? "25" :"100"} />
                                <code className={`
                                    ${fullWidthTabs ? 'text-lg ' : 'mb-6 text-3xl font-extrabold dark:text-white '}`}>Escanear</code>
                                </button>
                                                                                                                                                
                                <button 
                                    onClick={() => {onHandleAction({ scan: null, write: 'writing' }); setFullWidthTabs(true)}} 
                                    className={`hover:bg-gray-100 bg-white  focus:outline-none  focus:bg-gray-100
                                    ${fullWidthTabs ? 'w-full h-10 flex-row flex items-center justify-center border' : 'mx-3  rounded-3xl mt-6 justify-center flex-col flex items-center shadow-xl   h-64   max-sm:h-40'}`}>
                                <MdOutlineNfc  size={fullWidthTabs? "25" :"100"}/>
                                    <code className={`
                                    ${fullWidthTabs ? ' text-lg' : 'mb-6 text-3xl font-extrabold dark:text-white '}`}>Escribir</code>
                                </button>
                            </div>



                            <ActionsContext.Provider value={actionsValue}>
                                {scan && <Scan />}
                                {write && <Write user={user} />}
                            </ActionsContext.Provider>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={() => { onHandleAction({ scan: null, write: null }); setOpen(false); setFullWidthTabs(false) }}>
                        Salir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserNFCModal;
