import React, {useEffect, useState} from 'react'
import {player} from '../SoundPlayer/player'
import {soundList} from "../constants/soundsList";

import './Counter.css'

const Counter = ({count, render}) => {
    const [counter, setCounter] = useState(Number)

    useEffect(() => {
        if (count >= 0) {

            setCounter(count)
        } else {
            setCounter(0);
        }
    }, [count, render])

    if (counter === 6) return null;
    if (counter < 0) setCounter(0)
    return (
        <div className='counter-div points-div'>
            <h2 className='counter'>Points: {counter}</h2>
        </div>
    )
}

export default Counter