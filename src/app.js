import express from "express";
//import { pool} from "./db.js";
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
//import {PORT} from './config.js'

const app=express()
//const port=5000
app.use(express.json())
app.use(indexRoutes)
app.use('/api',usuariosRoutes)
// app.get('/',(req,res)=>{
//     res.send('Hola desde la página de inicio')
// })
app.use((req,res,next)=>{
    res.status(404).json({
        message:'Endpoint no encontrado'
    })
})

export default app;