"use client";
import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PlacesList from './PlacesList';
import PlaceStatus from './PlaceState';


const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

const ReadPlace: FC = function () {

    const { data: session, status } = useSession();
    const [places, setPlaces] = useState([]);
    const idUser = session?.user?.user.id;
    const handlePlaceSelection = (placeId: number) => {
        // Usa el router para navegar a otra página con el placeId seleccionado
        window.location.href = "/";

      };

    const fetchPlaces = async () => {
        if (status === "loading" || !session) {
            // La sesión aún se está cargando o el usuario no está autenticado
            return;
        }
    
        try {
            const placesRes = await fetch(`${backendUrl}/places/${idUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${session?.user?.token}`,
                },
            });
    
            if (placesRes.status === 404) {
                // Si la respuesta es un 404 (Not Found), maneja este caso específico
                console.log('No se encontraron lugares');
                setPlaces([]);
            } else {
                // Verifica si la respuesta es exitosa (código 2xx)
                if (placesRes.ok) {
                    const placesData = await placesRes.json();
                    setPlaces(placesData);
                } else {
                    // Maneja otros códigos de estado de error
                    console.error(`Error al obtener lugares: ${placesRes.status} - ${placesRes.statusText}`);
                    setPlaces([]);
                }
            }
        } catch (error) {
            // Maneja errores de red u otros
            console.error('Error fetching places:', error);
            setPlaces([]);
        }
    };
    

    useEffect(() => {
        fetchPlaces();
    }, [session, status]);
    const hasPlaces = places.length > 0;

    //verificar el error de eliminar un lugar 
    //no se puede eliminar asi por la relacion que tiene con la tabla manage
    const handleDeletePlace = async (id: number) => {
        if (session) {
            await fetch(`${backendUrl}/places/${id}`, {
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
            <PlaceStatus hasPlaces={hasPlaces} fetchPlaces={fetchPlaces}></PlaceStatus>
            <PlacesList places={places} onDeletePlace={handleDeletePlace} onSelectPlace={handlePlaceSelection} />
        </>
    );
};

export default ReadPlace;
