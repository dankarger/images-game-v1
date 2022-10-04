import React, {useEffect, useState} from 'react'
import {player} from '../SoundPlayer/player'
import {soundList} from "../constants/soundsList";

import './Counter.css'

const Counter = ({count}) => {
    const [counter, setCounter] = useState(Number)

    useEffect(() => {
        if (count >= 0) {
            setCounter(count)
            player(soundList['click'])
        }
        else {
            setCounter(0);
            player(soundList['click'])
        }
    }, [count])

    if (counter === 6) return null;
    if (counter < 0) setCounter(0)
    return (
        <div className='counter-div'>
            <h2 className='counter'>{counter}</h2>
        </div>
    )
}

export default Counter