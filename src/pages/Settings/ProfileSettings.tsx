import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Container,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Layout from '../../components/Layout/Layout_';

const ProfileSettings: React.FC = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Donald',
    lastName: 'Sergeyevich',
    dateOfBirth: '2000-01-24',
    phoneNumber: '+7 495 123-45-67',
    address: 'ul. Tverskaya, d. 7, kv. 12',
    city: 'Moskva',
    region: 'Moskva',
    postalCode: '125475',
    country: 'Russia',
  });

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Salvando...', profileData);
  };

  const handleDiscard = () => {
    // Implementar lógica para descartar alterações
  };

  return (
    <Layout>
      <Box
        sx={{
          py: 4,
          flex: 1,
          overflow: 'auto',
          padding: '24px',
          minHeight: 0,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Typography variant="h5">Seu Perfil</Typography>
            <Box>
              <Button variant="outlined" color="inherit" onClick={handleDiscard} sx={{ mr: 2 }}>
                Descartar
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Salvar
              </Button>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Última edição em {new Date().toLocaleDateString()}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Foto do perfil
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 80, height: 80 }} src="/path-to-profile-image.jpg" />
              <Box>
                <Button variant="contained" color="primary" component="label" sx={{ mr: 2 }}>
                  Alterar foto
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Button variant="outlined" color="error">
                  Excluir foto
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Informações Pessoais
            </Typography>
            <Grid container spacing={3}>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={profileData.firstName}
                  onChange={e => setProfileData({ ...profileData, firstName: e.target.value })}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Sobrenome"
                  value={profileData.lastName}
                  onChange={e => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Data de nascimento"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={e => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={profileData.phoneNumber}
                  onChange={e => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Localização
            </Typography>
            <Grid container spacing={3}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  value={profileData.address}
                  onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Cidade"
                  value={profileData.city}
                  onChange={e => setProfileData({ ...profileData, city: e.target.value })}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Região"
                  value={profileData.region}
                  onChange={e => setProfileData({ ...profileData, region: e.target.value })}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="CEP"
                  value={profileData.postalCode}
                  onChange={e => setProfileData({ ...profileData, postalCode: e.target.value })}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="País"
                  value={profileData.country}
                  onChange={e => setProfileData({ ...profileData, country: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ProfileSettings;
