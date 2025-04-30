import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Avatar, IconButton, Divider, Button, Tabs, Tab } from '@mui/material';
import { MoreVert as MoreVertIcon, Download as DownloadIcon, Share as ShareIcon } from '@mui/icons-material';
import Layout from '../components/Layout/Layout';
import CustomButton from '../components/CustomButton/CustomButton';
import CircleNumber from '../components/CircleNumber/CircleNumber';

const PlantaPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Planta da Casa
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualize e gerencie as plantas do seu projeto
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Planta Baixa - Térreo
          </Typography>
          <Box>
            <CustomButton 
              startIcon={<DownloadIcon />} 
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Download
            </CustomButton>
            <CustomButton 
              startIcon={<ShareIcon />} 
              variant="contained"
              sx={{
                mr: 2
              }}
            >
              Compartilhar
            </CustomButton>
          </Box>
        </Box>
        
        <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
          <Tab label="Planta Baixa" />
          <Tab label="Cortes" />
          <Tab label="Fachadas" />
          <Tab label="3D" />
        </Tabs>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box 
          sx={{ 
            height: 400, 
            bgcolor: '#F3F4F6', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Visualização da Planta
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Detalhes do Projeto
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Área Construída
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                150m²
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Número de Cômodos
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                8
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Arquiteto Responsável
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Carlos Mendes
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Histórico de Revisões
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CircleNumber 
                  number={item} 
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Revisão {item}.0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {10 - item * 2} Jun 2023
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PlantaPage;