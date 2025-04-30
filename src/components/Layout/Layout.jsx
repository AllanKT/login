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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import CircleNumber from '../CircleNumber/CircleNumber';
import { colors } from '../../theme/colors';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const [tabValue, setTabValue] = useState(0);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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
                  backgroundColor: mode === 'light' ? `rgba(${colors.primary}, 0.08)` : `rgba(${colors.primary}, 0.2)`,
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
    [mode],
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ bgcolor: colors.primary, width: 32, height: 32, mr: 1.5 }}>R</Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Reserva do Vale
        </Typography>
      </Box>
      <Divider />
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" sx={{ px: 3, color: '#6B7280', fontWeight: 600 }}>
          GENERAL
        </Typography>
        <List sx={{ mt: 0.5 }}>
          <ListItemButton 
            onClick={() => navigate('/')} 
            selected={location.pathname === '/'} 
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HomeIcon fontSize="small" sx={{ color: location.pathname === '/' ? '#6366F1' : '#6B7280' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Home" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { 
                  color: location.pathname === '/' ? '#6366F1' : '#111827',
                  fontWeight: location.pathname === '/' ? 500 : 400
                } 
              }} 
            />
          </ListItemButton>
          
          <ListItemButton 
            onClick={() => navigate('/documents')} 
            selected={location.pathname === '/documents'} 
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DocumentsIcon fontSize="small" sx={{ color: location.pathname === '/documents' ? '#6366F1' : '#6B7280' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Documents" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { 
                  color: location.pathname === '/documents' ? '#6366F1' : '#111827',
                  fontWeight: location.pathname === '/documents' ? 500 : 400
                } 
              }} 
            />
          </ListItemButton>
        </List>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" sx={{ px: 3, color: '#6B7280', fontWeight: 600 }}>
          CONDOMINIO
        </Typography>
        <List sx={{ mt: 0.5 }}>
          <ListItemButton 
            onClick={() => navigate('/projects')} 
            selected={location.pathname === '/projects' || location.pathname.startsWith('/projects/')} 
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <FolderIcon fontSize="small" sx={{ color: location.pathname === '/projects' || location.pathname.startsWith('/projects/') ? '#6366F1' : '#6B7280' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Projects" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { 
                  color: location.pathname === '/projects' || location.pathname.startsWith('/projects/') ? '#6366F1' : '#111827',
                  fontWeight: location.pathname === '/projects' || location.pathname.startsWith('/projects/') ? 500 : 400
                } 
              }} 
            />
            <ChevronRightIcon fontSize="small" sx={{ color: '#9CA3AF' }} />
          </ListItemButton>
          
          <Box sx={{ pl: 4 }}>
            <ListItemButton 
              onClick={() => navigate('/projects/planta')} 
              selected={location.pathname === '/projects/planta'} 
              sx={{ py: 0.75 }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}>
                <DocumentsIcon fontSize="small" sx={{ color: location.pathname === '/projects/planta' ? '#6366F1' : '#9CA3AF' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Planta da Casa" 
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  sx: { 
                    color: location.pathname === '/projects/planta' ? '#6366F1' : '#4B5563',
                    fontWeight: location.pathname === '/projects/planta' ? 500 : 400
                  } 
                }} 
              />
            </ListItemButton>
            
            <ListItemButton 
              onClick={() => navigate('/projects/documentos')} 
              selected={location.pathname === '/projects/documentos'} 
              sx={{ py: 0.75 }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}>
                <DocumentsIcon fontSize="small" sx={{ color: location.pathname === '/projects/documentos' ? '#6366F1' : '#9CA3AF' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Documentos" 
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  sx: { 
                    color: location.pathname === '/projects/documentos' ? '#6366F1' : '#4B5563',
                    fontWeight: location.pathname === '/projects/documentos' ? 500 : 400
                  } 
                }} 
              />
            </ListItemButton>
          </Box>
          
          <ListItemButton 
            onClick={() => navigate('/archive')} 
            selected={location.pathname === '/archive'} 
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArchiveIcon fontSize="small" sx={{ color: location.pathname === '/archive' ? '#6366F1' : '#6B7280' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Archive" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { 
                  color: location.pathname === '/archive' ? '#6366F1' : '#111827',
                  fontWeight: location.pathname === '/archive' ? 500 : 400
                } 
              }} 
            />
          </ListItemButton>
        </List>
      </Box>
      
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <List>
          <ListItemButton onClick={() => navigate('/invite')} sx={{ py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <TeamsIcon fontSize="small" sx={{ color: location.pathname === '/invite' ? '#6366F1' : '#6B7280' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Invite Teammates" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { color: '#111827' } 
              }} 
            />
          </ListItemButton>
          
          <ListItemButton onClick={() => navigate('/help')} sx={{ py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HelpIcon fontSize="small" sx={{ color: location.pathname === '/help' ? '#6366F1' : '#6B7280' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Help" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { color: '#111827' } 
              }} 
            />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />
          
          <ListItemButton onClick={handleLogout} sx={{ py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Sair" 
              primaryTypographyProps={{ 
                variant: 'body2', 
                sx: { color: '#EF4444' } 
              }} 
            />
          </ListItemButton>
        </List>
      </Box>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: colors.header,
            color: 'text.primary',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            transition: 'width 0.2s, margin-left 0.2s'
          }}
        >
          <Toolbar sx={{ minHeight: '64px !important' }}>
            <IconButton
              color="inherit"
              aria-label="voltar"
              edge="start"
              sx={{ mr: 2 }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DocumentsIcon sx={{ mr: 1, color: '#6B7280' }} />
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                Documents
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            {/* Barra de pesquisa */}
            <Box sx={{ 
              position: 'relative',
              borderRadius: 20,
              bgcolor: '#F3F4F6',
              width: '240px',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              px: 2
            }}>
              <SearchIcon sx={{ color: '#9CA3AF', fontSize: 20 }} />
              <InputBase
                placeholder="Search"
                sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
              />
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
                ⌘S
              </Typography>
            </Box>
            
            {/* Notificações */}
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <NotificationsIcon />
            </IconButton>
            
            {/* Avatar do usuário com menu dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: colors.primary,
                }}
              >
                AF
              </Avatar>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                Amanda Faris
              </Typography>
              <IconButton 
                size="small"
                onClick={handleMenuClick}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Configurações
                </MenuItem>
                <Divider />
                <MenuItem 
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                  sx={{ color: '#EF4444' }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
                  </ListItemIcon>
                  Sair
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
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
                bgcolor: colors.sidebar
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
                borderRight: '1px solid #E5E7EB'
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
            mt: '64px',
            bgcolor: '#F9FAFB'
          }}
        >
          {/* Barra de ações */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              sx={{ 
                bgcolor: colors.primary, 
                '&:hover': { bgcolor: '#4F46E5' },
                mr: 2
              }}
            >
              Add New
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<FilterIcon />} 
              sx={{ 
                color: '#6B7280', 
                borderColor: '#E5E7EB',
                mr: 2
              }}
            >
              Filter
            </Button>
            
            <Button 
              variant="outlined" 
              endIcon={<ExpandMoreIcon />} 
              sx={{ 
                color: '#6B7280', 
                borderColor: '#E5E7EB'
              }}
            >
              Sort by: Date Created
            </Button>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ 
              position: 'relative',
              borderRadius: 1,
              bgcolor: '#F3F4F6',
              width: '240px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.75,
              border: '1px solid #E5E7EB'
            }}>
              <SearchIcon sx={{ color: '#9CA3AF', fontSize: 20 }} />
              <InputBase
                placeholder="Search folder or document"
                sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
              />
            </Box>
          </Box>
          
          {/* Conteúdo principal */}
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
