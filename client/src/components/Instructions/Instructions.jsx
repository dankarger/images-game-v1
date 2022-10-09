import React from "react";
import './Instructions.css'

const Instructions=()=>{
    return(
        <div className='instructions'>
            <h3 className={'heading'} data-text={'Instructions:'}>Instructions:</h3>
            <div className="text">
                <h4> - The goal of the game is to say (or write) the first association when given a picture.</h4>
                <h4> - The first picture given is random and the following is depending on your input.</h4>
                <h4> - You can speak (after enabling the mic for this site ) or write (and press Enter) your answer. </h4>
                <h4> - The faster you say or write your association the higher points you get. </h4>
                <h4> - Try not to repeat your answers (it is harder than its sound).</h4>
                <h4> - Choose How many images you want to play and press Start. </h4>
                <h4>  -- The speech detection sometimes make mistake in capturing your speech,  but most of the time the result is  funny  and make part of the fun :) </h4>
                <h4>  ---  Have Fun  ---  </h4>
            </div>

        </div>
    )
}
export default Instructions