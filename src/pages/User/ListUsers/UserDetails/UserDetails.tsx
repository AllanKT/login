import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { User } from '../ListUsers';
import { ArrowBack as ArrowBackIcon, Warning as WarningIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import UserUpdate from '../UserUpdate/UserUpdate';
import Layout from '../../../../components/Layout/Layout_';

interface UserDetailsProps {
  data: User;
  onBack: () => void;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  additionalPhone: string;
  additionalEmail: string;
}

interface EmergencyContact {
  relationship: string;
  mobile: string;
  dateOfBirth: string;
  email: string;
}

interface Transaction {
  id: number;
  customer: string;
  date: string;
  status: 'Paid' | 'Partially Paid' | 'Overdue';
  property: string;
  amount: number;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  const [tabValue, setTabValue] = React.useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    // Aqui você faria a chamada para sua API
    // Por enquanto, vamos simular com dados mockados
    const fetchUserData = async () => {
      try {
        // Simulando uma chamada à API
        const mockData: User = {
          id: id || '',
          name: 'Albert Flores',
          nickname: 'Albert',
          email: 'flores@mail.com',
          phone: '(+62)22-8765-5678',
          status: 'Come out',
          address: 'South Jakarta, Jakarta',
        };

        setUserData(mockData);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (!userData) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography>Carregando...</Typography>
        </Box>
      </Layout>
    );
  }

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const onBack = () => {
    navigate('/users');
  };

  const handleDeleteConfirm = () => {
    console.log('Usuário confirmou a exclusão');
    setOpenDeleteDialog(false);
    onBack();
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const personalInfo: PersonalInfo = {
    firstName: 'Jacob',
    lastName: 'Jones',
    dateOfBirth: 'Dec 21, 1993 | 30 y.o',
    additionalPhone: '01524-789631',
    additionalEmail: 'hello741@gmail.com',
  };

  const emergencyContact: EmergencyContact = {
    relationship: 'Wife',
    mobile: '01524-789631',
    dateOfBirth: 'Dec 21, 1993 | 30 y.o',
    email: 'hello741@gmail.com',
  };

  const transactions: Transaction[] = [
    {
      id: 1,
      customer: 'Leslie Alexander',
      date: 'N/A',
      status: 'Overdue',
      property: '3517 W. Grey St',
      amount: 450.0,
    },
    // ... Adicione mais transações conforme necessário
  ];

  // return userData ? (
  //   <UserUpdate data={userData} onBack={() => setUserData(null)} />
  // ) :

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="text" color="primary">
          Voltar
        </Button>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
            Deletar
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar src={userData.avatar} sx={{ width: 80, height: 80, mr: 2 }} />
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {userData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rent from Jun 2024
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Leases" />
          <Tab label="Request" />
        </Tabs>
      </Box>

      {/* Conteúdo da Tab Profile */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Informações Pessoais */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal Information
              </Typography>
              <InfoField label="First Name" value={personalInfo.firstName} />
              <InfoField label="Last Name" value={personalInfo.lastName} />
              <InfoField label="Date of birth" value={personalInfo.dateOfBirth} />
              <InfoField label="Additional phone 1" value={personalInfo.additionalPhone} />
              <InfoField label="Additional Email 1" value={personalInfo.additionalEmail} />
            </Box>

            {/* Contato de Emergência */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Emergency contact
              </Typography>
              <InfoField label="Relationship" value={emergencyContact.relationship} />
              <InfoField label="Mobile" value={emergencyContact.mobile} />
              <InfoField label="Date of birth" value={emergencyContact.dateOfBirth} />
              <InfoField label="Email" value={emergencyContact.email} />
            </Box>
          </Box>

          {/* Transações Recentes */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Transactions
            </Typography>
            <TransactionsTable transactions={transactions} />
          </Box>
        </Box>
      )}

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
              color: 'primary.main',
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

// Componente auxiliar para campos de informação
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}:
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

// Componente para a tabela de transações
const TransactionsTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <Box sx={{ overflowX: 'auto' }}>{/* Implemente a tabela de transações aqui */}</Box>
);

export default UserDetails;
