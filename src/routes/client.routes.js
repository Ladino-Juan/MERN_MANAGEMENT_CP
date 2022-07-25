const express = require('express')
const router = express.Router()
const Paciente = require('../models/client')
const jwt = require('jsonwebtoken')
require("dotenv").config({path:__dirname+'/.env'})


//Authorization: Bearer <token>
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('Token requerido')
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send('Token invalido')
    req.user = user
    next()
  })
}

router.get('/:id/api/clientes', verifyToken, async (req, res) => {
  const pacientes = await Paciente.find()
  res.json(pacientes)
})

router.get('/:id/api/clientes/:id', verifyToken, async (req, res) => {
  const paciente = await Paciente.findById(req.params.id)
  res.json(paciente)
})

router.post('/:id/api/clientes', verifyToken, async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    cel,
    fecha_i,
    ultima_c,
    proxima_c,
    procedimiento,
    causa_na,
    hora,
    estado,
  } = req.body

  const paciente = new Paciente({
    nombre,
    apellido,
    email,
    cel,
    fecha_i,
    ultima_c,
    proxima_c,
    procedimiento,
    causa_na,
    hora,
    estado,
  })
  await paciente.save()
  res.json({ status: 'Paciente Guardado' })
})

router.put('/:id/api/clientes/:id', verifyToken, async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    cel,
    fecha_i,
    ultima_c,
    proxima_c,
    procedimiento,
    causa_na,
    hora,
    estado,
  } = req.body
  const newPaciente = {
    nombre,
    apellido,
    email,
    cel,
    fecha_i,
    ultima_c,
    proxima_c,
    procedimiento,
    causa_na,
    hora,
    estado,
  }
  await Paciente.findByIdAndUpdate(req.params.id, newPaciente)
  res.json({ status: 'Paciente Actualizado' })
})

router.post('/login', (req, res) => {
  const usuario = req.body.usuario
  const clave = req.body.clave
  if (usuario == process.env.USER_NAME && clave == process.env.PASSWORD) {
    const datos = {
      id: 'id' + Math.random().toString(16).slice(2),
      nombre: 'David Ladino',
      email: 'juanlc1526@gmail.com',
    }

    const token = jwt.sign(
      { userId: datos.id, email: datos.email },
      process.env.TOKEN_KEY,
      { expiresIn: '1d' },
    )
    let nDatos = { ...datos, token }
    res.status(200).json(nDatos)
  } else {
    res.status(400).send('Credenciales incorrectas')
  }
})

module.exports = router
