import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Avatar, IconButton, Divider, Button } from '@mui/material';
import { MoreVert as MoreVertIcon, Description as DescriptionIcon, Folder as FolderIcon } from '@mui/icons-material';
import Layout from '../components/Layout/Layout';

const DocumentsPage = () => {
  const documents = [
    { id: 1, title: 'Relatório Financeiro', date: '10 Jun 2023', type: 'document' },
    { id: 2, title: 'Contratos', date: '5 Jun 2023', type: 'folder' },
    { id: 3, title: 'Apresentação de Projeto', date: '1 Jun 2023', type: 'document' },
    { id: 4, title: 'Orçamentos', date: '28 Mai 2023', type: 'folder' },
    { id: 5, title: 'Cronograma', date: '25 Mai 2023', type: 'document' },
    { id: 6, title: 'Especificações Técnicas', date: '20 Mai 2023', type: 'document' },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Documentos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie todos os seus documentos
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Paper 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: doc.type === 'folder' ? '#FCD34D' : '#6366F1', 
                    width: 40, 
                    height: 40,
                    mr: 2
                  }}
                >
                  {doc.type === 'folder' ? <FolderIcon /> : <DescriptionIcon />}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Atualizado em {doc.date}
                  </Typography>
                </Box>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default DocumentsPage;