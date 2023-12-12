import { FC, useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';


interface ModalProps {
  onClose: () => void;
  mem_id: string;
  mem_name: string;
  mem_lastname: string;
  mem_code: string;
}

const UserModal: React.FC<ModalProps> = ({ onClose, mem_id, mem_name, mem_lastname, mem_code }) => {
  
    const [isOpen, setOpen] = useState(true);
    return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
      <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Create a User</strong>
                </Modal.Header>

      </Modal>

   
    </>
  );
};

export default UserModal;
