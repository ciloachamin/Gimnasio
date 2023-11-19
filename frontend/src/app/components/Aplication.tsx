import React from 'react';

interface AplicationProps {
    url: string;
    pathD: JSX.Element;
    altText: string;
    senderName: string;
}

const Aplication: React.FC<AplicationProps> = ({
    pathD,
    url,
    altText,
    senderName,
}) => {
    return (
        <a
            href={url}
            className="block p-4  pl-6 px-6 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        >

            <svg
                className="mx-auto mb-1 text-gray-500 w-7 h-7 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={altText}
            >
            {pathD}
            </svg>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
                {senderName}
            </div>
        </a>
    );
};

export default Aplication;


