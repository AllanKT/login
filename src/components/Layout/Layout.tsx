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
  useMediaQuery,
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
  AdminPanelSettings as AdminPanelSettingsIcon,
  Apps as AppsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../../theme/colors';
import UserMenu from './UserMenu';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../../contexts/ThemeContext';
import NotificationMenu from './NotificationMenu';
import Bar from './Bar';

interface LayoutProps {
  children: React.ReactNode;
  window?: () => Window;
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

const Layout: React.FC<LayoutProps> = ({ children, window }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = React.useState(false);
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

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    navigate('/login');
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
    <Box
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 5 }}>
        <Box sx={{ mb: 4, mt: 2 }}>
          {/* Aumentado o margin-top */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Reserva do Vale
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
            GERAL
          </Typography>
        </Box>
        <Divider />

        {menuSections.map((section, index) => (
          <List component="nav" sx={{ width: '100%' }}>
            {section.items.map(item => (
              <React.Fragment key={item.id}>
                {renderMenuItem(item)}
                {item.children && (
                  <Box sx={{ pl: 4 }}>{item.children.map(child => renderMenuItem(child))}</Box>
                )}
              </React.Fragment>
            ))}
          </List>
        ))}

        {/* {menuSections.map((section, index) => (
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
        ))} */}
      </Box>

      <Box
        sx={{
          mt: 'auto', // Alterado de position absolute para margin-top auto
          width: '100%',
          p: 2,
          borderTop: '1px solid #f0f0f0', // Adicionado borda superior
        }}
      >
        <List>{footerMenuItems.map(item => renderMenuItem(item))}</List>
      </Box>
    </Box>
  );

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Bar handleLogout={handleLogout} handleDrawerToggle={handleDrawerToggle} />
          <Box
            component="nav"
            sx={{ height: 'calc(100% - 96px)', width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  m: 2,
                  mt: '100px', // Adicionado margem superior
                  borderRadius: 3,
                  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
                  height: `calc(100% - ${drawerWidth}px + 110px)`, // Ajustado para considerar a margem superior
                  border: '1px solid #f0f0f0',
                  zIndex: theme.zIndex.drawer,
                },
              }}
              slotProps={{
                root: {
                  keepMounted: true,
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
                  m: 2,
                  mt: '110px', // Adicionado margem superior
                  borderRadius: 3,
                  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
                  height: `calc(100% - ${drawerWidth}px + 110px)`, // Ajustado para considerar a margem superior
                  border: '1px solid #f0f0f0',
                  zIndex: theme.zIndex.drawer,
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
              mt: '110px',
              mx: { xs: 3, sm: 4, md: 6, lg: 8 }, // Margens laterais responsivas
              bgcolor: '#F9FAFB',
              overflow: 'auto',
              height: 'calc(100vh - 110px)',
              maxWidth: '1400px', // Largura máxima
              margin: '110px auto 0', // Centralização horizontal
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
