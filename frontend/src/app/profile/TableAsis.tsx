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

interface Attendance {
    att_id: number;
    pla_id: number;
    mem_id: number;
    att_entry_date: string;
    att_entry_time: string;
    att_exit_date: string;
    att_exit_time: string;
    stay_duration: string;

}

interface UserRowProps {
    attendance: Attendance;
}

const UserRow: FC<UserRowProps> = ({ attendance }) => {
    const isActive = attendance.att_exit_time == "No registrada";

    return (
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                {attendance.att_entry_date}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {attendance.att_entry_time}
            </Table.Cell>

            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {attendance.att_exit_time}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {attendance.stay_duration}
            </Table.Cell>
            


            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                {isActive ? (
                    <div className="flex items-center">
                        <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                        <span>Active</span>
                    </div>

                ) : (
                    <div className="flex items-center">
                        <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>{" "}                    <span>Offline</span>
                    </div>
                )}
            </Table.Cell>
        </Table.Row>
    );
};

interface AttendanceTableProps {
    attendances: Attendance[];
}

const UserTable: FC<AttendanceTableProps> = ({ attendances }) => {
    return (
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-50 dark:bg-gray-700">
                <Table.HeadCell >Fecha</Table.HeadCell>
                <Table.HeadCell>Entrada</Table.HeadCell>
                <Table.HeadCell>Salida</Table.HeadCell>
                <Table.HeadCell>Duracion</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {attendances.map((attendance) => (
                    <UserRow key={attendance.att_id} attendance={attendance} />
                ))}
            </Table.Body>
        </Table>

    );
};
interface AttendancesListProps {
    attendances: Attendance[];
}
const UsersList: FC<AttendancesListProps> = ({ attendances }) => {
    return (
        <div >
            <Component />
            <UserTable attendances={attendances} />
        </div>
    );
};

export default UsersList;
