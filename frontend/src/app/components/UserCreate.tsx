import { FC, useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import { useSession } from 'next-auth/react';

const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

interface CreateUserModalProps {
    onCreate: () => void;
}

const CreateUserModal: FC<CreateUserModalProps> = ({ onCreate }) => {
    const [isOpen, setOpen] = useState(false);
    const { data: session } = useSession();

    const [errors, setErrors] = useState<string[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);

        const res = await fetch(`${backendUrl}/owner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${session?.user?.token}`,
            },
            body: JSON.stringify({
                own_id: 0,
                own_name: userName,
                own_lastname: userLastName,
                own_email: userEmail,
                own_password: userPassword,
                own_role: userRole,
            }),
        });

        const responseAPI = await res.json();

        if (!res.ok) {
            setErrors([responseAPI.message]);
            return;
        }

        setOpen(false);
        onCreate(); // Llama a la función proporcionada para actualizar la lista de usuarios
    };

    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    <span>Add User</span>
                </div>
            </Button>

            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Create a User</strong>
                </Modal.Header>
                <Modal.Body className="pt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="userName">User Name</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="userName"
                                        name="userName"
                                        placeholder="User Name"
                                        type="text"
                                        onChange={(event) => setUserName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="userLastName">User Last Name</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="userLastName"
                                        name="userLastName"
                                        placeholder="User Last Name"
                                        type="text"
                                        onChange={(event) => setUserLastName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="userEmail">User Email</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="userEmail"
                                        name="userEmail"
                                        placeholder="User Email"
                                        type="email"
                                        onChange={(event) => setUserEmail(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="userPassword">User Password</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="userPassword"
                                        name="userPassword"
                                        placeholder="User Password"
                                        type="password"
                                        onChange={(event) => setUserPassword(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="userRole">User Role</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="userRole"
                                        name="userRole"
                                        placeholder="User Role"
                                        type="text"
                                        onChange={(event) => setUserRole(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {errors.length > 0 && (
                            <div className="alert alert-danger mt-2">
                                <ul className="mb-0">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Button type="submit" className="w-full lg:w-auto mt-9">
                            Create User
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateUserModal;
