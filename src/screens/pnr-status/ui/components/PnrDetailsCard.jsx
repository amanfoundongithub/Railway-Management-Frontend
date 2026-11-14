import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  Divider, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export const PnrDetailsCard = ({ 
  pnrData 
}) => {

  if (!pnrData) return null;

  const { 
    pnr, 
    train, 
    sourceStation, 
    destinationStation, 
    journeyDate, 
    coachClass, 
    passengers, 
    bookingStatus 
  } = pnrData;

  const formattedDate = new Date(journeyDate).toLocaleDateString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

  const sourceName = train.route?.find(r => r.stationCode === sourceStation)?.stationName || sourceStation;
  const destName = train.route?.find(r => r.stationCode === destinationStation)?.stationName || destinationStation;

  const isCancelled = bookingStatus === 'CANCELLED';
  const hasConfirmed = passengers.some(p => p.status === 'CONFIRMED');

  let badgeColor = 'warning.main';
  let badgeText = 'WAITLISTED';
  if (isCancelled) {
    badgeColor = 'error.main';
    badgeText = 'CANCELLED';
  } else if (hasConfirmed) {
    badgeColor = 'success.main';
    badgeText = 'CONFIRMED';
  }

  return (
    <Card elevation={2} sx={{ borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>PNR: {pnr}</Typography>
        <Chip 
          label={badgeText} 
          size="small" 
          sx={{ 
            bgcolor: badgeColor, 
            color: 'white', 
            fontWeight: 'bold', 
            fontFamily: "monospace",
            height: 40,
            minWidth: 100,
          }} 
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Train & Journey Details */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Train</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {train.trainName} ({train.trainNumber})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Journey Date</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{formattedDate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">From</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{sourceName} ({sourceStation})</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">To</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{destName} ({destinationStation})</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Class / Quota</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{coachClass} / General</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Passenger Status Table */}
        <Typography variant="h6" fontWeight="bold" mb={2}>Passenger Status</Typography>
        
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Current Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengers.map((p, idx) => (
                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">{p.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{p.age}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{p.gender}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      color={
                        p.status === 'CONFIRMED' ? 'success.main' : 
                        p.status === 'CANCELLED' ? 'error.main' : 'warning.main'
                      }
                    >
                      {p.status === 'CONFIRMED' ? `CNF / ${p.seatNumber}` : `${p.status} / ${p.seatNumber}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </CardContent>
    </Card>
  );
};