const express = require('express');
const pictureRoute = express.Router();
const pictureController = require('../controller/picture.controller')

pictureRoute.get('/picture', pictureController.getPicture)

module.exports = pictureRoute;
