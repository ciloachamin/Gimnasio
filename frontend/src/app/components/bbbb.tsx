"use client";
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

interface PageProps {
  place: {
    pla_id: number;
    pla_name: string;
    pla_location: string;
    pla_schedule: string;
    pla_classSchedule: string;
    pla_type: string;
  };
}

const Place: FC<PageProps> =  ({  }) => {
  const params = useParams();
  const id = params['id'];
  const [places, setPlaces] = useState<PageProps['place'] | null>(null);
  

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
      setPlaces(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData(); // Llamar a fetchData cuando el componente se monta y el usuario está autenticado
    }
  }, [status]);

  if (status === 'loading' || !session) {
    // La sesión aún se está cargando o el usuario no está autenticado
    return <div>Loading...</div>;
  }

  return (
    <div>
      {places ? (
        <>
          <h2>{places.pla_id}</h2>
          <h3>{session.user.email}</h3>
          <h3>{places.pla_location}</h3>
          {/* Mostrar otras propiedades del lugar según sea necesario */}
        </>
      ) : (
        <p>No se encontraron datos para el ID de lugar especificado.</p>
      )}
    </div>
  );
}

export default Place;