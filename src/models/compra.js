const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    silla:{ type: String, required: true },
    pelicula: { type: String, required: true},
    usuario:{type:String,require:true}
},
{
  timestamps: true,
})

module.exports = mongoose.model('Compra',Schema)