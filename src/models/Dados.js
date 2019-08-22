const {Schema, model} = require('mongoose');

const DadosSchema = new Schema({
  urlTarget:{
    type:String,
    required:true,
    unique:true
  },
  textos:[]
});

module.exports = model('Dado',DadosSchema);