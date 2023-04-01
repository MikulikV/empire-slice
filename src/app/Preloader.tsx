import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export const Preloader: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '100px', mb: '200px' }}>
            <CircularProgress size={100} value={50} />
        </Box>
    );
}