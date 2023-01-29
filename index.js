const express = require('express')

const dotenv = require('dotenv').config({path:'./src/config/.env'})

const {mongoose} = require('./src/connection/mongoss')

const apkCine = require('./src/routes/peliculas')

const authe = require('./src/routes/usuario')

const app = express()

const port = process.env.port

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use('/apkPeli',apkCine)

app.use('/authen',authe)

app.listen(port, () => console.log(`Server port listen ${port}!`))