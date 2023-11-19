// NotificationsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definimos los tipos para el contexto
interface NotificationsContextProps {
  notificationsVisible: boolean;
  toggleNotifications: () => void;
}

// Creamos el contexto con el tipo correspondiente
const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);
// Proveedor del contexto
interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const toggleNotifications = () => {
    setNotificationsVisible((prevVisible) => !prevVisible);
  };

  const contextValue: NotificationsContextProps = {
    notificationsVisible,
    toggleNotifications,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto
export const useNotificationsContext = (): NotificationsContextProps => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotificationsContext debe ser utilizado dentro de un NotificationsProvider');
  }

  return context;
};
