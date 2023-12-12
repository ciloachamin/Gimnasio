import { FC } from 'react';
import { Card, Button } from 'flowbite-react'; // Asegúrate de importar tus componentes de tarjeta y botón
import Link from 'next/link';
import { useRouter, useParams,usePathname} from "next/navigation";
import path from 'path';

interface PlaceCardProps {
  place: {
    pla_id: number;
    pla_name: string;
    pla_location: string;
    pla_schedule: string;
    pla_classSchedule: string;
    pla_type: string;
  };
  onDelete: (id: number) => void; // Función para manejar la eliminación del lugar
  onSelectPlace: (place: {
    pla_id: number;
    pla_name: string;
    pla_location: string;
    pla_schedule: string;
    pla_classSchedule: string;
    pla_type: string;
  }) => void;
}


const PlaceCard: FC<PlaceCardProps> = ({ place, onDelete, onSelectPlace }) => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  const formattedPlaceName = place.pla_name.replace(/\s+/g, '-'); // Reemplaza espacios por guiones

  const handleDelete = () => {
    onDelete(place.pla_id);
  };

  const handleSelect = () => {
    onSelectPlace(place);
  };

  const handlePlaceSelection = () => {
    router.push(`/admin/${place.pla_id}`);

  };


  return (

    <Card>

      <h5 className="text-xl font-bold">{place.pla_id}</h5>
      <p className="text-gray-500">{place.pla_name}</p>
      <p className="text-gray-500">{place.pla_location}</p>
      <p className="text-gray-500">{place.pla_schedule}</p>
      <p className="text-gray-500">{place.pla_classSchedule}</p>
      <p className="text-gray-500">{place.pla_type}</p>
      <Button color="danger" onClick={handleDelete}>
        Delete
      </Button>
      <Button color="primary" onClick={handlePlaceSelection}>
        Select
      </Button>
    </Card>

  );
};

interface PlacesListProps {
  places: Array<{
    pla_id: number;
    pla_name: string;
    pla_location: string;
    pla_schedule: string;
    pla_classSchedule: string;
    pla_type: string;
  }>;
  onDeletePlace: (id: number) => void; // Función para manejar la eliminación del lugar
  onSelectPlace: (place: {
    pla_id: number;
    pla_name: string;
    pla_location: string;
    pla_schedule: string;
    pla_classSchedule: string;
    pla_type: string;
  }) => void;
}

const PlacesList: FC<PlacesListProps> = ({ places, onDeletePlace, onSelectPlace }) => {

  // Verifica si places es un array y tiene elementos
  if (!Array.isArray(places) || places.length === 0) {
    return;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {places.map((place) => (
        <PlaceCard key={place.pla_id} place={place} onDelete={onDeletePlace} onSelectPlace={onSelectPlace} />
      ))}
    </div>
  );
};

export default PlacesList;
