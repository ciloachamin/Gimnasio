import { FC } from 'react';
import { Card, Button } from 'flowbite-react'; // Asegúrate de importar tus componentes de tarjeta y botón

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
  onSelect: (id: number) => void; // Agrega esta línea
}

const PlaceCard: FC<PlaceCardProps> = ({ place, onDelete,onSelect }) => {
  const handleDelete = () => {
    onDelete(place.pla_id);
  };

  const handleSelect = () => {
    onSelect(place.pla_id);
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
      <Button color="primary" onClick={handleSelect}>
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
  onSelectPlace: (id: number) => void; // Agrega esta línea
}

const PlacesList: FC<PlacesListProps> = ({ places, onDeletePlace,onSelectPlace}) => {

    // Verifica si places es un array y tiene elementos
  if (!Array.isArray(places) || places.length === 0) {
    return ;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {places.map((place) => (
            <PlaceCard key={place.pla_id} place={place} onDelete={onDeletePlace} onSelect={onSelectPlace} />
      ))}
    </div>
  );
};

export default PlacesList;
