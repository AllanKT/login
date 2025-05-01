import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Avatar, Button, TextField } from '@mui/material';
import { User } from '../ListUsers';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

interface UserUpdateProps {
  data: User;
  onBack: () => void;
  //   onSubmit: (updatedData: PersonalInfo & EmergencyContact) => void;
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

const UserUpdate: React.FC<UserUpdateProps> = ({ data, onBack }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const [formData, setFormData] = useState<PersonalInfo & EmergencyContact>({
    firstName: 'Jacob',
    lastName: 'Jones',
    dateOfBirth: 'Dec 21, 1993',
    additionalPhone: '01524-789631',
    additionalEmail: 'hello741@gmail.com',
    relationship: 'Wife',
    mobile: '01524-789631',
    email: 'hello741@gmail.com',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChange =
    (field: keyof (PersonalInfo & EmergencyContact)) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = () => {
    // onSubmit(formData);
    console.log(formData);
    onBack();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="text" color="primary">
          Voltar
        </Button>
      </Box>

      {/* Resto do conteúdo */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar src={data.avatar} sx={{ width: 80, height: 80, mr: 2 }} />
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Editando perfil do usuário
          </Typography>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Profile" />
          <Tab label="Leases" disabled />
          <Tab label="Request" disabled />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Informações Pessoais
              </Typography>
              <EditField
                label="Nome"
                value={formData.firstName}
                onChange={handleChange('firstName')}
              />
              <EditField
                label="Sobrenome"
                value={formData.lastName}
                onChange={handleChange('lastName')}
              />
              <EditField
                label="Data de Nascimento"
                value={formData.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
              />
              <EditField
                label="Telefone Adicional"
                value={formData.additionalPhone}
                onChange={handleChange('additionalPhone')}
              />
              <EditField
                label="Email Adicional"
                value={formData.additionalEmail}
                onChange={handleChange('additionalEmail')}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Contato de Emergência
              </Typography>
              <EditField
                label="Relacionamento"
                value={formData.relationship}
                onChange={handleChange('relationship')}
              />
              <EditField
                label="Celular"
                value={formData.mobile}
                onChange={handleChange('mobile')}
              />
              <EditField label="Email" value={formData.email} onChange={handleChange('email')} />
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="primary" onClick={onBack} sx={{ minWidth: 120 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ minWidth: 200 }}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const EditField: React.FC<{
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
      {label}:
    </Typography>
    <TextField fullWidth size="small" value={value} onChange={onChange} variant="outlined" />
  </Box>
);

export default UserUpdate;
