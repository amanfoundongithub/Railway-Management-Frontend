import React from 'react';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';

export const TicketActions = ({ pnr }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={() => alert(`Downloading ticket ${pnr}`)}>
        Download PDF
      </Button>
      <Button variant="outlined" color="primary" startIcon={<PrintIcon />}>
        Print Ticket
      </Button>
      <Button variant="text" color="error" startIcon={<CancelIcon />}>
        Cancel Ticket
      </Button>
    </Box>
  );
};