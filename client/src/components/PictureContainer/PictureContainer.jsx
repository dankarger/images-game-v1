import React from 'react'
import Picture from '../Picture/Picture'
import Counter from "../Counter/Counter";

const PictureContainer = ({pictureObject}) => {
    const {
        imgTitle, photographer, photographer_url
    } = pictureObject;
    const url = pictureObject?.src.large
    if (!url) return null;
    return (
        <div className='picture-container'>
            <Picture url={url} title={imgTitle} photographer_url={photographer_url} photographer={photographer}/>
        </div>
    )
}
export default PictureContainer