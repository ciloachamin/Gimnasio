import { FC, useState,useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import Image from 'next/image';
import { FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];




interface ModalProps {
  onClose: () => void;
  mem_id: string;
  mem_name: string;
  mem_lastname: string;
  mem_code: string;
  membershipState: boolean;
}

const UserModal: FC<ModalProps> = ({
  onClose,
  mem_id,
  mem_name,
  mem_lastname,
  mem_code,
  membershipState,
}) => {
  const [isOpen, setOpen] = useState(true);

  const [buttonText, setButtonText] = useState(
    membershipState
      ? 'Membrecia Activa'
      : membershipState === null
      ? 'No hay Membrecia' // Valor predeterminado cuando membershipState es nulo
      : 'Membrecia Inactiva'
  );
  
  const [buttonColor, setButtonColor] = useState(
    membershipState
      ? 'bg-green-500 hover:bg-green-600 w-[170px]'
      : membershipState === null
      ? 'bg-gray-500 hover:bg-gray-600 w-[170px]' // Valor predeterminado cuando membershipState es nulo
      : 'bg-red-500 hover:bg-red-600 w-[170px]'
  );
  
  const handleMouseEnter = () => {
    if (membershipState) {
      setButtonText('Ver Perfil');
      setButtonColor('bg-blue-500 w-[170px] hover:bg-blue-600');
    } else {
      setButtonText('Renovar');
      setButtonColor('bg-blue-500  w-[170px] hover:bg-blue-600');
    }
  };
  const handleMouseLeave = () => {
    setButtonStyles();
  };

  const handleButtonClick = () => {
    if (membershipState) {
      console.log('Redirigir a la página de perfil');
    } else {
      console.log('Redirigir a la página de renovación');
    }
  };

  const setButtonStyles = () => {
    if (membershipState) {
      setButtonText('Membrecia Activa');
      setButtonColor('bg-green-500 hover:bg-green-600 w-[170px]');
    } else if (membershipState === null) {
      setButtonText('No hay Membrecia');
      setButtonColor('bg-gray-500 hover:bg-gray-600 w-[170px]');
    } else {
      setButtonText('Membrecia Inactiva');
      setButtonColor('bg-red-500 w-[170px] hover:bg-red-600');
    }
  };


  return (
    <>
      <Modal onClose={() => onClose()} show={isOpen} size={'3xl'}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <div className="flex items-center">
            <FaInfoCircle />
            <strong className="ml-2">Información del Usuario</strong>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="col-span-full xl:col-auto">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div className="items-center sm:flex xl:flex 2xl:flex sm:space-x-4 xl:space-x-4 2xl:space-x-4 justify-between">
                <Image
                  alt="Flowbite logo"
                  height="112"
                  src="/assets/img/community/img1.png"
                  width="112"
                />
                <div>
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    {`${mem_name} ${mem_lastname}`}
                  </h3>
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold">ID:</span> {`${mem_id}`}
                  </div>
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Nombre:</span> {`${mem_name} ${mem_lastname}`}
                  </div>
                  <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Codigo:</span> {`${mem_code}`}
                  </div>

                </div>
                <div className="flex items-center space-x-4">
                    <Button
                      className={buttonColor}
                      onClick={handleButtonClick}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {buttonText}
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
