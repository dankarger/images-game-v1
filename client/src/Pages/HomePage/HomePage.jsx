import React, {useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture} from "../../utils/utils";

const HomePage = () => {
    const [imageUrl, setImageUrl] = useState('')
    const handleStartButtonClick=async ()=>{
        console.log('start')
      const picturesList =  await api.get('/picture?query=test')
       const picture = pickRandomPicture(picturesList.data)
        console.log('pic',picture)
    }


    return (
        <div>
            HOMEPAGE
            <BasicButton label='start' theme={"outlined"} onclick={handleStartButtonClick} />
        </div>
    )
}

export default HomePage