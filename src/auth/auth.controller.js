import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}

const AddUserAdmin = async () => {
    try {

    const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

    if (adminExists) {
        console.log("El usuario de administrador ya existe, no se puede crear otro");
        return;
    }

    const hashedPassword = await hash("123Lun@-");

    const userAdmin = new User({
        name: "Cristian",
        surname: "Luna",
        username: "Administrador",
        email: "cluna123@gmail.com",
        password: hashedPassword,
        profilePicture: null,
        role: "ADMIN_ROLE"
    });

    await userAdmin.save();
    console.log("Administrador creado exitosamente");
    } catch (error) {
    console.error("Error al verificar o crear el Administrador:", error.message);
    }
};

export default AddUserAdmin;