import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import ImagesList from "../ImagesList/ImagesList";

export default function SimpleBackdrop({score, showEndGame, imagesList}) {
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
        <div>
            {!open &&
            <Button variant="outlined" onClick={handleToggle}>Show Score And Pictures</Button>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                {/*<CircularProgress color="inherit" />*/}
                <div className="message">
                    <h1>Game Over</h1>
                    <h2>Your Score : {score}</h2>
                </div>
                <ImagesList imagesList={imagesList}/>

            </Backdrop>
        </div>
    );
}
