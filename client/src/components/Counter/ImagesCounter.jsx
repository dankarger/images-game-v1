import React, {useEffect, useState} from 'react'
import {player} from '../SoundPlayer/player'
import {soundList} from "../constants/soundsList";

import './Counter.css'

const ImagesCounter = ({step, stepsTotal}) => {


    if (step === 0) return null;
    const totalImages = stepsTotal-1
    return (
        <div className='images-counter-div'>
            <h2 className='images-counter'>Images :{step} / {totalImages}</h2>
        </div>
    )
}

export default ImagesCounter