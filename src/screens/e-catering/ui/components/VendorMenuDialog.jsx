import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';

export const VendorMenuDialog = ({ openVendor, setOpenVendor, menuLoading, vendorMenu, cart, updateCart }) => {
  return (
    <Dialog
      open={Boolean(openVendor)}
      onClose={() => setOpenVendor(null)}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4, minHeight: 400 } }}
    >
      {openVendor && (
        <>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            <Box>
              <Typography variant="h6" fontWeight={800} color="#1a365d">{openVendor.name}</Typography>
              <Typography variant="caption" color="text.secondary">{openVendor.tags}</Typography>
            </Box>
            <IconButton onClick={() => setOpenVendor(null)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            {menuLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table aria-label="vendor menu">
                  <TableBody>
                    {vendorMenu.map((item) => {
                      const quantity = cart[item._id]?.quantity || 0;
                      return (
                        <TableRow key={item._id} sx={{ transition: 'background-color 0.2s', '&:hover': { bgcolor: '#fafbfc' }, '&:last-child td': { borderBottom: 0 } }}>
                          <TableCell sx={{ py: 3, pl: 4, pr: 2, verticalAlign: 'top', borderBottom: '1px solid #f0f0f0' }}>
                            <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                              <Box sx={{ width: 16, height: 16, flexShrink: 0, border: '1px solid', borderColor: item.isVeg ? 'success.main' : 'error.main', borderRadius: 0.5, display: 'grid', placeItems: 'center' }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.isVeg ? 'success.main' : 'error.main' }} />
                              </Box>
                              <Typography variant="subtitle1" fontWeight={700}>{item.name}</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.5, maxWidth: '90%' }}>
                              {item.desc}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={800} color="#1a365d">
                              ₹{item.price}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ py: 3, pr: 4, pl: 0, verticalAlign: 'middle', width: 160, borderBottom: '1px solid #f0f0f0' }}>
                            {quantity > 0 ? (
                              <Box sx={{ display: 'grid', gridTemplateColumns: '32px minmax(28px, 1fr) 32px', alignItems: 'center', justifyItems: 'center', border: '1px solid #d1d5db', borderRadius: 1.5, bgcolor: 'white', minWidth: 96 }}>
                                <IconButton onClick={() => updateCart(item, -1, openVendor)} sx={{ width: 32, height: 32, p: 0, borderRadius: 1.5, color: 'error.main' }}>
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography fontWeight={700} sx={{ minWidth: 28, textAlign: 'center' }}>{quantity}</Typography>
                                <IconButton onClick={() => updateCart(item, 1, openVendor)} sx={{ width: 32, height: 32, p: 0, borderRadius: 1.5, color: 'success.main' }}>
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            ) : (
                              <Button variant="outlined" color="success" onClick={() => updateCart(item, 1, openVendor)} sx={{ borderRadius: 1.5, px: 3, py: 0.75, fontWeight: 700, borderWidth: 2, textTransform: 'none', '&:hover': { borderWidth: 2, bgcolor: '#f1f8f4' } }}>
                                ADD
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
