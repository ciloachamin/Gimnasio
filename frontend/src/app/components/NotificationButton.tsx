import React, { useState, useRef, useEffect } from 'react';
import Notifications from './Notification';

const NotificationButton: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowNotifications(false);
    }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  return (
    <div 
    className="relative">
      {/* Button to toggle notifications */}
      <button
        type="button"
        onClick={toggleNotifications}
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">View notifications</span>
        {/* Bell icon */}
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      </button>

      {/* Notifications dropdown */}
      {showNotifications && (
        
        <div
        ref={dropdownRef} 
        className=" fixed  right-0  mr-2 z-20 max-w-sm overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700 " id="notification-dropdown">
          <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white">
            Notifications
          </div>
          <div>
            <Notifications
              imageUrl="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              altText="Jese image"
              senderName="Bonnie Green"
              message="Hey, what's up? All set for the presentation?"
              timeAgo="a few moments ago"
            />
            <Notifications
              imageUrl="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              altText="Jese image"
              senderName="Bonnie Green"
              message="Hey, what's up? All set for the presentation?"
              timeAgo="a few moments ago"
            />
            <Notifications
              imageUrl="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              altText="Jese image"
              senderName="Bonnie Green"
              message="Hey, what's up? All set for the presentation?"
              timeAgo="a few moments ago"
            />
          </div>
          <a href="#" className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
            <div className="inline-flex items-center ">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
              View all
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
