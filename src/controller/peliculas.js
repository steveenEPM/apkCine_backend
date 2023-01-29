const { uuid } = require("uuidv4")
const Asientos = require("../models/Asientos")
const Pelicula = require('../models/pelicula')
const Compra = require('../models/compra')
const {getRandomInt,verifyJWT} = require("../utils/funciones")
const { Peli } = require('../utils/peli')


const addPeli = (req, res) => {
    const { titulo, descripcion, calificacion } = req.body
    console.log(titulo)
    new Promise(async (resolve, reject) => {
        try {
            const isExits = await Pelicula.findOne({ titulo })

            if (isExits) reject('Este usuario existe')

            const result = Pelicula.create({ titulo, descripcion, calificacion })

            if (result) {
                resolve(result)
            }

        } catch (error) {
            console.log(error);
            reject('Error de validacion')
        }
    }).then(element => {
        const pelicula = element.titulo
        for (let silla = 1; silla < 45; silla++) {
            try {
                let estado = false
                const results = Asientos.create({ silla, pelicula, estado })
            } catch (error) {
                console.log(silla);
                return
            }

        }
        return res.status(200).json('Pelicula agregada')
    }).catch(error => {
        return res.status(500).json(error)
    })
}

const ticket = (req, res) => {
    const { pelicula, silla } = req.body
    const usuario = verifyJWT(req.headers.apkcine)
    let estado = true

    new Promise(async (resolve, reject) => {
        try {
            const search = await Asientos.findOne({ pelicula, silla })
            if (!search) reject('No se a encontrado la Pelicula')
            resolve(search)
        } catch (error) {
            console.log(error);
            reject('Error de asignacion')
        }

    }).then(e => {
        const bool = e.estado
        if (bool) {
            // console.log("Este asiento esta reservado");
            throw "Este asiento esta reservado"
        } else {
            let estado = true
            Asientos.updateOne({ pelicula, silla }, { estado }).then((ress) => {
                Compra.create({silla,pelicula,usuario}).then((e)=>{
                    res.status(200).json("Compra Adquirida")
                }).catch(err =>{
                    console.log(err);
                })
            }).catch(e => {
                res.status(500).json('Error de asignacion')
            })
        }


    })
        .catch((error) => {
            //console.log(error, "2");
            res.status(500).json(error)
        })




}


const ticket2 = async (req, res) => {
    try {
        const estado = true
        Peli.forEach(e => {
            const pelicula = e.nombre

            for (let index = 0; index < 20; index++) {
                let silla = getRandomInt(1, 50)
                Asientos.updateOne({ pelicula, silla }, { estado })
                    .then((e) => {
                        console.log(`Asiento ${silla} de la pelicula ${pelicula} reservada`)
                    }).catch(error => {
                        console.log(error);
                    })

            }
        })
        return res.status(200).json('')
    } catch (error) {
        console.log(error);
        return res.status(500).json('')
    }
}

const allTicket = async (req, res) => {
    try {
        const { pelicula } = req.body
        const result = await Asientos.find({ pelicula })

        if (!result) return res.status(500).json('No se a encontrado la pelicula')

        return res.status(200).json(result)


    } catch (error) {
        return res.status(500).json('Intente mas tarder')
    }
}

module.exports = { addPeli, ticket, allTicket, ticket2 }