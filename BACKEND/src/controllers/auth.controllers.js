import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import {connectDB} from "../db.js";
import axios from "axios";
const url = await connectDB(); // Espera a que connectDB se resuelva y devuelve la URL

export const getUsuarios = async (req, res) => {
    try {
      const response = await axios.get(`${url}/owner`);
      const candidatos = response.data;
      return res.status(200).json(candidatos);
    } catch (error) {
      console.error('Error al obtener candidatos:', error);
      return res.status(500).json(["Error en el servidor"]);
    }
  };
async function getUltimoId() {
    try {
      const response = await axios.get(`${url}/member`);
      const members = response.data;
      const candIds = members.map((member) => member[0]);
      return candIds[candIds.length-1];
    } catch (error) {
      console.error('Error al obtener el ultimo miembro ingresado:', error);
      return null;
    }
  }
async function fetchOwersAndFilterById(id) {
    try {
      const response = await axios.get(`${url}/owner`);
      const owers = response.data;
      const existingUsers = owers.filter((ower) => ower[0] === id);
  
      return existingUsers;
    } catch (error) {
      console.error('Error al obtener usurios:', error);
      return [];
    }
  }  
async function fetchMembersAndFilterById(id) {
    try {
      const response = await axios.get(`${url}/member`);
      const members = response.data;
      const existingUsers = members.filter((member) => member[0] === id);
  
      return existingUsers;
    } catch (error) {
      console.error('Error al obtener miembros:', error);
      return [];
    }
  }
async function fetchOwnersAndFilterByEmail(email) {
    try {
      const response = await axios.get(`${url}/owner`);
      const owners = response.data;
      const existingUsers = owners.filter((owner) => owner[3] === email);
      return existingUsers;
    } catch (error) {
      console.error('Error al obtener usurios:', error);
      return [];
    }
  }
async function fetchMembersAndFilterByEmail(email) {
    try {
      const response = await axios.get(`${url}/member`);
      const members = response.data;
      const existingUsers = members.filter((member) => member[6] === email);
  
      return existingUsers;
    } catch (error) {
      console.error('Error al obtener miembros:', error);
      return [];
    }
  }
export const signin = async (req, res) => {
  //MODIFICAR PARA QUE BUSQUE EN AMBAS TABLAS solo con un email y contraseña
    const userData = req.body;

  const result = await checkIfUserExists(userData.mem_email)

  if (!result) {
    return res.status(400).json({
      message: "El correo no esta registrado",
    });
  }
  const validPassword = await bcrypt.compare(userData.mem_password, result[0][8]);

  if (!validPassword) {
    return res.status(400).json({
      message: "La contraseña es incorrecta",
    });
  }

  const token = await createAccessToken({ id: result[0][0]});

  res.cookie("token", token, {
    // httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res.json(result[0]);
};
async function checkIfUserExists(email) {
    try {
      const existingOwners = await fetchOwnersAndFilterByEmail(email);
      const existingMembers = await fetchMembersAndFilterByEmail(email);
        if (existingOwners.length > 0) {
            return existingOwners; // Devuelve los dueños encontrados
          } else if (existingMembers.length > 0) {
            return existingMembers; // Devuelve los miembros encontrados
          } else {
            return null; // No se encontraron usuarios
          }
    } catch (error) {
      console.error('Error al verificar usuarios:', error);
      throw new Error("Error en el servidor al verificar usuarios");
    }
}
// Crea un nuevo usuario
async function createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.mem_password, 10);
      const newUser = { ...userData, mem_password: hashedPassword };
      const response = await axios.post(`${url}/member`, newUser);
      return response;
    } catch (error) {
      throw error;
    }
  }
// Registra un nuevo usuario
export const signup = async (req, res, next) => {
    const userData = req.body;
    try {
        const existingUser =  await checkIfUserExists(userData.mem_email);
      if (!(existingUser===null)) {
        return res.status(409).json(["Usuario ya existe"]);
      }
  
      const newUser = await createUser(userData);
      const newUserId = await getUltimoId();
      // El usuario se registró correctamente en el servidor
      const token = await createAccessToken({ id: newUserId });
      // Configurar la cookie con el token (puedes ajusta las opciones según tus necesidades)
      res.cookie("token", token, {
        // httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      return res.status(201).json("Se creo al miembro " +newUser.data);

    } catch (error) {
        console.log('Error al insertar miembro: ', error);
        res.status(500).json(["Error en el servidor"])
      // Otros errores
      next(error);
    }
  };
export const signout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
}
export const profile = async (req, res) => {
    console.log(req);
  const result = await fetchMembersAndFilterById(req.userId)
 // const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
  return res.json(result);
} 