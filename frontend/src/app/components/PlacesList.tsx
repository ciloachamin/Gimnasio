import { FC } from 'react';
import { Card, Button } from 'flowbite-react'; // Asegúrate de importar tus componentes de tarjeta y botón

interface PlaceCardProps {
  place: {
    id: number;
    name: string;
    location: string;
    schedule: string;
    classSchedule: string;
    type: string;
  };
  onDelete: (id: number) => void; // Función para manejar la eliminación del lugar
}

const PlaceCard: FC<PlaceCardProps> = ({ place, onDelete }) => {
  const handleDelete = () => {
    onDelete(place.id);
  };

  return (

    <Card>

      <h5 className="text-xl font-bold">{place.name}</h5>
      <p className="text-gray-500">{place.location}</p>
      <p className="text-gray-500">{place.schedule}</p>
      <p className="text-gray-500">{place.classSchedule}</p>
      <p className="text-gray-500">{place.type}</p>
      <Button color="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Card>

  );
};

interface PlacesListProps {
  places: Array<{
    id: number;
    name: string;
    location: string;
    schedule: string;
    classSchedule: string;
    type: string;
  }>;
  onDeletePlace: (id: number) => void; // Función para manejar la eliminación del lugar
}

const PlacesList: FC<PlacesListProps> = ({ places, onDeletePlace }) => {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} onDelete={onDeletePlace} />
      ))}
    </div>
  );
};

export default PlacesList;
