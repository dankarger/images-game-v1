import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({url, title, photographer, photographer_url}) {
    console.log('url',url)
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="500"
                    image={url}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {/*    Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                    {/*    species, ranging across all continents except Antarctica*/}

                        <a href={photographer_url} target="_blank"> Photo by: {photographer} </a>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/*<Button size="small" color="primary">*/}
                {/*    Share*/}

                {/*</Button>*/}
            </CardActions>
        </Card>
    );
}
