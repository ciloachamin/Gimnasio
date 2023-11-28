import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PlacesList from './PlacesList';

const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

const ReadPlace: FC = function () {
    const { data: session, status } = useSession();
    const [places, setPlaces] = useState([]);

    const fetchPlaces = async () => {
        if (status === "loading" || !session) {
            // La sesión aún se está cargando o el usuario no está autenticado
            return;
        }

        try {
            const placesRes = await fetch(`${backendUrl}/place`, {
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
            const transformedData = placesData.map(([id, name, location, schedule, classSchedule, type]: [number, string, string, string, string, string]) => ({
                id,
                name,
                location,
                schedule,
                classSchedule,
                type,
            }));

            setPlaces(transformedData);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [session, status]);

    const handleDeletePlace = async (id: number) => {
        if (session) {
            await fetch(`${backendUrl}/place/${id}`, {
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
            <PlacesList places={places} onDeletePlace={handleDeletePlace} />
        </>
    );
};

export default ReadPlace;
