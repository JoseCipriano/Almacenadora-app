
import  User  from "./user.model.js";



export const getProfile = async (req, res) => {
    try {

        const usuario = req.usuario;

        res.status(200).json({
            success: true,
            message: "Perfil obtenido correctamente",
            usuario,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el perfil del usuario",
            error: error.message,
        })
        
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')

        return res.status(200).json({
            success: true,
            total: users.lenght,
            users,
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message,
        });
        
    }
};

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);

        if (!user ){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario encontrado",
            user,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: error.message,
        })

        
    }
};

export const getUserByName = async (req, res) => {
    try {

        const { name } = req.params;
        const user = await User.findOne({ name: name });

        if (!user ){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario encontrado",
            user,
        });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: error.message,
        })
        
    }

};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const user = await User.findByIdAndUpdate(id, data, {new : true});

        return res.status(200).json({
            succes: true, 
            msg: 'Usuario Actualizado',
            user
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: error.message,
        })
        
    }

};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const requester = req.usuario;

        if(!requester){
            return res.status(401).json({
                success: false,
                message: "No tienes permisos para eliminar este usuario",
            });
        }

        const userToDelete = await User.findById(uid);
        if(!userToDelete){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        if(requerster.id === userToDelete.id){
            return res.status(401).json({
                success: false,
                message: "No puedes eliminar tu propio usuario",
            });
        }

        await User.findByIdAndDelete(uid);

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente",
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message,
        })

        
    }
}

