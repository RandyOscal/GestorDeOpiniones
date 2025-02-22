import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture: {
        type: String
    },
    role: {
        type: String,
        required: false,
        default: "USER_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timeStamps: true
});

userSchema.methods.toJSON = function () {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default model("User", userSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - username
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: "John"
 *         surname:
 *           type: string
 *           description: Apellido del usuario
 *           example: "Doe"
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *           example: "johndoe"
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: "password123"
 *         profilePicture:
 *           type: string
 *           description: URL de la foto de perfil del usuario
 *           example: "http://example.com/profile.jpg"
 *         role:
 *           type: string
 *           description: Rol del usuario
 *           example: "USER_ROLE"
 *         status:
 *           type: boolean
 *           description: Estado del usuario (activo/inactivo)
 *           example: true
 *         uid:
 *           type: string
 *           description: ID del usuario
 *           example: "60d0fe4f5311236168a109ca"
 */