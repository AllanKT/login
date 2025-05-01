import React, { useMemo, useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Button,
  IconButton,
  Tab,
  Tabs,
  Badge,
  styled,
} from '@mui/material';
import { Settings as SettingsIcon, Circle as CircleIcon } from '@mui/icons-material';

interface Notification {
  id: number;
  avatar?: string;
  initials?: string;
  userName: string;
  action: string;
  target: string;
  time: string;
  category?: string;
  hasButtons?: boolean;
  fileInfo?: {
    name: string;
    size: string;
  };
  type: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

const NotificationMenu: React.FC<{
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}> = ({ anchorEl, handleClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      avatar: '',
      userName: 'Anna Srzand',
      action: 'joined to',
      target: '🔥 Final Presentation',
      time: '2h ago',
      category: 'Social Media Plan',
      type: 'following',
    },
    {
      id: 2,
      initials: 'JR',
      userName: 'Jess Raddon',
      action: 'mention you in',
      target: '😎 Tennis List',
      time: '4h ago',
      category: 'Hobby List',
      type: 'following',
    },
    {
      id: 3,
      avatar: '',
      userName: 'Sandra Marx',
      action: 'is requesting to upgrade Plan',
      target: '😎 Tennis List',
      time: '12h ago',
      category: 'Hobby List',
      hasButtons: true,
      type: 'archive',
    },
    {
      id: 4,
      avatar: '',
      userName: 'Adam Smith',
      action: 'upload a file',
      target: '😎 Tennis List',
      time: '1d ago',
      fileInfo: {
        name: 'landing_page_ver2.fig',
        size: '2mb',
      },
      type: 'following',
    },
  ]);

  const filteredNotifications = useMemo(() => {
    switch (tabValue) {
      case 1: // Seguindo
        return notifications.filter(notification => notification.type === 'following');
      case 2: // Arquivo
        return notifications.filter(notification => notification.type === 'archive');
      default: // Todas
        return notifications;
    }
  }, [notifications, tabValue]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMarkAllAsRead = () => {
    // Implementar lógica para marcar todas como lidas
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        sx: {
          mt: 1,
          width: 380,
          maxHeight: 600,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Notificações</Typography>
          <Button variant="text" size="small" onClick={handleMarkAllAsRead}>
            Marcar todas como lidas
          </Button>
        </Box>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Todas
                <Box
                  sx={{
                    bgcolor: '#6B7280',
                    color: 'white',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.25,
                    fontSize: '0.75rem',
                    minWidth: '20px',
                    textAlign: 'center',
                  }}
                >
                  8
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Seguindo
                <Box
                  sx={{
                    bgcolor: '#6B7280',
                    color: 'white',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.25,
                    fontSize: '0.75rem',
                    minWidth: '20px',
                    textAlign: 'center',
                  }}
                >
                  6
                </Box>
              </Box>
            }
          />
          <Tab label="Arquivo" />
        </Tabs>
      </Box>

      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        {filteredNotifications.map(notification => (
          <MenuItem key={notification.id} sx={{ py: 2, px: 2 }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              {notification.avatar || notification.initials ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: notification.avatar ? undefined : '#F3F4F6',
                    }}
                  >
                    {notification.initials}
                  </Avatar>
                </StyledBadge>
              ) : (
                <Avatar sx={{ width: 40, height: 40 }} />
              )}
              <Box sx={{ ml: 2, flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {notification.userName}
                  </Typography>
                  <Typography variant="body2" sx={{ mx: 0.5 }}>
                    {notification.action}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {notification.target}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                  {notification.category && (
                    <>
                      <CircleIcon sx={{ fontSize: 4, mx: 1, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {notification.category}
                      </Typography>
                    </>
                  )}
                </Box>

                {notification.hasButtons && (
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="contained" color="primary">
                      Aceitar
                    </Button>
                    <Button size="small" variant="outlined">
                      Recusar
                    </Button>
                  </Box>
                )}

                {notification.fileInfo && (
                  <Box sx={{ mt: 1, p: 1, bgcolor: '#F3F4F6', borderRadius: 1 }}>
                    <Typography variant="caption">
                      📄 {notification.fileInfo.name} • {notification.fileInfo.size}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}>
        <IconButton size="small">
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Box>
    </Menu>
  );
};

export default NotificationMenu;
