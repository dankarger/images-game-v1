import React from 'react'
import './Counter.css'

const ImagesCounter = ({step, stepsTotal, isGameInProgress}) => {

    if (step === 0 || !isGameInProgress) return null;

    const totalImages = stepsTotal-1
    return (
        <div className='images-counter-div'>
            <h3 className='images-counter'>Images :{step} / {totalImages}</h3>
        </div>
    )
}

export default ImagesCounter