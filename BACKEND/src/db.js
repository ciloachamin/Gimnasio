import axios from "axios";

let dbClient; // Variable para almacenar el cliente de la base de datos

export const connectDB = async () => {
  try {
    if (!dbClient) {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/gimnasio');

      if (response.status === 200 && response.data.message === "Bienvenido a la API del gimnasio") {
        console.log('>>> Conexión a la base de datos exitosa');
        dbClient = axios.create({
          baseURL: 'http://127.0.0.1:8000/api/v1/gimnasio',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        console.error('La API respondió, pero no se recibió el mensaje esperado. Respuesta completa:', response.data);
      }
    }

    return dbClient;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Propagar el error para que pueda ser manejado en el lugar apropiado
  }
};
