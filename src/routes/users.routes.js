import { Router } from "express";
import { userManager } from "../dao/models/userManager.js";

const userRouter = Router()

userRouter.get('/', async (req, res) =>{
    const { limit, page } = req.query;
    try {
        const users = await userManager.find(limit, page);
        res.status(200).send({respuesta: 'ok', mensaje: users})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.get('/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const users = await userManager.findById(id)
        if(users){
            res.status(200).send({respuesta : 'OK' , mensaje : users})
        }else{
            res.status(404).send({respuesta: 'Error' , mensaje : 'User not found'})
        }
        
    }catch(error){
        res.status(400).send({respuesta: 'Error' , mensaje : error})
    }
})


userRouter.post('/', async (req, res) =>{
    const {first_name, last_name, age, email, password} = req.body
    try{
        const newUser = await userManager.create({first_name, last_name, age, email, password})
        res.status(200).send({respuesta : 'OK' , mensaje : newUser})
    }catch(error){
        res.status(400).send({respuesta: 'Error' , mensaje : error})
    }
})

userRouter.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {first_name, last_name, ege, email, password} = req.body
    try{
        const users = await userManager.updateById(id, {first_name, last_name, ege, email, password})
        if(users){
            res.status(200).send({respuesta : 'OK' , mensaje : users})
        }else{
            res.status(404).send({respuesta: 'Error' , mensaje : 'User not found'})
        }
    }catch(error){
        res.status(400).send({respuesta: 'Error' , mensaje : error})
    }
})

userRouter.delete('/:id' , async(req, res) =>{
    const {id} = req.params
    try{
        const delate = await userManager.deleteById(id)
        if(delate){
            res.status(200).send({respuesta : 'OK' , mensaje : delate})
        }else{
            res.status(404).send({respuesta: 'Error en eliminar usuario' , mensaje : 'User not found'})
        }
    }catch(error){
        res.status(400).send({respuesta: 'Error', mensaje : error})
    }
})

export default userRouter;