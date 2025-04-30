import React, { useState } from 'react';
import { Box, TextField, Button, Typography, ThemeProvider, createTheme, CssBaseline, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../theme/colors';

// Cores do tema
const themeColors = colors;

// Definindo a fonte global
const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.secondary,
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          padding: '10px 20px',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#333333',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#f5f5f5',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: themeColors.primary,
            },
          },
        },
      },
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('sua-api/login', formData);

      const response = {
        status: 200,
        data: {
          nome: "Usuário Teste",
          email: formData.email,
          senha: formData.senha
        }
      }
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (error) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden'
      }}>
        {/* Lado esquerdo - Formulário */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 3, sm: 4, md: 5 },
          overflow: 'auto'
        }}>
          <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  color: themeColors.primary,
                  display: 'inline'
                }}
              >
                Bon
              </Typography>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ display: 'inline' }}
              >
                Santé
              </Typography>
            </Box>

            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Bonjour!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Para você conectar à sua conta, preencha seu endereço de email e senha.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Seu endereço de email
              </Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { height: '48px' }
                }}
              />
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                Sua senha
              </Typography>
              <TextField
                fullWidth
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{ mb: 1 }}
                InputProps={{
                  sx: { height: '48px' }
                }}
              />
              
              <Link 
                href="#" 
                underline="none" 
                sx={{ 
                  display: 'block', 
                  mb: 3, 
                  color: themeColors.primary,
                  fontSize: '0.8rem'
                }}
              >
                Esqueceu sua senha?
              </Link>
              
              <CustomButton
                fullWidth
                type="submit"
                sx={{ height: '48px', mb: 2 }}
              >
                Entrar
              </CustomButton>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Precisa de ajuda? Entre em contato
              </Typography>
              <Link 
                href="#" 
                underline="none" 
                sx={{ 
                  color: themeColors.primary,
                  fontWeight: 500
                }}
              >
                suporte@bonsante.com
              </Link>
            </Box>

            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mt: 6, 
                textAlign: 'center' 
              }}
            >
              © Todos os direitos reservados BonSanté 2023
            </Typography>
          </Box>
        </Box>

        {/* Lado direito - Imagem */}
        <Box 
          sx={{ 
            width: { xs: 0, md: '50%' },
            height: '100%',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/images/back.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
          <Box sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1
          }} />
          <Box sx={{ 
            maxWidth: '80%',
            p: 4,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 2,
            backdropFilter: 'blur(5px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 2,
            position: 'relative'
          }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, color: themeColors.secondary, fontWeight: 500 }}>
              Medicina de precisão é o novo padrão ouro para tratamento de câncer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              O relatório interativo resultante inclui informações atualizadas sobre tratamentos aprovados ou investigacionais para cada paciente.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;