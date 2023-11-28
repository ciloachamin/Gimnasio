import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const isAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({
      message: "No estás autorizado. Token no encontrado.",
    });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: "No estás autorizado. Error al verificar el token.",      });

    req.userId = decoded.id; 

    next();
  });
};