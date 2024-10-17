// src/components/MetForm.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
} from '@mui/material';
import axios from 'axios';

const MetForm = () => {
  const [mrnInput, setMrnInput] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [metCity, setMetCity] = useState('');
  const [metPlace, setMetPlace] = useState('');
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handle MRN input change
  const handleMrnChange = (e) => setMrnInput(e.target.value);

  // Handle candidates selection (VPD, RP, MS)
  const handleCandidateChange = (event) => {
    const { value } = event.target;
    setSelectedCandidates(typeof value === 'string' ? value.split(',') : value);
  };

  // Fetch member data based on MRNs
  const fetchMemberData = async () => {
    const mrns = mrnInput.split(',').map((mrn) => mrn.trim());
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/members', { mrns });
      setMembersData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching member data:', err);
      setError(true);
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const updatedData = membersData.map((member) => ({
      ...member,
      VPD_Met_City: selectedCandidates.includes('VPD') ? metCity : member.VPD_Met_City,
      RP_Met_City: selectedCandidates.includes('RP') ? metCity : member.RP_Met_City,
      MS_Met_City: selectedCandidates.includes('MS') ? metCity : member.MS_Met_City,
      VPD_Met_Place: selectedCandidates.includes('VPD') ? metPlace : member.VPD_Met_Place,
      RP_Met_Place: selectedCandidates.includes('RP') ? metPlace : member.RP_Met_Place,
      MS_Met_Place: selectedCandidates.includes('MS') ? metPlace : member.MS_Met_Place,
    }));

    try {
      await axios.post('http://127.0.0.1:8000/api/update-members', updatedData);
      alert('Data updated successfully!');
    } catch (err) {
      console.error('Error updating data:', err);
      alert('Failed to update data.');
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* MRN Input */}
      <Grid item xs={12}>
        <TextField
          label="Enter MRNs (comma-separated)"
          fullWidth
          value={mrnInput}
          onChange={handleMrnChange}
          placeholder="e.g., 157246, 607099"
        />
      </Grid>

      {/* Candidate Selection */}
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Candidate(s)</InputLabel>
          <Select
            multiple
            value={selectedCandidates}
            onChange={handleCandidateChange}
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="VPD">VPD</MenuItem>
            <MenuItem value="RP">RP</MenuItem>
            <MenuItem value="MS">MS</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Met Place Input */}
      <Grid item xs={6}>
        <TextField
          label="Met Place"
          fullWidth
          value={metPlace}
          onChange={(e) => setMetPlace(e.target.value)}
        />
      </Grid>

      {/* Met City Input */}
      <Grid item xs={6}>
        <TextField
          label="Met City"
          fullWidth
          value={metCity}
          onChange={(e) => setMetCity(e.target.value)}
        />
      </Grid>

      {/* Fetch Members Button */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={fetchMemberData}>
          Fetch Member Data
        </Button>
      </Grid>

      {/* Members Data Table */}
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>MRN</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>City (ICAI)</TableCell>
                <TableCell>Current City</TableCell>
                <TableCell>Mobile (ICAI)</TableCell>
                <TableCell>Mobile (Current)</TableCell>
                <TableCell>Email (ICAI)</TableCell>
                <TableCell>Email (Current)</TableCell>
                <TableCell>ViShare</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersData.map((member) => (
                <TableRow key={member.MRN}>
                  <TableCell>{member.MRN}</TableCell>
                  <TableCell>{member.Name}</TableCell>
                  <TableCell>{member.City}</TableCell>
                  <TableCell>
                    <TextField
                      value={member.Current_City || ''}
                      onChange={(e) => {
                        member.Current_City = e.target.value;
                        setMembersData([...membersData]);
                      }}
                    />
                  </TableCell>
                  <TableCell>{member.Mobile_ICAI}</TableCell>
                  <TableCell>
                    <TextField
                      value={member.Mobile_Current || ''}
                      onChange={(e) => {
                        member.Mobile_Current = e.target.value;
                        setMembersData([...membersData]);
                      }}
                    />
                  </TableCell>
                  <TableCell>{member.Email_ICAI}</TableCell>
                  <TableCell>
                    <TextField
                      value={member.Email_Current || ''}
                      onChange={(e) => {
                        member.Email_Current = e.target.value;
                        setMembersData([...membersData]);
                      }}
                    />
                  </TableCell>
                  <TableCell>{member.ViShare}</TableCell>
                  <TableCell>
                    <TextField
                      value={member.Remarks || ''}
                      onChange={(e) => {
                        member.Remarks = e.target.value;
                        setMembersData([...membersData]);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default MetForm;
