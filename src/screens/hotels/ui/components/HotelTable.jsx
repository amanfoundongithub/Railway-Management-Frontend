import React from 'react';
import {
  Chip,
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

export const HotelTable = ({ hotels, selectedHotel, onSelectHotel }) => (
  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e4e8', borderRadius: 3 }}>
    <Table size="medium">
      <TableHead sx={{ bgcolor: '#f4f6f8' }}>
        <TableRow>
          <TableCell padding="checkbox" sx={{ pl: 2 }} />
          <TableCell><Typography variant="body2" fontWeight={700}>Property / Room Name</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Type</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Available Rooms</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Price / Night</Typography></TableCell>
          <TableCell><Typography variant="body2" fontWeight={700}>Rating</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hotels?.map((hotel) => {
          const isSelectedRow = (selectedHotel?._id || selectedHotel?.id) === (hotel._id || hotel.id);

          return (
            <TableRow
              key={hotel._id || hotel.id}
              hover
              onClick={() => onSelectHotel(hotel)}
              sx={{ cursor: 'pointer', bgcolor: isSelectedRow ? '#f8faff' : 'inherit' }}
            >
              <TableCell padding="checkbox" sx={{ pl: 2 }}>
                <Radio checked={isSelectedRow} size="small" disabled={hotel.availableRooms <= 0} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={700}>{hotel.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {hotel.amenities?.join(' · ')}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={hotel.type.replace('_', ' ')} size="small" color="primary" variant="outlined" />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={hotel.availableRooms > 0 ? 'text.primary' : 'error.main'}
                  fontWeight={600}
                >
                  {hotel.availableRooms > 0 ? `${hotel.availableRooms} Left` : 'Sold Out'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={700} color="#1a365d">
                  ₹{hotel.pricePerNight}
                </Typography>
              </TableCell>
              <TableCell><Typography variant="body2">⭐ {hotel.rating}</Typography></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);
