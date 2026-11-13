import React from 'react';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

export const TicketActions = ({ pnr, onDownload }) => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* 1. Wire up the PDF Download trigger */}
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<DownloadIcon />} 
        onClick={onDownload}
      >
        Download PDF
      </Button>

      {/* 2. Standard browser print functionality */}
      <Button 
        variant="outlined" 
        color="primary" 
        startIcon={<PrintIcon />}
        onClick={handlePrint}
      >
        Print Ticket
      </Button>

      {/* 3. Link back to the cancellation flow we built */}
      <Button 
        variant="text" 
        color="error" 
        startIcon={<CancelIcon />}
        onClick={() => navigate(`/cancel?pnr=${pnr}`)}
      >
        Cancel Ticket
      </Button>
    </Box>
  );
};