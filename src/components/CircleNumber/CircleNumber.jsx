import React from 'react';
import { Avatar } from '@mui/material';

const CircleNumber = ({ number, bgcolor = '#6366F1', ...props }) => {
  return (
    <Avatar 
      sx={{ 
        bgcolor: bgcolor,
        width: 32, 
        height: 32,
        ...props.sx
      }}
    >
      {number}
    </Avatar>
  );
};

export default CircleNumber;