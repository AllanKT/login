import React from 'react';
import { Button } from '@mui/material';
import { colors } from '../../theme/colors';

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
        backgroundColor: variant === 'contained' ? colors.primary : 'transparent',
        color: variant === 'contained' ? '#ffffff' : colors.primary,
        '&:hover': {
          backgroundColor: variant === 'contained' ? colors.primary : `rgba(${colors.primary}, 0.04)`,
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