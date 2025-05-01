import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import {
  Home as HomeIcon,
  Description as DocumentsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import ListUsers from './ListUsers/ListUsers';
import ListProfiles from './ListProfiles/ListProfiles';

const User: React.FC = () => {
  const menuItems = [
    {
      id: 'users',
      label: 'usuários',
      icon: <DocumentsIcon />,
      component: <ListUsers />,
    },
    {
      id: 'profiles',
      label: 'perfis',
      icon: <HomeIcon />,
      component: <ListProfiles />,
    },
    {
      id: 'settings',
      label: 'configurações',
      icon: <SettingsIcon />,
      component: <Typography>Configurações</Typography>,
    },
  ];

  return (
    <Layout>
      <Box
        sx={{
          height: 'calc(100vh - 128px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DashboardLayout title="Menu" menuItems={menuItems} />
      </Box>
    </Layout>
  );
};

export default User;
