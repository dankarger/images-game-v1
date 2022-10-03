import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButton({label, onclick, theme, color = 'primary'}) {
    return (
        <Button color={color} variant={theme} onClick={onclick}>{label}</Button>

    );
}
