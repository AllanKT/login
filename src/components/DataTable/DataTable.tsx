import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputBase,
  Chip,
  TablePagination,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import Filter, { FilterOption, FilterValues } from '../Filter/Filter';

export interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'text' | 'contained' | 'outlined';
  showModal?: boolean;
  modalContent?: React.ReactNode;
}

interface DataTableProps<T> {
  data: any[];
  columns: any[];
  actionButtons?: ActionButton[];
  filterOptions: FilterOption[];
  handleApplyFilters: (filters: FilterValues) => void;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  actionButtons,
  filterOptions,
  handleApplyFilters,
}: DataTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState<React.ReactNode>(null);

  const handleActionClick = (button: ActionButton, row: any) => {
    if (button.showModal && button.modalContent) {
      setCurrentModalContent(button.modalContent);
      setModalOpen(true);
    }
    button.onClick(row);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string | number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string | number) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 240,
          }}
        >
          <Filter options={filterOptions} onApplyFilters={handleApplyFilters} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map(column => (
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                    bgcolor: '#F9FAFB',
                    borderTop: '1px solid #E5E7EB',
                  }}
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
              {actionButtons && actionButtons.length > 0 && (
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                    bgcolor: '#F9FAFB',
                    borderTop: '1px solid #E5E7EB',
                  }}
                  align="right"
                >
                  Ações
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              const isItemSelected = isSelected(row.id);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} onChange={() => handleClick(row.id)} />
                  </TableCell>
                  {columns.map(column => (
                    <TableCell key={column.id}>
                      {column.render ? column.render(row[column.id], row) : row[column.id]}
                    </TableCell>
                  ))}
                  {actionButtons && actionButtons.length > 0 && (
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        {actionButtons.map((button, index) =>
                          button.label ? (
                            <Button
                              key={index}
                              variant={button.variant || 'text'}
                              color={button.color || 'primary'}
                              onClick={() => handleActionClick(button, row)}
                              startIcon={button.icon}
                              size="small"
                            >
                              {button.label}
                            </Button>
                          ) : (
                            <IconButton
                              key={index}
                              color={button.color || 'primary'}
                              onClick={() => handleActionClick(button, row)}
                              size="small"
                            >
                              {button.icon}
                            </IconButton>
                          )
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#6B7280' }}>
          Exibindo de 1 a {Math.min(rowsPerPage, data.length)} de {data.length} dados
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1, color: '#6B7280' }}>
              Exibição
            </Typography>
            <Select
              value={rowsPerPage}
              // onChange={handleChangeRowsPerPage}
              size="small"
              sx={{
                minWidth: 80,
                height: 36,
                mr: 1,
                '.MuiSelect-select': {
                  py: 0.75,
                },
              }}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </Box>

          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
            sx={{
              border: 'none',
              '.MuiTablePagination-toolbar': {
                pl: 0,
              },
              '.MuiTablePagination-displayedRows': {
                display: 'none',
              },
            }}
          />
        </Box>
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogContent>{currentModalContent}</DialogContent>
      </Dialog>
    </Box>
  );
};

export default DataTable;
