import { type FC, useState } from "react";
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import { useSession } from "next-auth/react";


const backendUrl = process.env['NEXT_PUBLIC_BACKEND_URL'];

const CreatePlaceModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const { data: session } = useSession();

    const [errors, setErrors] = useState<string[]>([]);
    const [placeName, setPlaceName] = useState<string>("");
    const [placeLocation, setPlaceLocation] = useState<string>("");
    const [placeSchedule, setPlaceSchedule] = useState<string>("");
    const [placeClassSchedule, setPlaceClassSchedule] = useState<string>("");
    const [placeType, setPlaceType] = useState<string>("");


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);

        const res = await fetch(
            `${backendUrl}/places/${session?.user?.user.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${session?.user?.token}`,
                },
                body: JSON.stringify({
                    pla_id: 1,
                    pla_name: placeName,
                    pla_location: placeLocation,
                    pla_schedule: placeSchedule,
                    pla_classschedule: placeClassSchedule,
                    pla_type: placeType,
                }),
            }
        );

        const responseAPI = await res.json();

        console.log(responseAPI);   

        if (!res.ok) {
            setErrors([responseAPI.message]); // Cambia a un array para mantener la consistencia
            return;
        }
        setOpen(false);

    };

    return (
        <>
            <Button color="primary" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    <span>Add Place</span>
                </div>
            </Button>

            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Create a Place</strong>
                </Modal.Header>
                <Modal.Body className="pt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="placeName">Place Name</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="placeName"
                                        name="placeName"
                                        placeholder="Place Name"
                                        type="text"
                                        onChange={(event) => setPlaceName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="placeLocation">Place Location</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="placeLocation"
                                        name="placeLocation"
                                        placeholder="Place Location"
                                        type="text"
                                        onChange={(event) => setPlaceLocation(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="placeSchedule">Place Schedule</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="placeSchedule"
                                        name="placeSchedule"
                                        placeholder="Place Schedule"
                                        type="text"
                                        onChange={(event) => setPlaceSchedule(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="placeClassSchedule">Place Class Schedule</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="placeClassSchedule"
                                        name="placeClassSchedule"
                                        placeholder="Place Class Schedule"
                                        type="text"
                                        onChange={(event) => setPlaceClassSchedule(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="placeType">Place Type</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="placeType"
                                        name="placeType"
                                        placeholder="Place Type"
                                        type="text"
                                        onChange={(event) => setPlaceType(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {errors.length > 0 && (
                            <div className="alert alert-danger mt-2">
                                <ul className="mb-0">
                                    {errors}
                                </ul>
                            </div>
                        )}
                        <Button type="submit" className="w-full lg:w-auto mt-9">
                            Create Place
                        </Button>

                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreatePlaceModal;
