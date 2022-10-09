import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import './Contact.css'

export default function Contact() {
    return (
        <div className='contact-page'>
            <h4>Contact Me</h4>
            <Box sx={{ '& > :not(style)': { m: 3 } }}>
                <Fab color="primary" aria-label="github">
                    <a href="https://github.com/dankarger" target='_blank'> <GitHubIcon /> </a>
                </Fab>
                <Fab  aria-label="linkedin">
                    <a href="https://www.linkedin.com/in/dan-karger-ba36905a/" target='_blank'><LinkedInIcon /></a>
                </Fab>
                <Fab >
                    <a href="mailto:dk.code.org@gmail.com"><EmailIcon /></a>
                </Fab>
            </Box>
        </div>
    );
}
