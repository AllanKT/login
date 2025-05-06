import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import termsContent from './termsContent';

interface TermsOfServiceModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ open, onClose, onAccept }) => {
  const [canAccept, setCanAccept] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const element = contentRef.current;
      const scrollPosition = element.scrollTop + element.clientHeight;
      const tolerance = 1; // margem de tolerância de 1px
      const isAtBottom = scrollPosition + tolerance >= element.scrollHeight;

      if (isAtBottom) {
        setCanAccept(true);
      }
    }
  };

  useEffect(() => {
    if (open) {
      setCanAccept(false);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          height: '600px', // Altura fixa
          maxHeight: '80vh', // Limite máximo de altura
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle 
        sx={{ 
          pb: 1, 
          flexShrink: 0,
          textAlign: 'center',
          borderBottom: '1px solid #e0e0e0',
          mb: 2
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 500,
            color: '#1a1a1a'
          }}
        >
          Termos de Serviço
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          display="block"
          sx={{ mt: 1 }}
        >
          Última atualização em {new Date().toLocaleDateString()}
        </Typography>
      </DialogTitle>

      <DialogContent
        ref={contentRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: '24px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {termsContent.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {section.content}
            </Typography>
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, gap: 1, flexShrink: 0 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Recusar
        </Button>
        <Button
          onClick={onAccept}
          variant="contained"
          disabled={!canAccept}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Aceitar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsOfServiceModal;
