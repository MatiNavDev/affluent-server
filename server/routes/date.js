const express = require('express');

const {
  getDates
} = require('../controllers/date');

const router = express.Router();

router.get('/', getDates);

module.exports = router;