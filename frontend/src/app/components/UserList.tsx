import { FC } from 'react';
import { Button, Table, Label, Checkbox, Modal, TextInput, Pagination } from 'flowbite-react';
import { HiOutlinePencilAlt, HiTrash, HiOutlineExclamationCircle, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useState } from "react";
import Image from "next/image";

const EditUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiOutlinePencilAlt className="text-lg" />
                    Edit user
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Edit user</strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">First name</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Bonnie"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last name</Label>
                            <div className="mt-1">
                                <TextInput id="lastName" name="lastName" placeholder="Green" />
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
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone number</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    placeholder="e.g., +(12)3456 789"
                                    type="tel"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="department">Department</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="department"
                                    name="department"
                                    placeholder="Development"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="company">Company</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="company"
                                    name="company"
                                    placeholder="Somewhere"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="passwordCurrent">Current password</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="passwordCurrent"
                                    name="passwordCurrent"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="passwordNew">New password</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="passwordNew"
                                    name="passwordNew"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={() => setOpen(false)}>
                        Save all
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

function Component() {
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => setCurrentPage(page);

    return (
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination layout="table" currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
            </div>
    );
}



interface UserDelete {
    user: User;
    onDeleteU: (id: number) => void;
}

const DeleteUserModal: FC<UserDelete> = ({ user, onDeleteU }) => {
    const [isOpen, setOpen] = useState(false);

    const handleDelete = () => {
        onDeleteU(user.id);
    };

    return (
        <>
            <Button color="failure" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiTrash className="text-lg" />
                    Delete user
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Delete user</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                        <p className="text-xl text-gray-500">
                            Are you sure you want to delete this user?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button color="failure" onClick={handleDelete}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

interface UserRowProps {
    user: User;
    onDelete: (id: number) => void;
}

const UserRow: FC<UserRowProps> = ({ user, onDelete }) => {
    const isActive = true; // Cambia esto según tus condiciones



    return (
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
                <div className="flex items-center">
                    <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                    <label htmlFor="checkbox-1" className="sr-only">
                        checkbox
                    </label>
                </div>
            </Table.Cell>
            <Table.Cell className=" flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0 w-full">
                <Image
                    className="h-10 w-10 rounded-full max-w-2xl"
                    src="/assets/img/community/img2.png"
                    alt="Descripción de la imagen"
                    width={24} // Ajusta el ancho según tus necesidades
                    height={24} // Ajusta la altura según tus necesidades

                />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {`${user.name} ${user.lastname}`}
                    </div>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {user.email}
                    </div>
                </div>
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {user.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                {isActive ? (
                    <div className="flex items-center">
                        <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                        <span>Active</span>
                    </div>

                ) : (
                    <div className="flex items-center">
                        <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>{" "}                    <span>Offline</span>
                    </div>
                )}
            </Table.Cell>
            <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                    <EditUserModal />
                    <DeleteUserModal user={user} onDeleteU={onDelete} />
                </div>
            </Table.Cell>
        </Table.Row>
    );
};

interface UserTableProps {
    users: User[];
    onDelete: (id: number) => void;
}

const UserTable: FC<UserTableProps> = ({ users, onDelete }) => {
    return (
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell>
                    <Label htmlFor="select-all" className="sr-only">
                        Select all
                    </Label>
                    <Checkbox id="select-all" name="select-all" />
                </Table.HeadCell>

                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Last Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {users.map((user) => (
                    <UserRow key={user.id} user={user} onDelete={onDelete} />
                ))}
            </Table.Body>
        </Table>
        
    );
};

interface UsersListProps {
    users: User[];
    onDeletePlace: (id: number) => void;
}

const UsersList: FC<UsersListProps> = ({ users, onDeletePlace }) => {
    return (
        <div >
            <UserTable users={users} onDelete={onDeletePlace} />
            <Component />
        </div>
    );
};

export default UsersList;
