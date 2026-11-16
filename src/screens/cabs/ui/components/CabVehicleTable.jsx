import React from 'react';
import {
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const CabVehicleTable = ({ cab, isVendorSelected, selectedVehicle, onSelectVehicle }) => (
  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e4e8', borderRadius: 2 }}>
    <Table size="medium">
      <TableHead sx={{ bgcolor: '#f4f6f8' }}>
        <TableRow>
          <TableCell padding="checkbox" sx={{ pl: 2 }} />
          <TableCell><Typography variant="body2" fontWeight={700}>Vehicle Type</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Capacity</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Base Fare</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Per KM Rate</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cab.vehicles.map((vehicle) => {
          const isSelectedRow = isVendorSelected && selectedVehicle?.type === vehicle.type;

          return (
            <TableRow
              key={vehicle.type}
              hover
              onClick={() => onSelectVehicle(cab, vehicle)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell padding="checkbox" sx={{ pl: 2 }}>
                <Radio checked={isSelectedRow} size="small" />
              </TableCell>
              <TableCell><Typography variant="body2" fontWeight={600}>{vehicle.type}</Typography></TableCell>
              <TableCell><Typography variant="body2">{vehicle.capacity} Passengers</Typography></TableCell>
              <TableCell><Typography variant="body2">₹{vehicle.baseFare}</Typography></TableCell>
              <TableCell><Typography variant="body2">₹{vehicle.pricePerKm}/km</Typography></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);
