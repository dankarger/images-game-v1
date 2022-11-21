import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './ImagesList.css'

export default function ImagesList({imagesList}) {

    const numberOfCol = imagesList.length === 4 ? 3 : 5;
    if (!imagesList) return null;
    return (
        <ImageList sx={{width: 600, height: 450, overflowY: 'unset'}} cols={numberOfCol} rowHeight={164}>
            {imagesList.map((item, index) => (
                <ImageListItem sx={{marginTop: 10, width: 100 + '%'}} key={item?.src?.small}>
                    {index !== imagesList.length - 1 &&
                    <a href={item.url} target='_blank'>
                        <img
                            src={`${item?.src?.small}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item?.src?.small}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item?.imgTitle}
                            loading="lazy"
                        />
                        <p className={'image-title'}>{imagesList[index + 1]?.imgTitle}</p>

                    </a>

                    }
                    {imagesList[index + 1] &&
                    <a className='image-credit' href={item?.photographer_url} target='_blank'><p>Photo
                        by: {item?.photographer}</p></a>}
                </ImageListItem>

            ))}
        </ImageList>
    );
}
