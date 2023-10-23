import { Router } from "express";
import { userModel } from "../dao/models/users.models.js";

const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ resultado: 'Email no registrado' });
        }
        if (req.session && req.session.user) {
            if (req.session.user.email == email && req.session.user.password == password) {
                const user = await userModel.findOne({ email: email });
                const userToCookie = {
                    _id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                };
                res.cookie('userData', userToCookie, { maxAge: 3600000, httpOnly: false }); // Duración de 1 hora para esta cookie
                return res.status(200).json({ resultado: 'Ya tiene una sesión activa' });

            }
        }
    
        if (user.password !== password) {  
            return res.status(401).json({ resultado: 'Contraseña incorrecta' });
        }

        req.session.user = user;
        const userToCookie = {
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
        };
        res.cookie('userData', userToCookie, { maxAge: 3600000, httpOnly: false }); // Duración de 1 hora para esta cookie
        return res.status(200).json({ resultado: 'Login valido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ resultado: 'Error interno' });
    }
});

sessionRouter.get('/logout', (req, res) => {
    if (req.session && req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al destruir la sesión:", err);
                res.status(500).send({ resultado: 'Error interno al desloguear' });
            } else {
                res.clearCookie('userData'); 
                res.status(200).send({ resultado: 'Usuario deslogueado' });
            }
            
        });
    }
        ;
})

export default sessionRouter