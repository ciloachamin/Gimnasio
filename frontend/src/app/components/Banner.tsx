import React from 'react';
import { banner } from '../data';
import Image from 'next/image';
import { Button, } from "flowbite-react";
import Link from "next/link";


interface BannerProps {
  // Define las props que necesitas
}

const Banner: React.FC<BannerProps> = () => {
  // Usa los datos de banner directamente
  const { titlePart1, titlePart2, subtitle, textBtn, img } = banner;

  return (
    <section className='bg-neutral-900 relative'
      style={{
        backgroundImage: `url("/assets/img/about/icons/2.jpg")`,
        backgroundSize: 'cover',
      }}
    >
      <div className="flex h-screen relative z-10">
        {/* Primer contenedor que ocupa la mitad izquierda */}
        <div className="flex-1">
          <div
            className='w-full h-full bg-cover bg-right lg:bg-center bg-no-repeat flex-1'
            style={{
              backgroundImage: `url("/assets/img/about/icons/1111.png")`,
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Ajusta el valor para cambiar la opacidad
            }}
          //data-aos='fade-right' data-aos-delay='100'
          ></div>
        </div>

        {/* Insertar imagen que estará al frente de todos los contenedores */}
        <div className="absolute bottom-0 left-28 flex items-center justify-center z-20  max-sm:left-10  max-lg:right-14  max-xl:left-auto">
          <Image
            src="/assets/img/about/icons/33.png"
            alt="Descripción de la imagen"
            width={500} // Ajusta el ancho según tus necesidades
            height={400} // Ajusta la altura según tus necesidades
            className="object-contain " // Mantiene la relación de aspecto y se ajusta al contenedor
            style={{ width: 'auto', height: 'auto' }}
            data-aos='fade-right' data-aos-delay='50'
          />
        </div>
        {/* Segundo contenedor que ocupa la mitad derecha */}
        <div className="flex-1 max-sm:absolute max-sm:inset-0  max-lg:absolute max-lg:inset-0 " >
          {/* Image */}
          <div
            className='w-full h-full bg-cover bg-right lg:bg-center bg-no-repeat flex-1'
            //data-aos='fade-right' data-aos-delay='900'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Ajusta el valor para cambiar la opacidad
            }}
          >
            <div className='container mx-auto h-full relative'>
              <div className='flex items-center h-full -space-x-48 lg:-space-x-24  '>
                <div className='text-white flex-1 z-10 lg:pl-5 max-sm:top-[100px] max-sm:absolute max-sm:ml-10 max-lg:absolute  max-lg:top-[100px]'>
                  <h1 className='text-5xl w-full font-mi-fuente text-white mb-8'
                    data-aos='fade-down' data-aos-delay='100'>
                    {titlePart1}<br />
                    <span className='text-[#7F9115]'>{titlePart2}</span>
                  </h1>
                  <p className='max-w-[415px] text-body-md lg:text-body-lg mb-8 text-xl w-full font-mi-fuente max-sm:max-w-[260px] max-lg:max-w-[300px]'
                    data-aos='fade-down' data-aos-delay='200'
                  >{subtitle}</p>

                  <Link href="/authentication/sign-up">
                    <Button className="bg-[#7F9115] fitness-club text-white rounded hover:bg-[#232811]"
                      data-aos='fade-down' data-aos-delay='300'>
                      {textBtn}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
