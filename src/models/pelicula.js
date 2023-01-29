const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
        unique:true,
        min:1,
        max:120
    },
    descripcion:{
        type:String,
        required:true,
        max:220,
    },
    calificacion:{
        type:String,
        required:true,
    }

},{timestamps:true})


module.exports = mongoose.model("Pelicula",Schema)
