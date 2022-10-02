import React, {useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture } from "../../utils/utils";
import {useSpeechRecognition} from "../../utils/useSpeechRecognition"
import Picture from "../../components/Picture/Picture"
import './HomePage.css'

const HomePage = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [randomPicture, setRandomPicture] = useState({
        src:{},
        title:'raNDOM',

    });
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },
    });


    // const [imgTitle, setImgTitle] = useState('test');
    const handleStartButtonClick = async (query)=>{
      console.log('start')
      const picturesList =  await api.get(`/picture?query=${query}`)
       const picture = await pickRandomPicture(picturesList.data);
          // setImgTitle(prev=>query)
        // console.log('pic',picture)
        setImageUrl(picture.src.original)
        const pictureObj = {...picture,title2:query}
        // setRandomPicture({...picture, title: query})
        setRandomPicture(pictureObj)
        console.log('title',pictureObj)
    }


    return (
        <div className='home-page'>
            HOMEPAGE
            <BasicButton label='start' theme={"outlined"} onclick={()=>handleStartButtonClick('test2')} />
            { imageUrl.length >0 && <Picture url={randomPicture.src.original} title={randomPicture?.title2}/> }
            {/*<img src={imageUrl?.src.medium}/>*/}


            <textarea
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button onMouseDown={listen} onMouseUp={stop}>
                🎤
            </button>
            {listening && <div>Go ahead I'm listening</div>}


        </div>
    )
}

export default HomePage