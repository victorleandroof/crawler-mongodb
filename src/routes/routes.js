const express = require('express');
const router = express.Router(); 
const DadosController = require('../controllers/DadosController');


router.post('/',DadosController.save);
router.get('/',DadosController.findByUrl);


module.exports = router;

