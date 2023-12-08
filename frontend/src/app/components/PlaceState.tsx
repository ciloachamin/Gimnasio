

import { FC } from 'react';
import { Card } from 'flowbite-react'; // Reemplaza 'tu-libreria-de-componentes' con la librería que estés utilizando
import { HiOutlineExclamationCircle } from 'react-icons/hi'; // Asegúrate de importar el ícono correcto
import Place from "./Place"; // Reemplaza 'tu-libreria-de-componentes' con la librería que estés utilizando

interface PlaceStatusProps {
    hasPlaces: boolean;
    fetchPlaces: () => void;
}

const PlaceStatus: FC<PlaceStatusProps> = ({ hasPlaces,fetchPlaces}) => {
    return (
        <div>
            {hasPlaces ? (
                <div className=" flex items-center justify-center">
                    <Card className="max-w-sm">
                        <div className="flex flex-col items-center justify-center w-[300px]">
                            <HiOutlineExclamationCircle className="text-gray-400 text-6xl" />
                            <p className="text-2xl text-gray-400">
                                Agregar otro lugar
                            </p>
                            <Place fetchPlace={fetchPlaces} />
                        </div>
                    </Card>
                </div>

            ) : (
                <div>
                <Card className="max-w-m">
                    <div className="flex flex-col items-center justify-center">
                        <HiOutlineExclamationCircle className="text-gray-400 text-9xl" />
                        <p className="text-4xl text-gray-400">
                            No tienes lugares registrados
                        </p>
                        <Place fetchPlace={fetchPlaces}/>
                    </div>
                </Card>
            </div>
                
            )}
        </div>

    );

};

export default PlaceStatus;
