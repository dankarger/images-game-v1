import React, {useEffect, useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture } from "../../utils/utils";
import {useSpeechRecognition} from "../../utils/useSpeechRecognition"
import Picture from "../../components/Picture/Picture";
import Counter from "../../components/Counter/Counter";

import './HomePage.css'

const HomePage = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [randomPicture, setRandomPicture] = useState({
        src:{},
        title:'raNDOM',

    });
    const [imagesList, setImagesList] = useState([]);
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setTimeout(()=>{
                setValue(result);
            },500)

        },
    });
    const [ isGameInProgress, setIsGameInProgress] = useState(false);
    const [counter, setCounter ] = useState(0)

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        let isCancel = false;
        console.log('listenValue',value);
        console.log('listenting',listening)
        if(!isCancel && value ){
            // setTimeout(()=>{
                getImageFromPexelApi(value).then(res=>console.log('res',res))
            // },1000)
        }
       return()=>{
            console.log('cancel request');
            isCancel=true;
       }
    },[value])

    // const [imgTitle, setImgTitle] = useState('test');
    const handleStartButtonClick = async ()=>{
        if(!isGameInProgress){
            await getImageFromPexelApi('random');
            activateListenFunction();
            setIsGameInProgress(true);
        }
        else {
            activateListenFunction();
        }
    }
    const handleStopButton =() =>{
        setIsGameInProgress(false);

    }
    const getImageFromPexelApi = async (query)=>{
        console.log('start')
        const picturesList =  await api.get(`/picture?query=${query}`)
        const picture = await pickRandomPicture(picturesList.data);
        setImageUrl(picture.src.original)
        const pictureObj = {...picture,imgTitle:query}
        setRandomPicture((prev)=>(pictureObj))
        // setRandomPicture((prev)=>({...prev,title:query}))
        // setImagesList((prev)=>prev.push(pictureObj));
        // console.log('list',imagesList)
        setCounter((prev)=>prev+1)
    }

    const activateListenFunction = ()=>{
        listen()
    }

    return (
        <div className='home-page'>
            HOMEPAGE
            <Counter count={counter} />
            <BasicButton label='START' theme={"outlined"} onclick={()=>handleStartButtonClick('random')} />
            { imageUrl.length >0 && <Picture url={randomPicture.src.original} title={randomPicture?.imgTitle}/> }
            {/*<img src={imageUrl?.src.medium}/>*/}
            <div className='buttons-div'>
                <BasicButton label='PAUSE' theme={"outlined"} color={'error'} onclick={stop} />
                <BasicButton label='STOP' theme="contained" color={'error'} onclick={handleStopButton} />
            </div>

            <textarea
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            {/*<button onMouseDown={listen} onMouseUp={stop}>*/}
            {/*    🎤*/}
            {/*</button>*/}
            {/*{listening && <div>Go ahead I'm listening</div>}*/}

        </div>
    )
}

export default HomePage