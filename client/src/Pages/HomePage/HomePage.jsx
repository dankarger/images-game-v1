import React, {useEffect, useState} from 'react'
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
    const [totalSteps, setTotalSteps] = useState(4)
    const [showEndGame, setShowEndGame] = useState(false);

    useEffect(() => {
        // const controller = new AbortController();
        // const signal = controller.signal;
        let isCancel = false;
        if (!isCancel &&isGameInProgress && value) {
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
        if (isGameInProgress ) {
            const interval = setInterval(() => {
                setCounter((prev) => prev - 1);
            }, 1000)
            console.log('count',counter)
            return () => {
                clearInterval(interval)
            }
        }
    }, [isGameInProgress]);

    useEffect(() => {
        if (step === totalSteps) {
            // let finaleImagesList = imagesList
            // finaleImagesList.pop();
            // setImagesList(finaleImagesList)
            setIsGameInProgress(false);
            setShowEndGame(true);
            stop()
            setValue('')
            console.log('game-over')
        }
    }, [step])

    // const [imgTitle, setImgTitle] = useState('test');
    const handleStartButtonClick = async () => {
        if (!isGameInProgress) {
            await getImageFromPexelApi(pickRandomSubject());
            activateListenFunction();
            setScore(0)
            setIsGameInProgress(true);

        } else {
            activateListenFunction();
        }
        player(soundList['secondClick'])
    }

    const startAgainFunction = async () => {
            setShowEndGame(false);
            setValue('')
             setIsGameInProgress(false)
            await handleStartButtonClick()
    }

    const handleStopButton = () => {
        setIsGameInProgress(false);
        player(soundList['secondClick'])

    }

    const getImageFromPexelApi = async (query) => {
        try {
            if (step <= totalSteps ) {
                setScore((prev) => prev + counter);
                setStep((prev) => prev + 1)
                const picturesList = await api.get(`/picture?query=${query}`)
                const picture = await pickRandomPicture(picturesList.data);
                const pictureObj = {...picture, imgTitle: query}
                setRandomPicture((prev) => (pictureObj))
                const imagesListCurrent = imagesList
                imagesListCurrent.push(pictureObj)
                setImagesList(imagesListCurrent);
                setCounter(5);
                setValue('');
            }
        } catch (err) {
            console.log(err)
        }

    }

    const activateListenFunction = () => {
        listen()
    }

    return (
        <div className='home-page'>
            {step !== 0 &&
            <Score score={score}/>
            }
            {!isGameInProgress && !showEndGame &&
                <div className="start-button-container">
                    <BasicSelect setTotalStep={setTotalSteps} />
                    <BasicButton label='START' theme={"outlined"} onclick={() => handleStartButtonClick('random')}/>
                </div>
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
                onChange={(event) =>  setValue(event.target.value)}
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