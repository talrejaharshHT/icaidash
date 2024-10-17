import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const MembersSection = ({ members }) => (
  <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>MRN</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Current Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.MRN}>
            <TableCell>{member.MRN}</TableCell>
            <TableCell>{member.Name}</TableCell>
            <TableCell>{member.CITY}</TableCell>
            <TableCell>{member.Current_Location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

export default MembersSection;
