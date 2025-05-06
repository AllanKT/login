import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { colors } from '../../../theme/colors';
import { isValidEmail, formattedEmail } from '../../../utils/validations/email';

interface FormData {
  email: string;
  senha: string;
}

interface LoginResponse {
  nome: string;
  email: string;
  senha: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
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
              borderColor: colors.primary,
            },
          },
        },
      },
    },
  },
});

const RecoverPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === 'email') {
      setFormData({
        ...formData,
        [name]: formattedEmail(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await axios.post<LoginResponse>('sua-api/login', formData);
      await new Promise(resolve => setTimeout(resolve, 6000));

      const response = {
        status: 200,
        data: {
          nome: 'Usuário Teste',
          email: formData.email,
          senha: formData.senha,
        },
      };

      if (response.status === 200) {
        // localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/recover-password-code');
      }
    } catch (error) {
      alert('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          overflow: 'hidden',
          width: '100vw',
          height: '100vh',
        }}
      >
        {/* Lado esquerdo - Formulário */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 3, sm: 4, md: 5 },
            overflow: 'auto',
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="div" sx={{ display: 'inline' }}>
                Reserva Do
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: colors.primary,
                  display: 'inline',
                }}
              >
                Vale
              </Typography>
            </Box>

            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Bem Vindo!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Para você recuperar sua senha, preencha seu endereço de email.
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
                error={formData.email !== '' && !isValidEmail(formData.email)}
                helperText={
                  formData.email !== '' && !isValidEmail(formData.email) ? 'Email inválido' : ''
                }
                placeholder="exemplo@email.com"
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { height: '48px' },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  height: '48px',
                  mb: 2,
                  borderRadius: '25px',
                  padding: '8px 24px',
                  textTransform: 'none',
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: colors.primary,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: '#fff',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                ) : (
                  'Recuperar Senha'
                )}
              </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Precisa de ajuda? Entre em contato
              </Typography>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: colors.primary,
                  fontWeight: 500,
                }}
              >
                suporte@reservadovale.com
              </Link>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mt: 6,
                textAlign: 'center',
              }}
            >
              © Todos os direitos reservados Reserva do Vale 2023
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
            overflow: 'hidden',
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
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RecoverPassword;
