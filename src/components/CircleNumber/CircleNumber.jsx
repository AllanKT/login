import React from 'react';
import { Avatar } from '@mui/material';
import { colors } from '../../theme/colors';

const CircleNumber = ({ number, bgcolor = colors.primary, ...props }) => {
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