import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import ListProfiles, { Profile } from '../ListProfiles';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

interface Permission {
  id: number;
  action: string;
  escrita: boolean;
  leitura: boolean;
  remoção: boolean;
}

interface PermissionGroup {
  title: string;
  permissions: Permission[];
}

interface ProfilesEditProps {
  data: Profile;
  onBack: () => void;
}

const ProfilesEdit: React.FC<ProfilesEditProps> = ({ data, onBack }) => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState<PermissionGroup[]>([]);

  const [permissionGroups] = useState<PermissionGroup[]>([
    {
      title: 'Gerenciamento de Vagas',
      permissions: [
        {
          id: 1,
          action: 'Criar nova vaga e etapas',
          escrita: false,
          leitura: true,
          remoção: true,
        },
        {
          id: 2,
          action: 'Editar vaga e etapas',
          escrita: false,
          leitura: true,
          remoção: true,
        },
        {
          id: 3,
          action: 'Arquivar vagas',
          escrita: false,
          leitura: true,
          remoção: true,
        },
        {
          id: 4,
          action: 'Alterar status da vaga',
          escrita: false,
          leitura: true,
          remoção: true,
        },
      ],
    },
    {
      title: 'Gerenciamento de Candidatos',
      permissions: [
        {
          id: 5,
          action: 'Alterar etapa do candidato',
          escrita: true,
          leitura: true,
          remoção: true,
        },
        {
          id: 6,
          action: 'Mover candidato para etapa final (Contratado, Rejeitado, Em espera)',
          escrita: false,
          leitura: true,
          remoção: true,
        },
        {
          id: 7,
          action: 'Ler mensagens',
          escrita: true,
          leitura: true,
          remoção: true,
        },
        {
          id: 8,
          action: 'Enviar mensagens ad-hoc para candidatos',
          escrita: true,
          leitura: true,
          remoção: true,
        },
        {
          id: 9,
          action: 'Reagendar entrevistas',
          escrita: true,
          leitura: true,
          remoção: true,
        },
        {
          id: 10,
          action: 'Importar candidatos',
          escrita: true,
          leitura: true,
          remoção: true,
        },
      ],
    },
    {
      title: 'Gerenciamento de Usuários',
      permissions: [
        {
          id: 11,
          action: 'Editar detalhes do usuário',
          escrita: true,
          leitura: true,
          remoção: true,
        },
        {
          id: 12,
          action: 'Participar de entrevistas / Definir disponibilidade de agenda',
          escrita: true,
          leitura: true,
          remoção: true,
        },
      ],
    },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPermissions(permissionGroups);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você pode implementar a lógica para salvar as alterações
    console.log('Permissões salvas:', editedPermissions);
  };

  const handleCheckboxChange = (
    groupIndex: number,
    permissionIndex: number,
    role: 'escrita' | 'leitura' | 'remoção'
  ) => {
    const newPermissions = [...editedPermissions];
    newPermissions[groupIndex].permissions[permissionIndex][role] =
      !newPermissions[groupIndex].permissions[permissionIndex][role];
    setEditedPermissions(newPermissions);
  };

  return selectedProfile ? (
    <ListProfiles />
  ) : (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="text" color="primary">
          Voltar
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isEditing ? (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Editar
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Salvar
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Gerenciador de perfis de usuário: {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total de usuários: 5
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell align="center">escrita</TableCell>
              <TableCell align="center">leitura</TableCell>
              <TableCell align="center">remoção</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isEditing ? editedPermissions : permissionGroups).map((group, groupIndex) => (
              <React.Fragment key={group.title}>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)', fontWeight: 'bold' }}
                  >
                    {group.title}
                  </TableCell>
                </TableRow>
                {group.permissions.map((permission, permissionIndex) => (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.action}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={permission.escrita}
                        disabled={!isEditing}
                        onChange={() =>
                          handleCheckboxChange(groupIndex, permissionIndex, 'escrita')
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={permission.leitura}
                        disabled={!isEditing}
                        onChange={() =>
                          handleCheckboxChange(groupIndex, permissionIndex, 'leitura')
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={permission.remoção}
                        disabled={!isEditing}
                        onChange={() =>
                          handleCheckboxChange(groupIndex, permissionIndex, 'remoção')
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProfilesEdit;
