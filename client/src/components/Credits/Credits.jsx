import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Credits({imageList}) {

    console.log('iiiii', imageList)
    const injectRows = () => {
        return imageList.map((image, index) => {
            return (
                <div>
                    <p>{index + 1}</p>
                    <a href={image.photographer_url} target='_blank'>{image.photographer} </a>
                </div>
            )
        })
    }
    console.log('rows', injectRows())

    return (
        <div>
            {imageList && injectRows()}
        </div>
    )
}
