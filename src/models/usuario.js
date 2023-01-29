const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    usuario:{
        type:String,
        unique:true,
        max:10,
        require:true
    
    },
    correo:{
        type:String,
        unique:true,
        max:20,
        require:true
    },
    password:{
        type:String,
        min:4,
        require:true
    }

})

module.exports = mongoose.model('Usuario',Schema)