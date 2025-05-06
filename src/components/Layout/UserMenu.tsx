import React from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Switch,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleLogout: () => void;
  userData: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, handleClose, handleLogout, userData }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    handleClose();
    navigate('/settings/profile');
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 280,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ p: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar src={userData.avatar} sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
            {userData.name.charAt(0)}
          </Avatar>
          <Box sx={{ ml: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <MenuItem onClick={handleProfileClick}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Perfil
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Configurações
      </MenuItem>

      {/* <MenuItem>
        <ListItemIcon>
          <DarkModeIcon fontSize="small" />
        </ListItemIcon>
        Modo escuro
        <Switch checked={isDarkMode} onChange={toggleDarkMode} sx={{ ml: 1 }} />
      </MenuItem> */}

      <Divider />

      <MenuItem onClick={handleLogout} sx={{ color: '#EF4444' }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
        </ListItemIcon>
        Sair
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
