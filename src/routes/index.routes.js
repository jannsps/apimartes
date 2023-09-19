import { Router } from "express";
import { prueba } from "../controllers/index.controller.js";


const router=Router()
//ruta de prueba a db
router.get('/prueba',prueba)
export default router