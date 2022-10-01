import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButton({label,onclick,theme}) {
    return (
            <Button variant={theme} onClick={onclick}>{label}</Button>

    );
}
