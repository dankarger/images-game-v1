import React, {useEffect, useRef, useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture, pickRandomSubject} from "../../utils/utils";
import {useSpeechRecognition} from "../../utils/useSpeechRecognition"
import PictureContainer from "../../components/PictureContainer/PictureContainer";
import Counter from "../../components/Counter/Counter";
import Score from "../../components/Score/Score";
import Backdrop from "../../components/BackDrop/BackDrop";
import {player} from "../../components/SoundPlayer/player";
import {soundList} from "../../components/constants/soundsList";
import BasicSelect from "../../components/Select/Select";
import './HomePage.css'

const HomePage = () => {
    const [randomPicture, setRandomPicture] = useState({
        src: {},
        title: 'random',
    });
    const [imagesList, setImagesList] = useState([]);
    const [value, setValue] = useState('');
    const [tempValue, setTempValue] = useState('');
    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setTimeout(() => {
                setValue(result);
                setTempValue(result)
            }, 500)

        },
    });
    const [isGameInProgress, setIsGameInProgress] = useState(false);
    // const [counter, setCounter] = useState(6);
    const [score, setScore] = useState(0);
    const [step, setStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(4)
    const [showEndGame, setShowEndGame] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined)

    let interval = useRef();
    const inputRef = useRef(null);
    const counter = useRef(6);
    const [render, setRender] = useState(true)
    useEffect(() => {
        // const controller = new AbortController();
        // const signal = controller.signal;
        let isCancel = false;
        if (!isCancel && isGameInProgress && value) {
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
            if (counter.current > 0) {
                interval.current = setInterval(() => {
                    player(soundList['click'])
                    // setCounter((prev) => prev - 1);
                    counter.current -= 1;
                    console.log('count', counter.current);
                    setRender((prev) => !prev)
                }, 1000)
            } else {
                clearInterval(interval.current);
                counter.current = 0;
            }

        } else {
            clearInterval(interval.current);
        }
        return () => {
            clearInterval(interval.current);

        }

    }, [isGameInProgress]);

    useEffect(() => {
        if (step === totalSteps) {
            setIsGameInProgress(false);
            setShowEndGame(true);
            stop()
            setValue('')
            console.log('game-over')
        }
    }, [step])

    const handleStartButtonClick = async () => {
        if (!isGameInProgress) {
            await getImageFromPexelApi(pickRandomSubject());
            activateListenFunction();
            setScore(0)
            setIsGameInProgress(true);
            setTimeout(() => {
                inputRef.current.focus()
            }, 10);

        } else {
            activateListenFunction();
        }
        player(soundList['secondClick'])
    }

    const startAgainFunction = async () => {
        setShowEndGame(false);
        setValue('')
        setIsGameInProgress(false)
    }

    const handleStopButton = () => {
        setIsGameInProgress(false);
        player(soundList['secondClick'])

    }

    const getImageFromPexelApi = async (query) => {
        try {
            if (step <= totalSteps) {
                player(soundList['paper'])
                setScore((prev) => prev + counter.current);
                setStep((prev) => prev + 1)
                const picturesList = await api.get(`/picture?query=${query}`)
                const picture = await pickRandomPicture(picturesList.data);
                const pictureObj = {...picture, imgTitle: query}
                setRandomPicture((prev) => (pictureObj))
                const imagesListCurrent = imagesList
                imagesListCurrent.push(pictureObj)
                setImagesList(imagesListCurrent);
                // setCounter(5);
                counter.current = 5;
                setValue('');
            }
        } catch (err) {
            console.log(err)
        }

    }

    const activateListenFunction = () => {
        listen()
    }

    const handleInputChangeValue = (e) => {
        if (e.key === 'Enter') {
            setValue(tempValue);
            setTempValue('');
        }
        setTempValue(e.target.value)
    }

    return (
        <div className='home-page'>
            {step !== 0 &&
            <Score score={score}/>
            }
            {!isGameInProgress && !showEndGame &&
            <div className="start-button-container">
                <p>How many images? </p>
                <BasicSelect setTotalStep={setTotalSteps}/>
                <br/>
                <BasicButton label='START' theme={"outlined"} onclick={() => handleStartButtonClick('random')}/>
            </div>
            }

            {isGameInProgress &&
            <div className="main-container">
                <PictureContainer pictureObject={randomPicture}/>
                <Counter count={counter.current} render={render}/>
            </div>
            }
            {isGameInProgress &&
            <input
                ref={inputRef}
                value={tempValue}
                onChange={handleInputChangeValue}
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
                <Backdrop score={score} showEndGame={showEndGame} imagesList={imagesList}
                          startAgainFunction={startAgainFunction}/>
            </div>
        </div>
    )
}

export default HomePage