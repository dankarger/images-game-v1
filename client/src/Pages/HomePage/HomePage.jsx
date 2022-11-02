import React, {useEffect, useRef, useState} from 'react'
import BasicButton from "../../components/Button/Button";
import api from "../../Api/Api";
import {pickRandomPicture, pickRandomSubject} from "../../utils/utils";
import {useSpeechRecognition} from "../../utils/useSpeechRecognition"
import PictureContainer from "../../components/PictureContainer/PictureContainer";
import Counter from "../../components/Counter/Counter";
import Score from "../../components/Score/Score";
import ImagesCounter from "../../components/Counter/ImagesCounter";
import Backdrop from "../../components/BackDrop/BackDrop";
import {player} from "../../components/SoundPlayer/player";
import {soundList} from "../../components/constants/soundsList";
import BasicSelect from "../../components/Select/Select";
import Instructions from "../../components/Instructions/Instructions";
import CustomizedSwitches from "../../components/Switch/Switch";
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
            setScore((prev) => prev + counter.current);
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
    let sound = useRef(true)

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
                    player(soundList['click'], sound.current)
                    // setCounter((prev) => prev - 1);
                    if (counter.current > 0) counter.current -= 1;

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
        player(soundList['secondClick'], sound.current)
    }

    const startAgainFunction = async () => {
        setShowEndGame(false);
        setValue('')
        setIsGameInProgress(false);
        setTempValue('')
        setImagesList([]);
        setStep(0);
        setTotalSteps(4);
        setScore(0);
        stop()
    }

    const handleStopButton = () => {
        setIsGameInProgress(false);
        player(soundList['secondClick'], sound.current)

    }

    const getImageFromPexelApi = async (query) => {
        try {
            if (step <= totalSteps) {
                player(soundList['paper'], sound.current)
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
                setTempValue('');
            }
        } catch (err) {
            console.log(err)
            setErrorMessage(err.message)
        }

    }

    const activateListenFunction = () => {
        listen()
    }

    const handleInputChangeValue = (e) => {
        setTempValue(e.target.value)
    }
    const handleOnKeyDown = (e) => {

        if (e.key === "Enter") {
            console.log('enter')
            e.preventDefault();
            setScore((prev) => prev + counter.current);
            setTimeout(() => {
                setValue(tempValue);
                setTempValue('');
            }, 500)

        }
    }
    const handleSoundSwitchChange = (e) => {
        //
        // setIsMute(prev=>!prev)
        sound.current = e.target.checked;
        console.log('mute', sound.current)
    }

    return (
        <div className='home-page'>
            {/*<section>*/}

            <div className="top-div">
                <div className="sound-option-div">
                    <CustomizedSwitches handleSoundSwitchChange={handleSoundSwitchChange}/>
                </div>
                {step !== 0 &&
                <div className="score-div">
                    <Score score={score}/>
                    <ImagesCounter step={step} stepsTotal={totalSteps} isGameInProgress={isGameInProgress}/>
                </div>
                }
            </div>

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
            <form action="#">
                <input
                    ref={inputRef}
                    value={tempValue}
                    onChange={handleInputChangeValue}
                    onKeyDown={handleOnKeyDown}
                />
            </form>

            }
            {!isGameInProgress && !showEndGame && <Instructions/>}
            {isGameInProgress &&
            // <textarea

            <div className='buttons-div'>
                <BasicButton label='PAUSE' theme={"outlined"} color={'error'} onclick={stop}/>
                <BasicButton label='STOP' theme="contained" color={'error'} onclick={handleStopButton}/>
            </div>
            }

            <div className='backdrop-container'>
                <Backdrop score={score} showEndGame={showEndGame} imagesList={imagesList}
                          startAgainFunction={startAgainFunction}/>
            </div>
            {errorMessage && <h4>{errorMessage}</h4>}
            {/*</section>*/}
        </div>
    )
}

export default HomePage