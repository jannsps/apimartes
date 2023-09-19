// import express from "express";
// import { pool} from "./db.js";
// import usuariosRoutes from './routes/usuarios.routes.js'
// import indexRoutes from './routes/index.routes.js'
import app from './app.js'
import {PORT} from './config.js'



app.listen(PORT)
console.log(`Servidor corriendo en port ${PORT}`)