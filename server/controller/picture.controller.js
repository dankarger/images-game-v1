const pictureService = require('../services/picture.services');

const getPicture = async (req, res) => {
    try {
    const keyWords= req.query.query
        console.log('k',keyWords)
        const picture = await pictureService.getPictureService(keyWords)
        res.status(200).send(picture);
    }
    catch(e){
        res.status(400).json({message: 'data not found' + e.message})

    }

}

module.exports = {getPicture}