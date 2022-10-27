const pictureService = require('../services/picture.services');

const getPicture = async (req, res) => {
    try {
    const keyWords= req.query.query
        console.log('k',keyWords)
        if(typeof keyWords !== 'string' || keyWords.length > 20 ) {
            res.status(400).json({message: 'not valid'})
        }
        let picture = await pictureService.getPictureService(keyWords)

        if(picture.message === 'no-photo') {
            picture = await pictureService.getPictureService('error')
            res.status(200).send(picture);
        }else {
            res.status(200).send(picture);
        }

    }
    catch(e){
        res.status(400).json({message: 'data not found' + e.message})

    }

}

module.exports = {getPicture}