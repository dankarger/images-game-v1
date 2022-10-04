import React from 'react'
import './Score.css'


const Score =({score})=> {

    return(
        <div className='score-container'>
            <div className='score'>SCORE: {score}</div>
        </div>
    )
}
export default Score