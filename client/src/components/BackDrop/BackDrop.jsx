import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import ImagesList from "../ImagesList/ImagesList";
import Credits from "../Credits/Credits";
import './BackDrop.css'

export default function SimpleBackdrop({score, showEndGame, imagesList, startAgainFunction}) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        if(showEndGame) setOpen(true);

        return ()=>{
            setOpen(false)
        }
    },[showEndGame])

    if(!showEndGame) return null;

    return (
        <div >
            {!open &&
                <div className="buttons-div">
                    <Button variant="contained" onClick={handleToggle}>Show Score And Pictures</Button>
                    <Button variant="outlined" color='success' onClick={startAgainFunction}>Start Again</Button>
                </div>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                {/*<CircularProgress color="inherit" />*/}
                <div className="backdrop-content">
                    <div className="message">
                        <h1>Game Over</h1>
                        <h2>Your Score : {score}</h2>
                        <p>click anywhere to continue</p>
                    </div>
                    <ImagesList imagesList={imagesList}/>
                    <div className="credits-div">
                        <h1>credit:</h1>
                        <Credits imageList={imagesList} />
                    </div>
                </div>

            </Backdrop>
        </div>
    );
}
