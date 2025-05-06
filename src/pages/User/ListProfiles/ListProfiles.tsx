import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Person as PersonIcon,
  BusinessCenter as BusinessCenterIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import DataTable, { ActionButton } from '../../../components/DataTable/DataTable';
import ProfilesEdit from './ProfilesEdit/ProfilesEdit';
import { useNavigate } from 'react-router-dom';

export interface Profile {
  id: number | string;
  name: string;
  status: string;
  icon?: React.ReactNode;
  description: string;
}

const ListProfiles: React.FC = () => {
  const navigate = useNavigate();

  const profiles: Profile[] = [
    {
      id: 1,
      name: 'Administrador',
      status: 'enable',
      icon: <AdminPanelSettingsIcon fontSize="small" />,
      description: 'Administrador do sistema com maior privilegio',
    },
    {
      id: 2,
      name: 'Master',
      status: 'enable',
      icon: <AdminPanelSettingsIcon fontSize="small" />,
      description: 'Usuáiro Master do sistema com menor privilegio',
    },
    {
      id: 3,
      name: 'Cliente',
      status: 'enable',
      icon: <PersonIcon fontSize="small" />,
      description: 'Usuário Comum do sistema com acesso de comprador',
    },
    {
      id: 4,
      name: 'Corretor',
      status: 'disable',
      icon: <BusinessCenterIcon fontSize="small" />,
      description: 'Usuário Corretor do sistema com acesso de vendedor',
    },
  ];

  const filterOptions = [
    {
      type: 'date-range' as const,
      label: 'Período',
      key: 'date_range',
    },
    {
      type: 'select' as const,
      label: 'Tipo de Atividade',
      key: 'activity_type',
      options: [
        { label: 'Cobrança de Tempo', value: 'time_charge' },
        { label: 'Reunião', value: 'meeting' },
        { label: 'Tarefa', value: 'task' },
      ],
    },
    {
      type: 'select' as const,
      label: 'Status',
      key: 'status',
      options: [
        { label: 'Cancelado', value: 'canceled' },
        { label: 'Em Andamento', value: 'in_progress' },
        { label: 'Concluído', value: 'completed' },
      ],
    },
    {
      type: 'search' as const,
      label: 'Busca por Palavra-chave',
      key: 'keyword',
    },
  ];

  const handleApplyFilters = (filters: any) => {
    console.log('Filtros aplicados:', filters);
  };

  const columns = [
    {
      id: 'id',
      label: 'ID',
      render: (value: string, row: Profile) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'name',
      label: 'Nome',
      render: (value: string, row: Profile) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: (value: string, row: Profile) => (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: value === 'enable' ? '#818CF815' : '#38BDF815',
            color: value === 'disable' ? '#818CF8' : '#38BDF8',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      id: 'description',
      label: 'Descrição',
      render: (value: string, row: Profile) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  const handleEdit = (profile: Profile) => {
    console.log('Edit profile:', profile);
  };

  const handleDelete = (profile: Profile) => {
    console.log('Delete profile:', profile);
  };

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const actionButtons: ActionButton[] = [
    // {
    //   label: 'Editar',
    //   icon: <AdminPanelSettingsIcon />,
    //   color: 'primary',
    //   variant: 'text',
    //   onClick: (profile: Profile) => {
    //     handleEdit(profile);
    //   },
    // },
    {
      label: '',
      icon: <VisibilityOutlinedIcon />,
      color: 'info',
      variant: 'text',
      onClick: (profile: Profile) => {
        // setSelectedProfile(profile);
        navigate(`/profiles/${profile.id}/edit`);
      },
    },
    // {
    //   label: 'Excluir',
    //   icon: <AdminPanelSettingsIcon />,
    //   color: 'error',
    //   variant: 'text',
    //   onClick: handleDelete,
    // },
  ];

  // return selectedProfile ? (
  //   <ProfilesEdit data={selectedProfile} onBack={() => setSelectedProfile(null)} />
  // ) :
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        padding: '24px',
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <DataTable
          data={profiles}
          columns={columns}
          actionButtons={actionButtons}
          filterOptions={filterOptions}
          handleApplyFilters={handleApplyFilters}
        />
      </Box>
    </Box>
  );
};

export default ListProfiles;
