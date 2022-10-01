import React, {useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture} from "../../utils/utils";
import Picture from "../../components/Picture/Picture"
import './HomePage.css'

const HomePage = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [randomPicture, setRandomPicture] = useState({
        src:{},

    })
    const handleStartButtonClick=async ()=>{
        console.log('start')
      const picturesList =  await api.get('/picture?query=test')
       const picture = await pickRandomPicture(picturesList.data)
        console.log('pic',picture)
        setImageUrl(picture.src.original)
        setRandomPicture(picture)
    }


    return (
        <div className='home-page'>
            HOMEPAGE
            <BasicButton label='start' theme={"outlined"} onclick={handleStartButtonClick} />
            { imageUrl && <Picture url={randomPicture.src.original} title={randomPicture.alt}/> }
            {/*<img src={imageUrl?.src.medium}/>*/}
        </div>
    )
}

export default HomePage