import { FC } from 'react';
import { Table, TextInput, Checkbox, Dropdown } from 'flowbite-react';
import { IoIosArrowDown } from "react-icons/io";
import { MdDateRange } from "react-icons/md";




function Component() {
    return (
        <>
            <div className="items-center justify-between lg:flex mb-4">
                <div className="items-center sm:flex">

                    <div className="flex items-center m-4">
                        <Dropdown label="Filter by" dismissOnClick={false} color="gray">

                            <Dropdown.Item>
                                <Checkbox id="apple" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Completed (56)
                                </label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox id="fitbit" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Cancelled (56)
                                </label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox id="dell" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                <label htmlFor="dell" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    In progress (56)
                                </label>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Checkbox id="asus" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                <label htmlFor="asus" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    In review (97)
                                </label>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>

                    <div date-rangepicker="true" className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MdDateRange></MdDateRange>
                            </div>
                            <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="From" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MdDateRange></MdDateRange>
                            </div>
                            <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="To" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface Membership {
    mbs_id: number;
    rou_id: number;
    mem_id: number;
    pro_id: number;
    mbs_start_date: string;
    mbs_due_date: string;
    mbs_state: boolean;
    inv_id: number;
    pro_name: string;
    pro_description: string;
    pro_cost: string;
    pro_stock: number;
    pro_category: string;
    pro_duration: number;
    pro_benefits: string;
}

interface UserRowProps {
    membership: Membership;
}

const UserRow: FC<UserRowProps> = ({ membership }) => {

    return (
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                {membership.mbs_start_date}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {membership.mbs_due_date}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {membership.pro_duration}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {membership.pro_name}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                {membership.mbs_state ? (
                    <div className="flex items-center">
                        <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                        <span>Activo</span>
                    </div>

                ) : (
                    <div className="flex items-center">
                        <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>{" "}                    
                        <span>Inactivo</span>
                    </div>
                )}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {membership.pro_cost}
            </Table.Cell>
            
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {membership.pro_benefits}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {membership.pro_description}
            </Table.Cell>
        </Table.Row>
    );
};

interface MembershipTableProps {
    memberships: Membership[];
}

const UserTable: FC<MembershipTableProps> = ({ memberships }) => {
    return (
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-50 dark:bg-gray-700">
                <Table.HeadCell >Fecha Inicio</Table.HeadCell>
                <Table.HeadCell >Fecha Final</Table.HeadCell>
                <Table.HeadCell>Duracion</Table.HeadCell>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Estado</Table.HeadCell>
                <Table.HeadCell>Precio</Table.HeadCell>
                <Table.HeadCell>Beneficios</Table.HeadCell>
                <Table.HeadCell>Descripcion</Table.HeadCell>


            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {memberships.map((membership) => (
                    <UserRow key={membership.mbs_id} membership={membership} />
                ))}
            </Table.Body>
        </Table>

    );
};
interface MembershipsListProps {
    memberships: Membership[];
}
const UsersList: FC<MembershipsListProps> = ({ memberships }) => {
    return (
        <div >
            <Component />
            <UserTable memberships={memberships} />
        </div>
    );
};

export default UsersList;
