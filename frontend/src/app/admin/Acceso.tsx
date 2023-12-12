import React, { useState } from 'react';
import { FC } from 'react';
import { Card, TextInput, Button, Label } from 'flowbite-react'; // Asegúrate de importar los componentes necesarios
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import SearchForm from '../components/SearchForm';
import Search from '../components/Search';

interface Place {
    pla_id: string | string[] | undefined;
  }

const Acceso: FC<Place> = ({pla_id}) => {


    return (
        <div className="flex items-center justify-center ">

            <Card className="w-full">
                <div className="flex flex-col items-center justify-center ">
                    <HiOutlineClipboardCheck className="text-gray-400 text-9xl" />
                    <p className="text-2xl dark:text-gray-400 ">Registro De Acceso</p>
                    <div className="flex space-x-3 items-center m-5 max-sm:flex max-sm:flex-col  ">
                        <Label htmlFor="search" >
                            Usuario
                        </Label>
                        <Search pla_id={pla_id} />
                    </div>



                </div>
            </Card>
        </div>
    );
};

export default Acceso;


