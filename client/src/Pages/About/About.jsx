import React from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './About.css'

const About = () => {

    return (
        <div className='about-page'>
            <div className="about-content">
                <div className="">
                    <h1 className='about-h1'>About this game</h1>
                    <h2 className='about-h2'>This game was created by &nbsp;<a href="https://github.com/dankarger" target='_blank'>Dan Karger</a>&nbsp; with:</h2>
                </div>

                <h3 className='about-h3'><ControlPointIcon className='icon' /><a href="https://reactjs.org/">React</a>&nbsp; and &nbsp;<a href="https://mui.com/" target='_blank'>MUI</a></h3>
                <h3 className='about-h3'><ControlPointIcon className='icon'/>Web-Speech-Api and the "<a
                    href="https://www.npmjs.com/package/react-speech-kit"
                    target='_blank'>react-speech-kit </a>" by &nbsp; <a href="https://github.com/MikeyParton" target='_blank'> MikeyParton</a>"</h3>
                <h3 className='about-h3'><ControlPointIcon className='icon'/>All Images are from the &nbsp; <a href="https://www.pexels.com/api/" target='_blank'>Pexel API</a>   </h3>
            </div>
            <p className='about-p'> <StarOutlineIcon /> Thanks to all the photographers and Pexel.com for all the Pictures, and MikeyParton for his package to easily work with Web-Speech-Api in React </p>
        </div>
    )
}

export default About