import { json } from "express"
import { pool } from "../db.js"


export const getUsuarios=async(req,res)=>{
    try {
        const [rows]=await pool.query('SELECT * FROM usuarios')
        res.send(rows)    
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un Error'})
    }
    
    }
    export const getUsuario=async(req,res)=>{
        //console.log(req.params)
        const {id}=req.params
        try {
            const [rows]=await pool.query('SELECT * FROM usuarios WHERE id=?',[id])
            if (rows.length==0)return res.status(404).json({
                message:'Usuario no ha sido registrado'
            })
            res.send(rows[0])    
        } catch (error) {
            res.status(500).json({message:'Ha ocurrido un Error'})
        }
        
        }
export const createUsuario=async(req,res)=>{
    const {nombre,apellido,direccion}=req.body
   try {
    const [rows]=await pool.query('INSERT INTO usuarios (nombre,apellido,direccion) VALUES (?,?,?)',[nombre,apellido,direccion])
    console.log(req.body)
    console.log(rows)
    res.send({
        id:rows.insertId,
        nombre,
        apellido,
        direccion
    })
   } catch (error) {
    res.status(500).json({message:'Ha ocurrido un Error'})
   }
}
export const updateUsuario=async(req,res)=>{
    const {id}=req.params
    const {nombre,apellido,direccion}=req.body
   try {
    const [result]=await pool.query('UPDATE usuarios SET nombre=IFNULL(?,nombre),apellido=IFNULL(?,apellido),direccion=IFNULL(?,direccion) WHERE id=?',[nombre,apellido,direccion,id])
    if (result.affectedRows<=0)return res.status(404).json({
        message:'Usuario no encontrado'
    })
    //res.json('Modificado!')
    //consultamos el registro modificado
    const [rows]=await pool.query('SELECT * FROM usuarios WHERE id=?',[id])
    res.json(rows[0])
   } catch (error) {
    res.status(500).json({message:'Ha ocurrido un Error'})
   }
}
export const deleteUsuario=async(req,res)=>{
    const {id}=req.params
        try {
            const [result]=await pool.query('DELETE FROM usuarios WHERE id=?',[id])
            if (result.affectedRows<=0)return res.status(404).json({
                message:'Usuario no encontrado'
            })
            console.log(result)
            res.send(204)
        } catch (error) {
            res.status(500).json({message:'Ha ocurrido un Error'})
        }
}