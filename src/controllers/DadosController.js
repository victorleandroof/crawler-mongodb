const Dados = require('../models/Dados')
const CrawlerSearch = require('./CrawlerSearch');
const rp = require('request-promise')
const cheerio = require('cheerio')

module.exports = {
   async save(req,res){
      var dados = new Dados({...req.body});
      const errorsValidate = dados.validateSync();
      if(errorsValidate){
        return res.status(400).json(errorsValidate);
      }
      const options = {
        uri: dados.urlTarget,
        transform: function (body) {
          return cheerio.load(body)
        }
      } 
      var textos = [];   
      await rp(options).then(($) => {
       $('body p').each((i, item) => {
            textos.push($(item).text());
        });
      }).catch((err) => {
        return res.status(500).json(err);
      });
      dados.textos = textos;
      console.log(dados.textos);
      try{
        const dadosSaved = await dados.save();
        return res.status(200).json(dadosSaved); 
      }catch(err){
         return res.status(400).json(err)
      }
   },

   async findByUrl(req,res){
     const { url } = req.headers;
     if(url){
      const dados = await Dados.findOne({ urlTarget : url});
      return res.json(dados);
     }
     return res.status(400).json({msg:"url nao informada"});
   }
}