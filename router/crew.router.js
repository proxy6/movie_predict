const express = require('express');
const { getCrewPage, addCrew, getNewMoviePage, addMovie, getPredictionPage, checkPrediction} = require('../controller/crew.controller');
const router = express.Router()
router.get('/crew', getCrewPage)
router.get('/new-movie', getNewMoviePage)
router.post('/add-crew', addCrew)
router.post('/add-movie', addMovie)
router.get('/predict-movie', getPredictionPage)
router.post('/check-prediction', checkPrediction)
module.exports = router