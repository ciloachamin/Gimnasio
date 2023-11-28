import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UserList from './UserList';

const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

const ReadUser: FC = function () {
    const { data: session, status } = useSession();
    const [users, setUSers] = useState([]);

    const fetchPlaces = async () => {
        if (status === "loading" || !session) {
            // La sesión aún se está cargando o el usuario no está autenticado
            return;
        }

        try {
            const placesRes = await fetch(`${backendUrl}/owner`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${session?.user?.token}`,
                },
            });

            if (!placesRes.ok) {
                throw new Error('Error al obtener lugares');
            }

            const placesData = await placesRes.json();
            const transformedData = placesData.map(([id, name, lastname, email, password, role]: [number, string, string, string, string, string]) => ({
                id,
                name,
                lastname,
                email,
                password,
                role,
            }));

            setUSers(transformedData);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [session, status]);

    const handleDeletePlace = async (id: number) => {
        if (session) {
            await fetch(`${backendUrl}/owner/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${session?.user?.token}`,
                },
            });

            // Actualiza la lista de lugares después de la eliminación
            fetchPlaces();
        }
    };

    return (
        <>
            <UserList users={users} onDeletePlace={handleDeletePlace} />
        </>
    );
};

export default ReadUser;
