import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({setTotalStep}) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);

        setTotalStep(event.target.value)
        console.log('e',event.target.value)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Steps</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Step"
                    onChange={handleChange}
                >
                    <MenuItem value={4}>Three</MenuItem>
                    <MenuItem value={6}>Five</MenuItem>
                    <MenuItem value={11}>Ten</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
