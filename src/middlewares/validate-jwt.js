import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la petición"
            });
        }

        token = token.replace(/^Bearer\s+/, "");
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token inválido",
                error: err.message
            });
        }

        const { uid } = decoded;

        if (!uid) {
            return res.status(401).json({
                success: false,
                message: "El token no contiene un UID válido"
            });
        }

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no existente en la DB"
            });
        }

        if (!user.status) {
            return res.status(403).json({
                success: false,
                message: "Usuario fue desactivado previamente"
            });
        }

        req.usuario = user; 
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        });
    }
};