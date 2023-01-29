const mongoose = require('mongoose')


const Schema = mongoose.Schema(
    {
      silla:{ type: String, required: true },
      pelicula: { type: String, required: true},
      estado:{ type:Boolean, required:true}

    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Asientos", Schema);