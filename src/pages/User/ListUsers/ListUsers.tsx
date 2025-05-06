import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import DataTable, { ActionButton } from '../../../components/DataTable/DataTable';
import {
  Warning as WarningIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
} from '@mui/icons-material';

import UserDetails from './UserDetails/UserDetails';
import { Delete as DeleteIcon } from '@mui/icons-material';
import UserCreate from './UserCreate/UserCreate';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: number | string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  status: string;
  address: string;
  avatar?: string;
}

const ListUsers: React.FC = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const users: User[] = [
    {
      id: 1,
      name: 'Albert Flores',
      nickname: 'Albert',
      email: 'flores@mail.com',
      phone: '(+62)22-8765-5678',
      status: 'Come out',
      address: 'South Jakarta, Jakarta',
    },
    {
      id: 2,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 3,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 4,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 5,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 6,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 7,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 8,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 9,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
    },
    {
      id: 10,
      name: 'Wade Warren',
      nickname: 'Wade',
      email: 'wade@mail.com',
      phone: '(+62)29-1234-8767',
      status: 'Come in',
      address: 'Central Jakarta, Jakarta',
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

  const columns = [
    {
      id: 'name',
      label: 'Name',
      render: (value: string, row: User) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {value}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              {row.nickname}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      render: (_: any, row: User) => (
        <Box>
          <Typography variant="body2">{row.email}</Typography>
          <Typography variant="caption" sx={{ color: '#6B7280' }}>
            {row.phone}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: (value: string, row: User) => (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: value === 'Come in' ? '#818CF815' : '#38BDF815',
            color: value === 'Come in' ? '#818CF8' : '#38BDF8',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      id: 'address',
      label: 'Address',
    },
  ];

  const handleApplyFilters = (filters: any) => {
    console.log('Filtros aplicados:', filters);
  };

  const handleDeleteClick = (user: User) => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Usuário confirmou a exclusão');
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const actionButtons: ActionButton[] = [
    {
      label: '',
      icon: <VisibilityOutlinedIcon />,
      color: 'info',
      variant: 'text',
      onClick: (user: User) => {
        navigate(`/users/${user.id}`);
      },
    },
    {
      label: '',
      icon: <DeleteOutlineOutlinedIcon />,
      color: 'error',
      variant: 'text',
      onClick: (user: User) => {
        handleDeleteClick(user);
      },
    },
  ];

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        padding: '24px',
        minHeight: 0,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/new-users`)}>
            Novo Usuário
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <DataTable
          data={users}
          columns={columns}
          actionButtons={actionButtons}
          filterOptions={filterOptions}
          handleApplyFilters={handleApplyFilters}
        />
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '16px',
            maxWidth: '400px',
          },
        }}
      >
        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <WarningIcon
            sx={{
              fontSize: 48,
              color: 'secondary.main',
              bgcolor: 'primary.light',
              p: 1,
              borderRadius: '50%',
              mb: 2,
            }}
          />
          <DialogTitle sx={{ pb: 1 }}>Tem certeza?</DialogTitle>
          <DialogContent>
            <Typography>
              Esta ação não pode ser desfeita. Por favor, confirme se deseja prosseguir.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
            <Button variant="outlined" onClick={handleDeleteCancel} sx={{ minWidth: 100 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteConfirm}
              sx={{ minWidth: 100 }}
            >
              Confirmar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ListUsers;
