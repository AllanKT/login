import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/Layout/Layout_';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: '24px',
          minHeight: 0,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Bem-vindo de volta
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui está um resumo das suas atividades recentes
        </Typography>
      </Box>
    </Layout>
  );
};

export default HomePage;
