import * as React from 'react';
import Fab from '@mui/material/Fab';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import './Contact.css'

export default function Contact() {
    return (
        <div className='contact-page'>
            <h4>Contact Me</h4>
            <div className='contact-content'>
                <Fab aria-label="github">
                    <a href="https://github.com/dankarger" target='_blank'> <GitHubIcon/> </a>
                </Fab>
                <Fab aria-label="linkedin">
                    <a href="https://www.linkedin.com/in/dan-karger-ba36905a/" target='_blank'><LinkedInIcon/></a>
                </Fab>
                <Fab>
                    <a href="mailto:dk.code.org@gmail.com"><EmailIcon/></a>
                </Fab>
            </div>
        </div>
    );
}
