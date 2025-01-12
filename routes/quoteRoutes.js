const express = require('express');
const router = express.Router();
const { 
  createQuote, 
  getQuotes, 
  getQuoteById, 
  updateQuote 
} = require('../controllers/quoteController');

router.get('/', getQuotes);
router.post('/', createQuote);
router.get('/:id', getQuoteById);
router.put('/:id', updateQuote);

module.exports = router; 