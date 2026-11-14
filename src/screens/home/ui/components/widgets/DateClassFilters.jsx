import { 
  TextField, 
  MenuItem, 
  Grid 
} from '@mui/material';

const classes = ['All Classes', '1A', '2A', '3A', 'SL', 'CC', '2S', 'UR'];
const quotas = ['General', 'Tatkal', 'Premium Tatkal', 'Ladies', 'Senior Citizen'];

export const DateClassFilters = ({ searchData, onChange, errors = {} }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Journey Date"
          type="date"
          value={searchData.date}
          onChange={(e) => onChange('date', e.target.value)}
          error={!!errors.date}
          helperText={errors.date}
          InputLabelProps={{ shrink: true }}
          inputProps={{ 
            min: new Date().toISOString().split('T')[0]
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField 
          select 
          fullWidth 
          label="Class" 
          value={searchData.travelClass}
          onChange={(e) => onChange('travelClass', e.target.value)}
        >
          {classes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField 
          select 
          fullWidth 
          label="Quota" 
          value={searchData.quota}
          onChange={(e) => onChange('quota', e.target.value)}
        >
          {quotas.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default DateClassFilters;