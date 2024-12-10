const express = require('express')
const router = express.Router()
const foresDataController = require('./forexDataController')


router.post('/get-forex-data', foresDataController.getData)

module.exports = { router }