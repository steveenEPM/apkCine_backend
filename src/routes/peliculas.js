const Routers = require('express').Router()

const {addPeli,ticket,allTicket,ticket2,getPelis} = require('../controller/peliculas')
const {isAuth} = require('../controller/usuario')

Routers.post('/addPelicula',addPeli)

Routers.post('/getPelis',getPelis)

Routers.get('/hola',(req,res)=>{
    res.json('hola mundo')
})

Routers.post('/ticket',isAuth,ticket)

Routers.post('/allTicket',allTicket)

Routers.post('/ticket2',ticket2)

module.exports = Routers