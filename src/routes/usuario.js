const { logIn,singIng } = require('../controller/usuario')



const Routers = require('express').Router()

Routers.post('/logIn',logIn)

Routers.post('/singIng',singIng)

module.exports = Routers