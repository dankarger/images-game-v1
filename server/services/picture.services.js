const axios = require("axios");
const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});
const {pickRandomSubject} = require( "../utils/utils")



const getPictureService = async (keyWords) => {
    const options = {
        method: 'GET',
        url:  "https://api.pexels.com/v1/search"
        ,
        params: {query: keyWords},
        headers: {
            "Authorization":process.env.API_KEY,

        }
    };
    return axios.request(options).then(function (response) {
        console.log('hello',response.data.photos)
        if(response.data.photos.length ===0) {
            console.log('no photo')
          return {message:'no-photo'}
        }
        return response.data.photos
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = {getPictureService}