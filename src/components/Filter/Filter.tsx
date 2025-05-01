import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  Popover,
  Stack,
} from '@mui/material';
import { FilterList as FilterIcon, Close as CloseIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import ptBR from 'date-fns/locale/pt-BR';

export interface FilterOption {
  type: 'date-range' | 'select' | 'search';
  label: string;
  key: string;
  options?: { label: string; value: any }[]; // Para tipo 'select'
}

export interface FilterValues {
  [key: string]: any;
}

interface FilterProps {
  options: FilterOption[];
  onApplyFilters: (filters: FilterValues) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onApplyFilters }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = (key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const handleResetAll = () => {
    setFilters({});
  };

  const handleApply = () => {
    onApplyFilters(filters);
    handleClose();
  };

  const open = Boolean(anchorEl);

  const renderFilterInput = (option: FilterOption) => {
    switch (option.type) {
      case 'date-range':
        return (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="De"
                value={filters[`${option.key}_from`] || null}
                onChange={date => setFilters(prev => ({ ...prev, [`${option.key}_from`]: date }))}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="Até"
                value={filters[`${option.key}_to`] || null}
                onChange={date => setFilters(prev => ({ ...prev, [`${option.key}_to`]: date }))}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Box>
        );

      case 'select':
        return (
          <Select
            fullWidth
            size="small"
            value={filters[option.key] || ''}
            onChange={e => setFilters(prev => ({ ...prev, [option.key]: e.target.value }))}
          >
            {option.options?.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        );

      case 'search':
        return (
          <TextField
            fullWidth
            size="small"
            placeholder="Pesquisar..."
            value={filters[option.key] || ''}
            onChange={e => setFilters(prev => ({ ...prev, [option.key]: e.target.value }))}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<FilterIcon />}
        sx={{ borderRadius: '8px' }}
      >
        Filtrar
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 400,
            p: 3,
            mt: 1,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filtros
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={3}>
          {options.map(option => (
            <Box key={option.key}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {option.label}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleReset(option.key)}
                  sx={{ minWidth: 'auto', p: 0 }}
                >
                  Limpar
                </Button>
              </Box>
              {renderFilterInput(option)}
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button variant="outlined" fullWidth onClick={handleResetAll}>
            Limpar Tudo
          </Button>
          <Button variant="contained" fullWidth onClick={handleApply}>
            Aplicar
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Filter;
