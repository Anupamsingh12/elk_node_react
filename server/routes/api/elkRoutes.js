const express = require('express');
const router = express.Router();

const searchRoute = require("../../controllers/searchText");
const filter = require("../../controllers/filter");
const all = require("../../controllers/all");

router.get('/all',all);
router.post('/filter',filter );
router.get('/search',searchRoute );

module.exports = router;