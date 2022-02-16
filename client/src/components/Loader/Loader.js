import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './style.css'

const Loader = () => {
    return (
        <div className='loader-container'>
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </div>
    );
}

export default Loader;