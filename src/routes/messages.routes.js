import { Router } from "express"
import { messageManager } from "../dao/models/messagesManager.js";

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const message = await messageManager.findAll(limit);
        res.status(200).send({respuesta: 'ok', mensaje: message})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

messageRouter.post('/', async (req, res) => {
    const {email, message} = req.body
    try {
        const respuesta = await messageManager.create({email, message});
        res.status(200).send({respuesta: 'OK message send', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error sending message', mensaje: error})
    }
})

export default messageRouter;