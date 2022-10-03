import React from 'react'
import Picture from '../Picture/Picture'

const PictureContainer = ({pictureObject}) => {
    const {
        imgTitle, photographer, photographer_url
    } = pictureObject;
    const url = pictureObject.src.large
    console.log('con', pictureObject)
    if (!url) return null;
    return (
        <div>
            <Picture url={url} title={imgTitle} photographer_url={photographer_url} photographer={photographer}/>
        </div>
    )
}
export default PictureContainer