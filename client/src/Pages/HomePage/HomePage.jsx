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
        await getImageFromPexelApi('random');
        activateListenFunction()
    }

    const getImageFromPexelApi = async (query)=>{
        console.log('start')
        const picturesList =  await api.get(`/picture?query=${query}`)
        const picture = await pickRandomPicture(picturesList.data);
        setImageUrl(picture.src.original)
        const pictureObj = {...picture,imgTitle:query}
        setRandomPicture((prev)=>(pictureObj))
        // setRandomPicture((prev)=>({...prev,title:query}))
    }

    const activateListenFunction = ()=>{
        listen()
    }

    return (
        <div className='home-page'>
            HOMEPAGE
            <BasicButton label='start' theme={"outlined"} onclick={()=>handleStartButtonClick('random')} />
            { imageUrl.length >0 && <Picture url={randomPicture.src.original} title={randomPicture?.imgTitle}/> }
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