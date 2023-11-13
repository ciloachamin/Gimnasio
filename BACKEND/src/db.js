export const connectDB = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/gimnasio', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.message === "Bienvenido a la API del gimnasio") {
        console.log('>>> Conexión a la base de datos exitosa');
        return 'http://127.0.0.1:8000/api/v1/gimnasio'; // Devuelve el enlace de la API
      } else {
        console.error('La API respondió, pero no se recibió el mensaje esperado. Respuesta completa:', data);
      }
    } else {
      console.error('Error al conectar a la base de datos:', response.status, response.statusText);
    }
  } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
    
};