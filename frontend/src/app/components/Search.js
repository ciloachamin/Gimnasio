import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import Modal from '@/app/components/UserModal'
import { useSession } from "next-auth/react";
const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];


const AutocompleteItem = ({ mem_id, mem_name, mem_lastname, mem_code, ...otherProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membershipState, setMembershipState] = useState(null);
  const { data: session } = useSession();


  const handleOpenModal = async () => {
    const membershipState = await fetchMembershipState(mem_id);
    setMembershipState(membershipState);
    setIsModalOpen(true);
    // Guardar el registro de asistencia cuando se abre el modal
    guardarRegistroAsistencia(mem_id);
  };


  const guardarRegistroAsistencia = async (mem_id) => {
    const fechaActual = new Date();
    console.log("fechaActual"); 
    console.log(fechaActual);
    const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace("T", " ");
    console.log("fechaFormateada");
    console.log(fechaFormateada);
    try {
      const respuesta = await fetch(`${backendUrl}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user?.token}`,
        },
        body: JSON.stringify({
          att_id: 1,
          pla_id: otherProps.pla_id,
          mem_id: mem_id,
          att_entry: fechaActual,
          att_exit: null,

        }),
      }
      );

      if (!respuesta.ok) {
        console.error(`Error al guardar el registro de asistencia: ${respuesta.status} - ${respuesta.statusText}`);
      }
    } catch (error) {
      console.error('Error al guardar el registro de asistencia:', error);
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const fetchMembershipState = async (mem_id) => {
    try {
      const mbsReq = await fetch(`${backendUrl}/membership-state/${mem_id}`);
      if (mbsReq.ok) {
        return await mbsReq.json();
      } else {
        console.error(`Error fetching membership state: ${mbsReq.status} - ${mbsReq.statusText}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching membership state:', error);
      return null;
    }
  };

  return (
    <>
      <li key={mem_id} onClick={handleOpenModal} className='cursor-pointer hover:bg-blue-300'>
        <div className='flex gap-4 p-4'>
          <h3 className='text-sm font-semibold'>{`${mem_name} ${mem_lastname}`}</h3>
          <p className='text-sm text-gray-600'>{`ID: ${mem_id}, Code: ${mem_code}`}</p>
        </div>
      </li>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} mem_id={mem_id} mem_name={mem_name} mem_lastname={mem_lastname} mem_code={mem_code} membershipState={membershipState} />)}
    </>
  );
};


export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  })

  const autocomplete = useMemo(() => createAutocomplete({
    placeholder: 'ID, Name, Email, Code',
    onStateChange: ({ state }) => setAutocompleteState(state),
    getSources: () => [{
      sourceId: 'offers-next-api',
      getItems: ({ query }) => {
        if (!!query) {
          return fetch(`${backendUrl}/search/${props.pla_id}?q=${query}`)
            .then(res => res.json())
        }
      }
    }],
    ...props
  }), [props])

  console.log(props)

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  })

  return (

    <>
      <form
        ref={formRef}
        className="lg:block lg:pl-3.5 max-lg:w-[400px] max-sm:w-auto"
        {...formProps}
      >
        <label htmlFor="topbar-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1 lg:w-96 ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            ref={inputRef}
            {...inputProps}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          {
            autocompleteState.isOpen && (
              <div className="absolute mt-12 top-0 left-0 border w-full border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10" ref={panelRef} {...autocomplete.getPanelProps()}>
                {autocompleteState.collections.map((collection, index) => {
                  const { items } = collection
                  console.log({ items })
                  return (
                    <section key={`section-${index}`}  >
                      {items.length > 0 && (
                        <ul {...autocomplete.getListProps()}>
                          {items.map(item => (
                            <AutocompleteItem key={item.mem_id} {...item} />
                          ))}

                        </ul>
                      )}
                    </section>
                  )
                })}
              </div>
            )
          }

        </div>
      </form>
    </>
  )
}