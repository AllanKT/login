import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ 
  children, 
  startIcon, 
  endIcon, 
  variant = 'contained', 
  color = 'primary',
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: '25px',
        padding: '8px 24px',
        textTransform: 'none',
        backgroundColor: variant === 'contained' ? '#6366F1' : 'transparent',
        color: variant === 'contained' ? '#ffffff' : '#6366F1',
        '&:hover': {
          backgroundColor: variant === 'contained' ? '#4F46E5' : 'rgba(99, 102, 241, 0.04)',
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;