import React, { useState, useMemo } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  createTheme,
  ThemeProvider,
  CssBaseline,
  InputBase,
  Badge,
  Chip,
  ListItemButton,
  Tooltip,
  Button,
  Tab,
  Tabs,
  Paper,
  Theme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Description as DocumentsIcon,
  Folder as FolderIcon,
  Archive as ArchiveIcon,
  People as TeamsIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreIcon,
  Star as StarIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  Notifications as NotificationsIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Apps as AppsIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../../theme/colors';
import UserMenu from './UserMenu';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../../contexts/ThemeContext';
import NotificationMenu from './NotificationMenu';

interface LayoutProps {
  children: React.ReactNode;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: MenuItem[];
  color?: string;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [tabValue, setTabValue] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { mode } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: colors.primary,
          },
          secondary: {
            main: colors.secondary,
          },
          background: {
            default: mode === 'light' ? '#F9FAFB' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
            primary: mode === 'light' ? colors.text.primary : '#ffffff',
            secondary: mode === 'light' ? colors.text.secondary : '#9CA3AF',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: '6px',
                margin: '2px 8px',
                '&.Mui-selected': {
                  backgroundColor:
                    mode === 'light'
                      ? `rgba(${colors.primary}, 0.08)`
                      : `rgba(${colors.primary}, 0.2)`,
                  color: colors.primary,
                  '& .MuiListItemIcon-root': {
                    color: colors.primary,
                  },
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
                borderBottom: '1px solid #E5E7EB',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderRight: '1px solid #E5E7EB',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: '6px',
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                minWidth: 'auto',
                padding: '12px 16px',
              },
            },
          },
        },
      }),
    [mode]
  );

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  const menuSections: MenuSection[] = [
    {
      title: 'GERAL',
      items: [
        {
          id: 'users',
          label: 'Usuários',
          icon: <PersonIcon fontSize="small" />,
          path: '/users',
        },
        {
          id: 'profiles',
          label: 'Perfis',
          icon: <AdminPanelSettingsIcon fontSize="small" />,
          path: '/profiles',
        },
      ],
    },
  ];

  const footerMenuItems: MenuItem[] = [
    {
      id: 'logout',
      label: 'Sair',
      icon: <LogoutIcon fontSize="small" />,
      path: '/logout',
      color: '#EF4444',
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <ListItemButton
      key={item.id}
      onClick={() => (item.id === 'logout' ? handleLogout() : navigate(item.path))}
      selected={
        location.pathname === item.path ||
        (item.children && location.pathname.startsWith(item.path))
      }
      sx={{ py: 1 }}
    >
      <ListItemIcon sx={{ minWidth: 36 }}>
        {React.cloneElement(item.icon as React.ReactElement, {})}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          variant: 'body2',
          sx: {
            color: item.color || (location.pathname === item.path ? colors.primary : '#111827'),
            fontWeight: location.pathname === item.path ? 500 : 400,
          },
        }}
      />
      {item.children && <ChevronRightIcon fontSize="small" sx={{ color: '#9CA3AF' }} />}
    </ListItemButton>
  );

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ bgcolor: colors.primary, width: 32, height: 32, mr: 1.5 }}>R</Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Reserva do Vale
        </Typography>
      </Box>
      <Divider />

      {menuSections.map((section, index) => (
        <Box key={section.title} sx={{ mt: index === 0 ? 2 : 3 }}>
          <Typography variant="caption" sx={{ px: 3, color: '#6B7280', fontWeight: 600 }}>
            {section.title}
          </Typography>
          <List sx={{ mt: 0.5 }}>
            {section.items.map(item => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item)}
                {item.children && (
                  <Box sx={{ pl: 4 }}>{item.children.map(child => renderMenuItem(child))}</Box>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      ))}

      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <List>{footerMenuItems.map(item => renderMenuItem(item))}</List>
      </Box>
    </div>
  );

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              zIndex: theme => theme.zIndex.drawer + 1,
              bgcolor: colors.header,
              color: 'text.primary',
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              transition: 'width 0.2s, margin-left 0.2s',
            }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />

              {/* Notificações */}
              <IconButton color="inherit" sx={{ mr: 1 }} onClick={handleNotificationClick}>
                <Badge badgeContent={8} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <NotificationMenu
                anchorEl={notificationAnchorEl}
                handleClose={() => setNotificationAnchorEl(null)}
              />

              {/* Avatar do usuário com menu dropdown */}
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
                    name: user.nome || 'Usuário',
                    email: user.email || 'email@exemplo.com',
                    avatar: user.avatar,
                  }}
                />
              </Box>
            </Toolbar>
          </AppBar>

          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  bgcolor: colors.sidebar,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  bgcolor: colors.sidebar,
                  borderRight: '1px solid #E5E7EB',
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: '96px',
              mx: { xs: 3, sm: 4, md: 6, lg: 8 }, // Margens laterais
              bgcolor: colors.header,
              borderRadius: 3,
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
              overflow: 'auto', // Adicionado overflow
              height: 'calc(100vh - 130px)', // Altura ajustada
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </CustomThemeProvider>
  );
};

export default Layout;
