const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')
const Compra = require('../models/compra')



const logIn = async (req, res) => {

    try {
        const { usuario, password } = req.body

        const err1 = "Error de usuario y/o contraseña'"

        if (!usuario || !password) return res.status(500).json(err1)

        const results = await Usuario.findOne({ usuario })

        if (!results) return res.status(500).json(err1)

        const pass = bcrypt.compareSync(password, results.password)

        if (pass) {
            const token = jwt.sign({ id: usuario }, process.env.jwt, {
                expiresIn: process.env.jwtTime
            })

            return res.status(200).json({
                token
            })
        } else {
            return res.status(500).json(500)
        }

    } catch (error) {
        res.status(500).json('Error de validacion')
    }

}

const singIng = async (req, res) => {

    try {
        const { usuario, correo } = req.body
        const pass = req.body.password

        const boolUser = await Usuario.findOne({ usuario })

        const boolCorr = await Usuario.findOne({ correo })

        if (boolUser || boolCorr)
            return res.status(500).json('Usuario y/o correo existentes')

        const password = bcrypt.hashSync(pass, 11)

        const results = await Usuario.create({ usuario, password, correo })

        res.status(500).json(results)


    } catch (error) {
        return res.status(500).json('Error, intente nuevamente')
    }
}

const isAuth = (req, res, next) => {
    const { apkcine } = req.headers
    if (apkcine) {
        try {
            var decoded = jwt.verify(apkcine, process.env.jwt);
            
            next()
        } catch (err) {
            console.log("jwt error")
            return res.status(400).json({ status: '404' })
        }
    } else {
        console.log("header error")

        return res.status(400).json({ status: '404' })
    }
}

module.exports = { logIn, singIng, isAuth }