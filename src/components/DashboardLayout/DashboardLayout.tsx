import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component?: React.ReactNode;
  children?: MenuItem[];
}

interface DashboardLayoutProps {
  children?: React.ReactNode;
  menuItems: MenuItem[];
  title: string;
}

const drawerWidth = 280;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, menuItems, title }) => {
  const [activeItem, setActiveItem] = useState<string>(menuItems[0]?.id || '');

  const renderMenuItem = (item: MenuItem) => (
    <React.Fragment key={item.id}>
      <ListItemButton
        onClick={() => setActiveItem(item.id)}
        selected={activeItem === item.id}
        sx={{
          py: 1.5,
          px: 2,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: '#F3F4F6',
            '&:hover': {
              backgroundColor: '#E5E7EB',
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        />
      </ListItemButton>
      {item.children && (
        <Box sx={{ pl: 3 }}>{item.children.map(child => renderMenuItem(child))}</Box>
      )}
    </React.Fragment>
  );

  const activeComponent = menuItems.find(item => item.id === activeItem)?.component || children;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        position: 'relative',
        border: '1px solid #E5E7EB',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {/* Menu lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          position: 'relative',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: '1px solid #E5E7EB',
            position: 'relative',
            height: '100%',
            borderRadius: 0, // Garante que o drawer não tenha bordas arredondadas
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Divider />
        <List sx={{ px: 2 }}>{menuItems.map(item => renderMenuItem(item))}</List>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#F9FAFB',
          height: '100%',
          overflow: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {activeComponent}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
