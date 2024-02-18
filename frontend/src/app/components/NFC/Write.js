import React from 'react';

const Write = ({ user }) => {
    const onWrite = async (message) => {
        try {
            const ndef = new window.NDEFReader();
            // This line will avoid showing the native NFC UI reader
            await ndef.scan();
            await ndef.write({ records: [{ recordType: "text", data: message }] });
            alert(`Value Saved!`);
        } catch (error) {
            console.log(error);
        }
    }
    const [message, setMessage] = React.useState('');

    const onSave = (e) => {
        e.preventDefault();
        onWrite(message);
        setMessage('');
    };
    console.log(user);


    return (
        <>
            <form onSubmit={onSave} className="max-w-sm mx-auto mt-6">
                <div className="flex items-center  border-b-2 border-teal-500 py-2">
                    <input
                        type="text"
                        placeholder="Enter Message..."
                        value={user.mem_code}
                        onChange={(e) => setMessage(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>

        </>
    );
};

export default Write;