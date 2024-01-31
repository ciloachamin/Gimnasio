import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react'; // Reemplaza con tus importaciones reales
import { HiOutlinePencilAlt, HiTrash, HiOutlineExclamationCircle, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { IoFingerPrint, IoSpeedometerOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { User } from 'user-edit';
import { useSession } from 'next-auth/react';
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

interface ModalProps {
    user: User;
    place: number | number[] | undefined
}

const EditUserModal: FC<ModalProps> = ({ user, place }) => {
    const [isOpen, setOpen] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userLocation, setUserLocation] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userNewPassword, setUserNewPassword] = useState<string>('');
    const [userCode, setUserCode] = useState<string>('');
    const [userPhone, setUserPhone] = useState<string>('');
    const [userMembershipstate, setUserMembershipstate] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (user) {
            setUserName(user.mem_name);
            setUserLastName(user.mem_lastname);
            setUserLocation(user.mem_location);
            setUserEmail(user.mem_email);
            setUserPassword(user.mem_password);
            setUserNewPassword(user.mem_password);
            setUserCode(user.mem_code);
            setUserPhone(user.mem_phone);
            setUserMembershipstate(user.membership_state);
        }
    }, [user]);

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


    return (
        <>
            <div className="inline-flex items-center w-full">
                <button onClick={() => setOpen(true)} className="w-full px-3 py-2 my-1 mx-3 text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex justify-start gap-6 items-center">
                    <FaUserEdit size={25} /> Editar Datos
                </button>
            </div>
            <Modal onClose={() => setOpen(false)} show={isOpen} size={'3xl'}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Editar Usuario</strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">Nombre</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Bonnie"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />

                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Apellido</Label>
                            <div className="mt-1">
                                <TextInput id="lastName"
                                    name="lastName"
                                    placeholder="Green"
                                    value={userLastName}
                                    onChange={(e) => setUserLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="email"
                                    name="email"
                                    placeholder="example@company.com"
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone">Celular</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    placeholder="e.g., +(12)3456 789"
                                    type="tel"
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="code">Código</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="code"
                                    name="code"
                                    placeholder="L00374455"
                                    value={userCode}
                                    disabled
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="location">Dirección</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="location"
                                    name="location"
                                    placeholder="Av San Intriago"
                                    value={userLocation}
                                    onChange={(e) => setUserLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="passwordCurrent">Contraseña Actual</Label>
                            <div className="mt-1 relative">
                                <TextInput
                                    id="passwordCurrent"
                                    name="passwordCurrent"
                                    placeholder="••••••••"
                                    type={showPassword ? 'text' : 'password'}
                                    value={userPassword}
                                    disabled


                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                                </button>

                            </div>
                        </div>
                        <div>
                            <Label htmlFor="passwordNew">Nueva Contraseña</Label>
                            <div className="mt-1 relative">
                                <TextInput
                                    id="passwordNew"
                                    name="passwordNew"
                                    placeholder="Nueva contraseña"
                                    type={showNewPassword ? 'text' : 'password'}
                                    onChange={(e) => setUserNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={handleSave}>
                        Save all
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditUserModal;
