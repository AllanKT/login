import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Avatar, IconButton, Divider } from '@mui/material';
import { MoreVert as MoreVertIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import Layout from '../components/Layout/Layout';
import { colors } from '../theme/colors';  // Add this import

const HomePage = () => {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Bem-vindo de volta
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui está um resumo das suas atividades recentes
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Atividades Recentes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: colors.primary, mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Documento atualizado
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Há {item} hora{item > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Resumo do Projeto
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Documentos Totais
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                24
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Projetos Ativos
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                3
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Arquivos Recentes
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                7
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;