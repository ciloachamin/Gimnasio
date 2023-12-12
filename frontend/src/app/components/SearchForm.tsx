import React, { useState } from 'react';
import {Modal} from 'flowbite-react';
import { useSession } from 'next-auth/react';


const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

interface Member {
    mem_id: number;
    pla_id: number;
    mem_name: string;
    mem_lastname: string;
    mem_code: string;
    // Agrega otras propiedades según sea necesario
  }
  
interface Place {
    pla_id: string | string[] | undefined;
  }

const SearchForm: React.FC<Place> = ({pla_id})  => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data: session, status } = useSession();



  const handleSearch = async () => {
    try {
      // Realiza la solicitud al backend API para buscar con el término de búsqueda
      const response = await fetch(`${backendUrl}/search/${pla_id}?q=${searchTerm}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `${session?.user?.token}`,
        },
    });
      const data = await response.json();


      setSearchResults(data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  console.log(searchResults);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="lg:block lg:pl-3.5 max-lg:w-[400px] max-sm:w-auto"
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
            type="text"
            name="email"
            id="topbar-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <Modal onClose={closeModal} show={modalIsOpen}>
        <div>
          <h2>Search Results</h2>
          {searchResults.map((member) => (
            <div key={member.mem_id}>
              <strong>Member ID:</strong> {member.mem_id}
              <br />
              <strong>Member Name:</strong> {member.mem_name}
              <br />
              <strong>Member Lastname:</strong> {member.mem_lastname}
              <br />
              <strong>Member Code:</strong> {member.mem_code}
              {/* Agrega otras propiedades según sea necesario */}
              <hr />
            </div>
          ))}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
};

export default SearchForm;
