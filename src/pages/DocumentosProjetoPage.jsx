import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Avatar, IconButton, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { MoreVert as MoreVertIcon, Description as DescriptionIcon, Download as DownloadIcon } from '@mui/icons-material';
import Layout from '../components/Layout/Layout';
import CustomButton from '../components/CustomButton/CustomButton';
import { Add as AddIcon } from '@mui/icons-material';
import { colors } from '../theme/colors';  // Add this import

const DocumentosProjetoPage = () => {
  const documents = [
    { id: 1, title: 'Memorial Descritivo', type: 'PDF', size: '2.4 MB', date: '10 Jun 2023' },
    { id: 2, title: 'Contrato de Construção', type: 'DOCX', size: '1.8 MB', date: '5 Jun 2023' },
    { id: 3, title: 'Orçamento Detalhado', type: 'XLSX', size: '3.2 MB', date: '1 Jun 2023' },
    { id: 4, title: 'Cronograma de Obra', type: 'PDF', size: '1.5 MB', date: '28 Mai 2023' },
    { id: 5, title: 'Especificações Técnicas', type: 'PDF', size: '4.1 MB', date: '25 Mai 2023' },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Documentos do Projeto
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie todos os documentos relacionados ao seu projeto
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Documentos Principais
          </Typography>
          <CustomButton
            variant="contained"
            startIcon={<AddIcon />}
          >
            Adicionar Documento
          </CustomButton>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Tamanho</TableCell>
                <TableCell>Data</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#6366F1', mr: 2, width: 32, height: 32 }}>
                        <DescriptionIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {doc.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Documentos Recentes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {documents.slice(0, 3).map((doc) => (
              <Box key={doc.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: colors.primary, mr: 2, width: 32, height: 32 }}>
                  <DescriptionIcon fontSize="small" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {doc.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {doc.date}
                  </Typography>
                </Box>
                <IconButton size="small">
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Estatísticas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total de Documentos
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                12
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Espaço Utilizado
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                24.5 MB
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Última Atualização
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                10 Jun 2023
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DocumentosProjetoPage;