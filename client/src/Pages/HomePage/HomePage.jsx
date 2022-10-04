import React, {useEffect, useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture} from "../../utils/utils";
import {useSpeechRecognition} from "../../utils/useSpeechRecognition"
import PictureContainer from "../../components/PictureContainer/PictureContainer";
import Counter from "../../components/Counter/Counter";
import Score from "../../components/Score/Score";
import Backdrop from "../../components/BackDrop/BackDrop";

import './HomePage.css'


const HomePage = () => {
    const [randomPicture, setRandomPicture] = useState({
        src: {},
        title: 'random',
    });
    const [imagesList, setImagesList] = useState([]);
    const [value, setValue] = useState('');
    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setTimeout(() => {
                setValue(result);
            }, 500)

        },
    });
    const [isGameInProgress, setIsGameInProgress] = useState(false);
    const [counter, setCounter] = useState(6);
    const [score, setScore] = useState(0);
    const [step, setStep] = useState(0);
    const [showEndGame, setShowEndGame] = useState(false);

    useEffect(() => {
        // const controller = new AbortController();
        // const signal = controller.signal;
        let isCancel = false;
        if (!isCancel && value) {
            // setTimeout(()=>{
            getImageFromPexelApi(value).then(res => console.log('res', res))
            // },1000)

        }
        return () => {
            console.log('cancel request');
            isCancel = true;
        }
    }, [value]);

    useEffect(() => {
        if (isGameInProgress) {
            const interval = setInterval(() => {
                setCounter((prev) => prev - 1)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isGameInProgress]);

    useEffect(()=>{
        if(step===3) {
            setIsGameInProgress(false);
            setShowEndGame(true)
            console.log('game-over')
        }
    },[step])

    // const [imgTitle, setImgTitle] = useState('test');
    const handleStartButtonClick = async () => {
        if (!isGameInProgress) {
            await getImageFromPexelApi('random');
            activateListenFunction();
            setScore(0)
            setIsGameInProgress(true);
        } else {
            activateListenFunction();
        }
    }
    const handleStopButton = () => {
        setIsGameInProgress(false);

    }
    const getImageFromPexelApi = async (query) => {

        try {
            setScore((prev)=>prev + counter);
            const picturesList = await api.get(`/picture?query=${query}`)
            const picture = await pickRandomPicture(picturesList.data);
            const pictureObj = {...picture, imgTitle: query}
            setRandomPicture((prev) => (pictureObj))
            const imagesListCurrent = imagesList
            imagesListCurrent.push(pictureObj)
            setImagesList(imagesListCurrent);
            setCounter(5);
            setStep((prev)=>prev+1)
        } catch (err) {
            console.log(err)
        }

    }

    const activateListenFunction = () => {
        listen()
    }

    return (
        <div className='home-page'>
            {step !==0 &&
            <Score score={score}/>
            }
            {!isGameInProgress &&
            <BasicButton label='START' theme={"outlined"} onclick={() => handleStartButtonClick('random')}/>
            }

            {isGameInProgress &&
            <div className="main-container">
                <PictureContainer pictureObject={randomPicture}/>
                <Counter count={counter}/>
            </div>
            }
            {isGameInProgress &&
            <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            }
            {isGameInProgress &&
            // <textarea

                <div className='buttons-div'>
                <BasicButton label='PAUSE' theme={"outlined"} color={'error'} onclick={stop}/>
                <BasicButton label='STOP' theme="contained" color={'error'} onclick={handleStopButton}/>
                </div>
            }
            {/*<button onMouseDown={listen} onMouseUp={stop}>*/}
            {/*    🎤*/}
            {/*</button>*/}
            {/*{listening && <div>Go ahead I'm listening</div>}*/}
            <div className='backdrop-container'>
                 <Backdrop score={score} showEndGame={showEndGame}/>
            </div>

        </div>
    )
}

export default HomePage