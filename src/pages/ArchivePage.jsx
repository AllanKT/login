import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Avatar, IconButton, Divider, Button, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon, Archive as ArchiveIcon, RestoreFromTrash as RestoreIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Layout from '../components/Layout/Layout';
import { colors } from '../theme/colors';  // Add this import

const ArchivePage = () => {
  const archivedItems = [
    { id: 1, title: 'Projeto Antigo', type: 'Projeto', date: '10 Jan 2023' },
    { id: 2, title: 'Documentação Inicial', type: 'Documento', date: '5 Fev 2023' },
    { id: 3, title: 'Plantas Versão 1.0', type: 'Planta', date: '15 Mar 2023' },
    { id: 4, title: 'Contratos Anteriores', type: 'Documento', date: '20 Abr 2023' },
    { id: 5, title: 'Orçamento 2022', type: 'Documento', date: '10 Dez 2022' },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Arquivo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Itens arquivados e histórico de projetos
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Itens Arquivados
          </Typography>
          <Button variant="outlined" color="error">
            Limpar Arquivo
          </Button>
        </Box>
        
        {archivedItems.map((item) => (
          <Paper 
            key={item.id} 
            sx={{ 
              p: 2, 
              mb: 2, 
              borderRadius: 2,
              border: '1px solid #E5E7EB'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: colors.primary, mr: 2 }}>
                <ArchiveIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    label={item.type} 
                    size="small" 
                    sx={{ 
                      mr: 1, 
                      bgcolor: '#F3F4F6', 
                      color: '#4B5563',
                      height: 24
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    Arquivado em {item.date}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton sx={{ mr: 1 }} color="primary">
                  <RestoreIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Paper>

    </Layout>
  );
};

export default ArchivePage;