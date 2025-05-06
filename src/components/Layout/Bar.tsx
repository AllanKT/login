import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  CssBaseline,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { colors } from '../../theme/colors';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';

const drawerWidth = 240;

const Bar: React.FC<{ handleLogout: () => void; handleDrawerToggle: () => void }> = ({
  handleLogout,
  handleDrawerToggle,
}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          borderBottom: '1px solid #f0f0f0',
          bgcolor: colors.header,
          color: 'text.primary',
          m: 2,
          width: { xs: `calc(100% - 32px)`, sm: `calc(100% - 32px)` },
          ml: { xs: '16px', sm: `${drawerWidth + 16}px` },
          borderRadius: 3,
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
          // zIndex: theme => theme.zIndex.drawer + 1,
          // boxShadow: 'none',
          // borderBottom: '1px solid #f0f0f0',
          // bgcolor: colors.primary,
          // color: 'text.primary',

          // flexGrow: 1,
          // p: 3,
          // width: { sm: `calc(100% - 64px)` },
          //   mt: '64px',
          // m: 2,
          // width: { sm: `calc(100% - ${drawerWidth}px - 64px)` },
          // ml: { sm: `${drawerWidth}px` },
          // transition: 'width 0.2s, margin-left 0.2s',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'flex-end',
            gap: 2,
            // minHeight: '64px !important'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" sx={{ mr: 1 }} onClick={handleNotificationClick}>
            <Badge badgeContent={8} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <NotificationMenu
            anchorEl={notificationAnchorEl}
            handleClose={() => setNotificationAnchorEl(null)}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: colors.info,
              }}
            >
              AT
            </Avatar>
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
              Allan Teotonio
            </Typography>
            <IconButton size="small" onClick={handleMenuClick}>
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
            <UserMenu
              anchorEl={anchorEl}
              handleClose={handleMenuClose}
              handleLogout={handleLogout}
              userData={{
                name: user.nome ?? 'Usuário',
                email: user.email ?? 'email@exemplo.com',
                avatar: user.avatar,
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
